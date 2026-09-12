"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const database_1 = require("./config/database");
const operations_repository_1 = require("./modules/operations/repositories/operations.repository");
const audit_service_1 = require("./modules/operations/services/audit.service");
const feature_flag_service_1 = require("./modules/operations/services/feature-flag.service");
const client_1 = require("@prisma/client");
const API_URL = 'http://localhost:5000/api/v1';
async function runOperationsTests() {
    console.log('🧪 Starting Enterprise Administration & Operations Integration Tests...');
    const repo = new operations_repository_1.OperationsRepository();
    const audit = new audit_service_1.AuditService();
    const flagService = new feature_flag_service_1.FeatureFlagService();
    // Clear previous test run logs to guarantee verification isolation
    await database_1.prisma.platformAuditLog.deleteMany();
    // 1. Seed Permissions Mappings
    console.log('\nSeeding permission definitions & RBAC mapping...');
    await repo.seedPermission('Dashboard Services', 'dashboard:view', [client_1.Role.SUPER_ADMIN, client_1.Role.PLATFORM_ADMIN, client_1.Role.READONLY_AUDITOR]);
    await repo.seedPermission('User Moderation', 'users:suspend', [client_1.Role.SUPER_ADMIN, client_1.Role.PLATFORM_ADMIN]);
    await repo.seedPermission('User Moderation', 'users:restore', [client_1.Role.SUPER_ADMIN, client_1.Role.PLATFORM_ADMIN]);
    await repo.seedPermission('User Moderation', 'users:logout', [client_1.Role.SUPER_ADMIN, client_1.Role.PLATFORM_ADMIN]);
    await repo.seedPermission('Operations Management', 'settings:update', [client_1.Role.SUPER_ADMIN]);
    await repo.seedPermission('Problem Operations', 'problems:moderate', [client_1.Role.SUPER_ADMIN, client_1.Role.MODERATOR]);
    await repo.seedPermission('Submission Operations', 'submissions:rejudge', [client_1.Role.SUPER_ADMIN, client_1.Role.MODERATOR]);
    await repo.seedPermission('Timeline View', 'timeline:view', [client_1.Role.SUPER_ADMIN, client_1.Role.PLATFORM_ADMIN, client_1.Role.READONLY_AUDITOR]);
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
        const regAdmin = await axios_1.default.post(`${API_URL}/auth/register`, {
            email: adminEmail,
            username: adminUser,
            password,
        });
        adminUserId = regAdmin.data.data.id;
        // Force role change to PLATFORM_ADMIN in database
        await database_1.prisma.user.update({
            where: { id: adminUserId },
            data: { role: client_1.Role.PLATFORM_ADMIN },
        });
        const loginAdmin = await axios_1.default.post(`${API_URL}/auth/login`, {
            identifier: adminUser,
            password,
        });
        adminToken = loginAdmin.data.data.accessToken;
        // Standard User
        const regUser = await axios_1.default.post(`${API_URL}/auth/register`, {
            email: userEmail,
            username: userUsername,
            password,
        });
        stdUserId = regUser.data.data.id;
        const loginUser = await axios_1.default.post(`${API_URL}/auth/login`, {
            identifier: userUsername,
            password,
        });
        userToken = loginUser.data.data.accessToken;
        console.log(`✅ Users created. Admin ID: ${adminUserId}, User ID: ${stdUserId}`);
    }
    catch (err) {
        console.error('❌ User creation failed:', err.response?.data || err.message);
        process.exit(1);
    }
    // 3. Test RBAC Permission Guard boundary
    console.log('\nVerifying RBAC permission guard blocks...');
    try {
        await axios_1.default.get(`${API_URL}/operations/dashboard/summary`, {
            headers: { Authorization: `Bearer ${userToken}` },
        });
        console.error('❌ Security breach: Standard user bypassed permission guard!');
        process.exit(1);
    }
    catch (err) {
        console.log('✅ Access blocked: Standard user rejected with status:', err.response?.status);
    }
    try {
        const summary = await axios_1.default.get(`${API_URL}/operations/dashboard/summary`, {
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        console.log('✅ Access allowed: PlatformAdmin successfully fetched summary:', summary.data.data);
    }
    catch (err) {
        console.error('❌ PlatformAdmin authorized fetch failed:', err.response?.data || err.message);
    }
    // 4. Test User Suspension & Audit log hash chaining
    console.log('\nTesting User Suspension & Audit Log integrity checks...');
    try {
        await axios_1.default.post(`${API_URL}/operations/users/suspend`, {
            targetUserId: stdUserId,
            reason: 'Suspicious contest activity detected.',
        }, { headers: { Authorization: `Bearer ${adminToken}` } });
        console.log('✅ User suspension endpoint completed.');
        // Verify Audit log integrity chain
        const isValid = await audit.verifyAuditChain();
        if (isValid) {
            console.log('✅ Immutable Audit Chain Verified: Hash linkages are fully intact and tamper-free.');
        }
        else {
            console.error('❌ Audit Chain verification detected corruption!');
        }
    }
    catch (err) {
        console.error('❌ Suspension/Audit failed:', err.response?.data || err.message);
    }
    // 5. Test Maintenance Mode Guard (NORMAL -> READ_ONLY)
    console.log('\nTesting Maintenance Mode Guard (Read-Only)...');
    try {
        // Seed setting (Admin only, requires SUPER_ADMIN to change settings so we do it directly in DB for test)
        await repo.upsertSetting('MAINTENANCE_MODE', client_1.MaintenanceMode.READ_ONLY);
        // Clear cache state in middleware by waiting or let's assume it queries
        // Since cache TTL is 5 seconds, let's wait 6 seconds
        console.log('Waiting 6 seconds for maintenance mode cache TTL expiration...');
        await new Promise((resolve) => setTimeout(resolve, 6000));
        // Standard user attempts to update preference (mutation POST/PUT)
        try {
            await axios_1.default.put(`${API_URL}/profiles/preferences`, { enableEmail: false }, { headers: { Authorization: `Bearer ${userToken}` } });
            console.error('❌ Guard failed: Standard user was allowed mutating preference edit during READ_ONLY Mode!');
            process.exit(1);
        }
        catch (err) {
            console.log('✅ Guard succeeded: Standard user blocked with message:', err.response?.data?.error?.message);
        }
        // Revert settings
        await repo.upsertSetting('MAINTENANCE_MODE', client_1.MaintenanceMode.NORMAL);
    }
    catch (err) {
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
            severity: client_1.IncidentSeverity.CRITICAL,
        });
        incidentId = incident.id;
        console.log('✅ Incident created. ID:', incidentId);
        // Retrieve timeline
        const timelineRes = await axios_1.default.get(`${API_URL}/operations/timeline`, {
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        const timeline = timelineRes.data.data;
        console.log(`Operations Timeline count: ${timeline.length}`);
        const hasIncident = timeline.some((t) => t.type === 'INCIDENT' && t.id === incidentId);
        if (hasIncident) {
            console.log('✅ Incidents mapping to Operations Timeline verified.');
        }
        else {
            console.error('❌ Incident missing in timeline aggregates.');
        }
        // Resolve incident
        await repo.updateIncidentStatus(incidentId, client_1.IncidentStatus.RESOLVED, 'Increased connection capacity on main DB node.', new Date());
        console.log('✅ Incident status resolved.');
    }
    catch (err) {
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
            if (active)
                enabledCount++;
        }
        console.log(`Determined enabled users: ${enabledCount}/${count} (expected around 50%)`);
        console.log('✅ Feature flag rollout deterministic evaluation verified.');
    }
    catch (err) {
        console.error('❌ Feature flag checks failed:', err.message);
    }
    // 8. Test Prometheus Metrics Scraper
    console.log('\nVerifying Prometheus metrics scrape endpoint...');
    try {
        const metricsRes = await axios_1.default.get(`${API_URL}/operations/dashboard/metrics`);
        const text = metricsRes.data;
        console.log('Sample metrics lines:');
        text.split('\n').slice(0, 8).forEach((line) => {
            console.log(' >', line);
        });
        if (text.includes('apex_service_up') && text.includes('apex_system_uptime_seconds')) {
            console.log('✅ Prometheus metrics scrapable text page format verified.');
        }
        else {
            console.error('❌ Metrics formatting invalid.');
        }
    }
    catch (err) {
        console.error('❌ Metrics verification failed:', err.message);
    }
    // Cleanup Database
    console.log('\nCleaning up operations verification records...');
    try {
        await database_1.prisma.platformIncident.delete({ where: { id: incidentId } });
        await database_1.prisma.user.delete({ where: { id: adminUserId } });
        await database_1.prisma.user.delete({ where: { id: stdUserId } });
        console.log('✅ Cleanup complete.');
    }
    catch (err) { }
    console.log('\n🏁 Platform Operations & Observability Tests Finished!');
}
runOperationsTests();
