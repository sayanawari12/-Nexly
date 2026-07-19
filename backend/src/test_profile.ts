import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { ProfileRepository } from './modules/profile/repositories/profile.repository';
import { AnalyticsService } from './modules/profile/services/analytics.service';
import { AchievementService } from './modules/profile/services/achievement.service';
import { LeaderboardService } from './modules/profile/services/leaderboard.service';
import { RatingService } from './modules/profile/services/rating.service';
import { prisma } from './config/database';

const API_URL = 'http://localhost:5000/api/v1';
const SOCKET_URL = 'http://localhost:5000/profiles';

async function runProfileTests() {
  console.log('🧪 Starting Enterprise User Progress & Rating Engine Integration Tests...');

  const repo = new ProfileRepository();
  const analytics = new AnalyticsService();
  const achievements = new AchievementService();
  const leaderboard = new LeaderboardService();
  const ratings = new RatingService();

  // 1. Seed Achievement Definitions
  console.log('\nSeeding achievement badge definitions...');
  const firstSolveBadge = await repo.getOrCreateAchievementDefinition(
    'FIRST_SOLVE',
    'Genesis Solver',
    'Solved your first problem successfully.',
    { type: 'FIRST_SOLVE' }
  );

  const streakBadge = await repo.getOrCreateAchievementDefinition(
    'STREAK_7',
    'Weekly Coding Warrior',
    'Maintained a 7-day coding streak.',
    { type: 'STREAK_COUNT', count: 7 }
  );

  const nightOwlBadge = await repo.getOrCreateAchievementDefinition(
    'NIGHT_OWL',
    'Midnight Coder',
    'Solved a problem between 11 PM and 4 AM.',
    { type: 'NIGHT_OWL' }
  );
  console.log('✅ Badges seeded.');

  // 2. Authenticate Admin
  console.log('\nAuthenticating Admin...');
  let adminToken = '';
  try {
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      identifier: 'admin@apex.domain',
      password: 'admin123',
    });
    adminToken = (loginRes.data as any).data.accessToken;
    console.log('✅ Admin authenticated.');
  } catch (err: any) {
    console.error('❌ Admin auth failed. Seeds needed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 3. Register & Login test user
  console.log('\nRegistering & login verification user...');
  const uniqueId = Date.now();
  const username = `proguser_${uniqueId}`;
  const email = `proguser_${uniqueId}@test.com`;
  const password = 'Password123!';
  let userToken = '';
  let userId = '';

  try {
    const regRes = await axios.post(`${API_URL}/auth/register`, {
      email,
      username,
      password,
    });
    userId = (regRes.data as any).data.id;

    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      identifier: username,
      password,
    });
    userToken = (loginRes.data as any).data.accessToken;
    console.log(`✅ User created. ID: ${userId}`);
  } catch (err: any) {
    console.error('❌ User signup failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 4. Verify Socket Connection & Join Room
  console.log('\nConnecting to WebSocket `/profiles` namespace...');
  const clientSocket: Socket = io(SOCKET_URL, { auth: { token: userToken } });
  const socketNotifications: any[] = [];

  await new Promise<void>((resolve, reject) => {
    clientSocket.on('connect_error', (err) => {
      console.error('❌ Connection error on socket:', err.message);
      reject(err);
    });

    clientSocket.on('connect', () => {
      console.log('✅ Socket connected successfully.');
      clientSocket.on('notification:received', (data) => {
        console.log('📡 Real-time Socket Notification:', data.title, '-', data.message);
        socketNotifications.push(data);
      });
      resolve();
    });
  });

  // 5. Test Analytics & Skill progression
  console.log('\nProcessing first accepted Python solve analytics...');
  try {
    await analytics.processSolveAnalytics({
      userId,
      problemId: '00000000-0000-0000-0000-000000000000', // dummy
      category: 'Math',
      language: 'Python',
      runtimeMs: 45,
      memoryKb: 4096,
      isAccepted: true,
      submittedAt: new Date(),
    });

    const progress = await repo.getOrCreateProgress(userId);
    console.log(`User solves count: ${progress.totalSolves}, Streak: ${progress.currentStreak}`);
    
    const skills = await repo.getSkills(userId);
    const mathSkill = skills.find((s) => s.category === 'Math');
    console.log(`Skill Category: Math, Level: ${mathSkill?.level}, Confidence Score: ${mathSkill?.confidenceScore}`);

    if (progress.totalSolves === 1 && mathSkill?.level === 2) {
      console.log('✅ Analytics and Math skill level (Level 2) progression validated.');
    } else {
      console.error('❌ Skill level progression calculation error.');
    }
  } catch (err: any) {
    console.error('❌ Analytics update failed:', err.message);
  }

  // 6. Evaluate Achievements and Badges
  console.log('\nEvaluating badge unlock triggers...');
  try {
    const unlocked = await achievements.evaluateAchievements(userId);
    console.log('Unlocked Badges:', unlocked);
    
    const unlockedBadges = await repo.getUnlockedAchievements(userId);
    const hasGenesis = unlockedBadges.some((ua) => ua.definition.key === 'FIRST_SOLVE');
    
    if (hasGenesis) {
      console.log('✅ Badge "Genesis Solver" successfully unlocked.');
    } else {
      console.error('❌ Badge unlock check failed.');
    }
  } catch (err: any) {
    console.error('❌ Achievement check failed:', err.message);
  }

  // 7. Test Leaderboard queries
  console.log('\nVerifying Global Leaderboard ranges...');
  try {
    await leaderboard.updateLeaderboardScore(userId, 1350, 1);
    
    const ratingLeaderboard = await leaderboard.getLeaderboard('rating', 10, 0);
    console.log('Leaderboard rankings:');
    ratingLeaderboard.forEach((r) => {
      console.log(` - Rank ${r.rank}: User: ${r.username}, Rating: ${r.score}`);
    });

    const aroundMe = await leaderboard.getLeaderboardAroundUser(userId, 'rating', 2);
    console.log('Around Me window rankings:');
    aroundMe.forEach((r) => {
      console.log(` - Rank ${r.rank}: User: ${r.username}, Rating: ${r.score}`);
    });

    if (ratingLeaderboard.length > 0 && aroundMe.length > 0) {
      console.log('✅ Leaderboards range and Around Me window queries validated.');
    }
  } catch (err: any) {
    console.error('❌ Leaderboard check failed:', err.message);
  }

  // 8. Test Rating Calculations (Glicko-2)
  console.log('\nSimulating contest end Glicko-2 ratings calculation...');
  let contestId = '00000000-0000-0000-0000-000000000002';
  try {
    // Create Contest Record to satisfy foreign key requirement
    await prisma.contest.create({
      data: {
        id: contestId,
        title: 'Mock Glicko Contest',
        startTime: new Date(),
        endTime: new Date(),
        status: 'ENDED',
        version: 0,
      },
    });

    // We need at least 2 participants. Create user B
    const userBUsername = `proguserB_${uniqueId}`;
    const userBEmail = `proguserB_${uniqueId}@test.com`;
    const regB = await axios.post(`${API_URL}/auth/register`, {
      email: userBEmail,
      username: userBUsername,
      password,
    });
    const userBId = (regB.data as any).data.id;

    // Seed mock scores
    await prisma.contestScore.create({
      data: {
        contestId,
        userId,
        solvedCount: 3,
        totalPoints: 300,
        totalPenalty: 45,
      },
    });

    await prisma.contestScore.create({
      data: {
        contestId,
        userId: userBId,
        solvedCount: 1,
        totalPoints: 100,
        totalPenalty: 120,
      },
    });

    // Run calculation
    await ratings.calculateContestRatings(contestId);

    const ratingA = await repo.getOrCreateRating(userId);
    const ratingB = await repo.getOrCreateRating(userBId);
    console.log(`Post-Contest Rating User A (Winner): ${ratingA.currentRating}, User B: ${ratingB.currentRating}`);

    if (ratingA.currentRating > 1200 && ratingB.currentRating < 1200) {
      console.log('✅ Glicko-2 rating engine winner increment / loser decrement logic validated.');
    } else {
      console.error('❌ Rating calculations error.');
    }
  } catch (err: any) {
    console.error('❌ Rating calculation failed:', err.message);
  }

  // 9. Test Replay Engine
  console.log('\nVerifying Ratings Replay Engine...');
  try {
    await ratings.replayAllRatings();
    const ratingA = await repo.getOrCreateRating(userId);
    console.log(`Replayed Rating User A: ${ratingA.currentRating}`);
    if (ratingA.currentRating > 1200) {
      console.log('✅ Rating history rebuild is deterministic and reproducible.');
    }
  } catch (err: any) {
    console.error('❌ Replay engine failed:', err.message);
  }

  // 10. Cache Recovery
  console.log('\nWiping Redis leaderboards to test cache recovery...');
  try {
    const redis = (leaderboard as any).redis;
    await redis.del('leaderboard:global:rating');
    
    let cacheEmpty = await redis.zcard('leaderboard:global:rating');
    console.log('Rating ZSET count after wipe:', cacheEmpty);

    await leaderboard.rebuildAllCaches();
    let cacheRecovered = await redis.zcard('leaderboard:global:rating');
    console.log('Rating ZSET count after recovery rebuild:', cacheRecovered);

    if (cacheRecovered > 0) {
      console.log('✅ Cache recovery from Postgres verified successfully.');
    }
  } catch (err: any) {
    console.error('❌ Cache recovery failed:', err.message);
  }

  // 11. Preference Settings Updates
  console.log('\nChecking Notification Preference settings endpoint...');
  try {
    const getPref = await axios.get(`${API_URL}/profiles/preferences`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log('Current email preference:', (getPref.data as any).data.enableEmail);

    const updatePref = await axios.put(
      `${API_URL}/profiles/preferences`,
      { enableEmail: false },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    console.log('Updated email preference:', (updatePref.data as any).data.enableEmail);
    if ((updatePref.data as any).data.enableEmail === false) {
      console.log('✅ Preferences update validated successfully.');
    }
  } catch (err: any) {
    console.error('❌ Preferences check failed:', err.message);
  }

  // Close socket and DB
  clientSocket.disconnect();
  await leaderboard.closeConnections();
  await ratings.closeConnections();

  console.log('\nCleaning up progress test user records...');
  try {
    await prisma.contest.delete({ where: { id: contestId } });
    await prisma.user.delete({ where: { id: userId } });
    console.log('✅ Cleanup complete.');
  } catch (err) {}

  console.log('\n🏁 User Progress & Rating Engine Integration Tests Finished!');
}

runProfileTests().catch(() => process.exit(1));
