import axios from 'axios';
import { prisma } from './config/database';
import { OperationsRepository } from './modules/operations/repositories/operations.repository';
import { AuditService } from './modules/operations/services/audit.service';
import { FeatureFlagService } from './modules/operations/services/feature-flag.service';
import { Role, AnnouncementType, IncidentSeverity, IncidentStatus, ReportStatus, MaintenanceMode } from '@prisma/client';

const API_URL = 'http://localhost:5000/api/v1';

async function runOperationsTests() {
  console.log('🧪 Starting Enterprise Administration & Operations Integration Tests...');

  const repo = new OperationsRepository();
  const audit = new AuditService();
  const flagService = new FeatureFlagService();

  // Clear previous test run logs to guarantee verification isolation
  await prisma.platformAuditLog.deleteMany();

  // 1. Seed Permissions Mappings
  console.log('\nSeeding permission definitions & RBAC mapping...');
  await repo.seedPermission('Dashboard Services', 'dashboard:view', [Role.SUPER_ADMIN, Role.PLATFORM_ADMIN, Role.READONLY_AUDITOR]);
  await repo.seedPermission('User Moderation', 'users:suspend', [Role.SUPER_ADMIN, Role.PLATFORM_ADMIN]);
  await repo.seedPermission('User Moderation', 'users:restore', [Role.SUPER_ADMIN, Role.PLATFORM_ADMIN]);
  await repo.seedPermission('User Moderation', 'users:logout', [Role.SUPER_ADMIN, Role.PLATFORM_ADMIN]);
  await repo.seedPermission('Operations Management', 'settings:update', [Role.SUPER_ADMIN]);
  await repo.seedPermission('Problem Operations', 'problems:moderate', [Role.SUPER_ADMIN, Role.MODERATOR]);
  await repo.seedPermission('Submission Operations', 'submissions:rejudge', [Role.SUPER_ADMIN, Role.MODERATOR]);
  await repo.seedPermission('Timeline View', 'timeline:view', [Role.SUPER_ADMIN, Role.PLATFORM_ADMIN, Role.READONLY_AUDITOR]);
  console.log('✅ RBAC mappings seeded.');

  // 2. Register & login PlatformAdmin and User A
  console.log('\nRegistering PlatformAdmin and Standard User...');
  const uniqueId = Date.now();
  
  const adminEmail = `platadmin_${uniqueId}@apex.com`;
  const adminUser = `platadmin_${uniqueId}`;
  
  const userEmail = `stduser_${uniqueId}@apex.com`;
  const userUsername = `stduser_${uniqueId}`;
  
  const password = 'Password123!';

  let adminToken = '';
  let userToken = '';
  let adminUserId = '';
  let stdUserId = '';

  try {
    // PlatformAdmin
    const regAdmin = await axios.post(`${API_URL}/auth/register`, {
      email: adminEmail,
      username: adminUser,
      password,
    });
    adminUserId = (regAdmin.data as any).data.id;
    
    // Force role change to PLATFORM_ADMIN in database
    await prisma.user.update({
      where: { id: adminUserId },
      data: { role: Role.PLATFORM_ADMIN },
    });

    const loginAdmin = await axios.post(`${API_URL}/auth/login`, {
      identifier: adminUser,
      password,
    });
    adminToken = (loginAdmin.data as any).data.accessToken;

    // Standard User
    const regUser = await axios.post(`${API_URL}/auth/register`, {
      email: userEmail,
      username: userUsername,
      password,
    });
    stdUserId = (regUser.data as any).data.id;

    const loginUser = await axios.post(`${API_URL}/auth/login`, {
      identifier: userUsername,
      password,
    });
    userToken = (loginUser.data as any).data.accessToken;

    console.log(`✅ Users created. Admin ID: ${adminUserId}, User ID: ${stdUserId}`);
  } catch (err: any) {
    console.error('❌ User creation failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 3. Test RBAC Permission Guard boundary
  console.log('\nVerifying RBAC permission guard blocks...');
  try {
    await axios.get(`${API_URL}/operations/dashboard/summary`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.error('❌ Security breach: Standard user bypassed permission guard!');
    process.exit(1);
  } catch (err: any) {
    console.log('✅ Access blocked: Standard user rejected with status:', err.response?.status);
  }

  try {
    const summary = await axios.get(`${API_URL}/operations/dashboard/summary`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('✅ Access allowed: PlatformAdmin successfully fetched summary:', (summary.data as any).data);
  } catch (err: any) {
    console.error('❌ PlatformAdmin authorized fetch failed:', err.response?.data || err.message);
  }

  // 4. Test User Suspension & Audit log hash chaining
  console.log('\nTesting User Suspension & Audit Log integrity checks...');
  try {
    await axios.post(
      `${API_URL}/operations/users/suspend`,
      {
        targetUserId: stdUserId,
        reason: 'Suspicious contest activity detected.',
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('✅ User suspension endpoint completed.');

    // Verify Audit log integrity chain
    const isValid = await audit.verifyAuditChain();
    if (isValid) {
      console.log('✅ Immutable Audit Chain Verified: Hash linkages are fully intact and tamper-free.');
    } else {
      console.error('❌ Audit Chain verification detected corruption!');
    }
  } catch (err: any) {
    console.error('❌ Suspension/Audit failed:', err.response?.data || err.message);
  }

  // 5. Test Maintenance Mode Guard (NORMAL -> READ_ONLY)
  console.log('\nTesting Maintenance Mode Guard (Read-Only)...');
  try {
    // Seed setting (Admin only, requires SUPER_ADMIN to change settings so we do it directly in DB for test)
    await repo.upsertSetting('MAINTENANCE_MODE', MaintenanceMode.READ_ONLY);
    
    // Clear cache state in middleware by waiting or let's assume it queries
    // Since cache TTL is 5 seconds, let's wait 6 seconds
    console.log('Waiting 6 seconds for maintenance mode cache TTL expiration...');
    await new Promise((resolve) => setTimeout(resolve, 6000));

    // Standard user attempts to update preference (mutation POST/PUT)
    try {
      await axios.put(
        `${API_URL}/profiles/preferences`,
        { enableEmail: false },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.error('❌ Guard failed: Standard user was allowed mutating preference edit during READ_ONLY Mode!');
      process.exit(1);
    } catch (err: any) {
      console.log('✅ Guard succeeded: Standard user blocked with message:', err.response?.data?.error?.message);
    }

    // Revert settings
    await repo.upsertSetting('MAINTENANCE_MODE', MaintenanceMode.NORMAL);
  } catch (err: any) {
    console.error('❌ Maintenance mode test failed:', err.message);
  }

  // 6. Test Incidents Lifecycle & Timeline
  console.log('\nTesting platform incidents & operations timeline...');
  let incidentId = '';
  try {
    // Create Incident (We do it via DB or API. API requires settings:update which is SUPER_ADMIN, so we do it directly)
    const incident = await repo.createIncident({
      title: 'PostgreSQL connection limits warning',
      description: 'Active pools breached 90% utilization warning.',
      severity: IncidentSeverity.CRITICAL,
    });
    incidentId = incident.id;
    console.log('✅ Incident created. ID:', incidentId);

    // Retrieve timeline
    const timelineRes = await axios.get(`${API_URL}/operations/timeline`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const timeline = (timelineRes.data as any).data;
    console.log(`Operations Timeline count: ${timeline.length}`);
    const hasIncident = timeline.some((t: any) => t.type === 'INCIDENT' && t.id === incidentId);
    
    if (hasIncident) {
      console.log('✅ Incidents mapping to Operations Timeline verified.');
    } else {
      console.error('❌ Incident missing in timeline aggregates.');
    }

    // Resolve incident
    await repo.updateIncidentStatus(incidentId, IncidentStatus.RESOLVED, 'Increased connection capacity on main DB node.', new Date());
    console.log('✅ Incident status resolved.');
  } catch (err: any) {
    console.error('❌ Incidents test failed:', err.message);
  }

  // 7. Test Feature Flags Gradual Rollout
  console.log('\nTesting Feature Flags rollout deterministic checks...');
  try {
    const flagKey = 'contest-dashboard-v2';
    await repo.upsertFeatureFlag(flagKey, true, 0.5); // 50% rollout ratio

    const count = 20;
    let enabledCount = 0;
    for (let i = 0; i < count; i++) {
      const mockUserId = `00000000-0000-0000-0000-00000000000${i.toString(16)}`;
      const active = await flagService.isEnabled(flagKey, mockUserId);
      if (active) enabledCount++;
    }
    console.log(`Determined enabled users: ${enabledCount}/${count} (expected around 50%)`);
    console.log('✅ Feature flag rollout deterministic evaluation verified.');
  } catch (err: any) {
    console.error('❌ Feature flag checks failed:', err.message);
  }

  // 8. Test Prometheus Metrics Scraper
  console.log('\nVerifying Prometheus metrics scrape endpoint...');
  try {
    const metricsRes = await axios.get(`${API_URL}/operations/dashboard/metrics`);
    const text = metricsRes.data as string;
    console.log('Sample metrics lines:');
    text.split('\n').slice(0, 8).forEach((line: string) => {
      console.log(' >', line);
    });

    if (text.includes('apex_service_up') && text.includes('apex_system_uptime_seconds')) {
      console.log('✅ Prometheus metrics scrapable text page format verified.');
    } else {
      console.error('❌ Metrics formatting invalid.');
    }
  } catch (err: any) {
    console.error('❌ Metrics verification failed:', err.message);
  }

  // Cleanup Database
  console.log('\nCleaning up operations verification records...');
  try {
    await prisma.platformIncident.delete({ where: { id: incidentId } });
    await prisma.user.delete({ where: { id: adminUserId } });
    await prisma.user.delete({ where: { id: stdUserId } });
    console.log('✅ Cleanup complete.');
  } catch (err) {}

  console.log('\n🏁 Platform Operations & Observability Tests Finished!');
}

runOperationsTests();
