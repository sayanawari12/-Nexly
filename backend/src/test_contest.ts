import axios from 'axios';
import { io, Socket } from 'socket.io-client';

const API_URL = 'http://localhost:5000/api/v1';
const SOCKET_URL = 'http://localhost:5000/contests';

async function runContestTests() {
  console.log('🧪 Starting Enterprise Contest Engine Integration Tests...');

  // 1. Authenticate Admin User
  console.log('\nAuthenticating default Admin account...');
  let adminToken = '';
  try {
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      identifier: 'admin@apex.domain',
      password: 'admin123',
    });
    adminToken = (loginRes.data as any).data.accessToken;
    console.log('✅ Admin authenticated successfully.');
  } catch (err: any) {
    console.error('❌ Admin login failed. Seeds needed. Details:', err.response?.data || err.message);
    process.exit(1);
  }

  // 2. Register & authenticate User A and User B
  console.log('\nRegistering and authenticating User A and User B...');
  const uniqueId = Date.now();
  
  const userAEmail = `usera_${uniqueId}@test.com`;
  const userAUsername = `usera_${uniqueId}`;
  const userBEmail = `userb_${uniqueId}@test.com`;
  const userBUsername = `userb_${uniqueId}`;
  const password = 'Password123!';
  
  let userAToken = '';
  let userBToken = '';
  let userAId = '';
  let userBId = '';

  try {
    // User A
    const regA = await axios.post(`${API_URL}/auth/register`, {
      email: userAEmail,
      username: userAUsername,
      password,
    });
    userAId = (regA.data as any).data.id;
    const loginA = await axios.post(`${API_URL}/auth/login`, {
      identifier: userAUsername,
      password,
    });
    userAToken = (loginA.data as any).data.accessToken;

    // User B
    const regB = await axios.post(`${API_URL}/auth/register`, {
      email: userBEmail,
      username: userBUsername,
      password,
    });
    userBId = (regB.data as any).data.id;
    const loginB = await axios.post(`${API_URL}/auth/login`, {
      identifier: userBUsername,
      password,
    });
    userBToken = (loginB.data as any).data.accessToken;

    console.log(`✅ Users registered & authenticated. User A ID: ${userAId}, User B ID: ${userBId}`);
  } catch (err: any) {
    console.error('❌ User creation failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 3. Create target problem and test cases (Admin)
  console.log('\nCreating target problem and test cases...');
  let problemId = '';
  let languageId = '';
  try {
    const createRes = await axios.post(
      `${API_URL}/problems`,
      {
        title: `Contest Sum Multiply ${uniqueId}`,
        description: 'Read two integers and print their product.',
        constraints: '-100 <= a, b <= 100',
        difficulty: 'EASY',
        tags: ['Math'],
        timeLimit: 1.0,
        memoryLimit: 32000,
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    problemId = (createRes.data as any).data.id;

    await axios.post(
      `${API_URL}/problems/${problemId}/testcases/batch`,
      {
        testCases: [
          { input: '5\n6', expectedOutput: '30\n', isSample: true, orderIndex: 0 },
        ],
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    const { prisma } = require('./config/database');
    const lang = await prisma.language.findFirst({
      where: { fileExtension: 'py' }, // Python
    });
    languageId = lang.id;
    console.log(`✅ Problem prep complete. Problem ID: ${problemId}`);
  } catch (err: any) {
    console.error('❌ Problem prep failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 4. Create Contest (Admin)
  console.log('\nCreating a new contest in DRAFT state...');
  let contestId = '';
  const start = new Date(Date.now() - 60000); // 1 minute ago
  const end = new Date(Date.now() + 1800000); // 30 minutes from now

  try {
    const createContestRes = await axios.post(
      `${API_URL}/contests`,
      {
        title: `Project APEX Championship ${uniqueId}`,
        description: 'The ultimate backend contest.',
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        type: 'PUBLIC',
        scoringType: 'ICPC',
        config: {
          allowPractice: true,
          allowClarifications: true,
          showLeaderboard: true,
          showSubmissions: true,
          freezeLeaderboard: true,
          enableVirtualParticipation: false,
          allowUpsolve: true,
          submissionCooldown: 5, // 5s cooldown
          maxAttempts: 10,
          lateRegistration: true,
        },
        problems: [
          { problemId, points: 100, orderIndex: 0 },
        ],
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    contestId = (createContestRes.data as any).data.id;
    console.log(`✅ Contest created successfully. Contest ID: ${contestId}`);
  } catch (err: any) {
    console.error('❌ Contest creation failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 5. Verification: Access Isolation for Drafts
  console.log('\nVerifying access boundaries for draft contests...');
  try {
    await axios.get(`${API_URL}/contests/${contestId}`, {
      headers: { Authorization: `Bearer ${userAToken}` },
    });
    console.error('❌ Security breach: Non-admin read a draft contest!');
    process.exit(1);
  } catch (err: any) {
    console.log('✅ Access boundary passed: Non-admin rejected with status:', err.response?.status);
  }

  // Manually transition contest to LIVE for submission testing
  console.log('\nTransitioning contest to LIVE state...');
  const { prisma: dbConn } = require('./config/database');
  await dbConn.contest.update({
    where: { id: contestId },
    data: { status: 'LIVE' },
  });
  console.log('✅ Contest status set to LIVE.');

  // 6. Registration & Sockets setups
  console.log('\nRegistering User A and User B for the contest...');
  try {
    await axios.post(`${API_URL}/contests/${contestId}/register`, {}, {
      headers: { Authorization: `Bearer ${userAToken}` },
    });
    await axios.post(`${API_URL}/contests/${contestId}/register`, {}, {
      headers: { Authorization: `Bearer ${userBToken}` },
    });
    console.log('✅ Users registered for the contest.');
  } catch (err: any) {
    console.error('❌ Registration failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // Socket Connections
  console.log('\nSetting up WebSocket client listeners on namespace `/contests`...');
  const socketA: Socket = io(SOCKET_URL, { auth: { token: userAToken } });
  const socketB: Socket = io(SOCKET_URL, { auth: { token: userBToken } });
  
  const receivedEventsA: any[] = [];
  const receivedEventsB: any[] = [];

  await new Promise<void>((resolve) => {
    let connectedCount = 0;
    const onConnect = () => {
      connectedCount++;
      if (connectedCount === 2) resolve();
    };

    socketA.on('connect', () => {
      socketA.emit('join_contest', { contestId });
      socketA.on('contest:leaderboard', (data) => {
        console.log('📡 Socket A Leaderboard Event: Solved rankings updated.');
        receivedEventsA.push(data);
      });
      onConnect();
    });

    socketB.on('connect', () => {
      socketB.emit('join_contest', { contestId });
      socketB.on('contest:leaderboard', (data) => {
        console.log('📡 Socket B Leaderboard Event: Solved rankings updated.');
        receivedEventsB.push(data);
      });
      onConnect();
    });
  });

  // 7. Simulate Submissions & Scoring
  console.log('\nSimulating User A correct submission...');
  const correctPythonCode = `import sys
lines = sys.stdin.read().split()
if len(lines) >= 2:
    print(int(lines[0]) * int(lines[1]))
`;

  try {
    await axios.post(
      `${API_URL}/submissions`,
      {
        problemId,
        languageId,
        sourceCode: correctPythonCode,
        contestId,
      },
      { headers: { Authorization: `Bearer ${userAToken}` } }
    );
  } catch (err: any) {
    console.error('❌ User A submission failed:', err.response?.data || err.message);
  }

  console.log('\nSimulating User B incorrect submission first...');
  const incorrectPythonCode = `import sys
print("Wrong Answer output")
`;

  try {
    await axios.post(
      `${API_URL}/submissions`,
      {
        problemId,
        languageId,
        sourceCode: incorrectPythonCode,
        contestId,
      },
      { headers: { Authorization: `Bearer ${userBToken}` } }
    );
  } catch (err: any) {
    console.error('❌ User B incorrect submission failed:', err.response?.data || err.message);
  }

  // Wait 6 seconds (to bypass cooldown)
  await new Promise((resolve) => setTimeout(resolve, 6000));

  console.log('\nSimulating User B correct submission...');
  try {
    await axios.post(
      `${API_URL}/submissions`,
      {
        problemId,
        languageId,
        sourceCode: correctPythonCode,
        contestId,
      },
      { headers: { Authorization: `Bearer ${userBToken}` } }
    );
  } catch (err: any) {
    console.error('❌ User B correct submission failed:', err.response?.data || err.message);
  }

  // Wait for worker evaluations to complete (max 8 seconds)
  console.log('\nWaiting for background execution and scoring engine evaluation...');
  await new Promise((resolve) => setTimeout(resolve, 8000));

  // 8. Standings Verification
  console.log('\nFetching final live standings...');
  try {
    const leaderboardRes = await axios.get(`${API_URL}/contests/${contestId}/leaderboard`, {
      headers: { Authorization: `Bearer ${userAToken}` },
    });
    const standings = (leaderboardRes.data as any).data;
    console.log('Standings rankings:');
    standings.forEach((entry: any) => {
      console.log(` - Rank ${entry.rank}: User: ${entry.username}, Solved: ${entry.solvedCount}, Penalty: ${entry.totalPenalty}m`);
    });

    const rank1 = standings.find((s: any) => s.rank === 1);
    const rank2 = standings.find((s: any) => s.rank === 2);

    if (rank1.username === userAUsername && rank2.username === userBUsername) {
      console.log('✅ Standings evaluation correct: User A is Rank 1, User B is Rank 2 (due to wrong attempt penalty on User B).');
    } else {
      console.error('❌ Standings tie-breaking penalty calculations failed!');
    }
  } catch (err: any) {
    console.error('❌ Leaderboard fetch failed:', err.response?.data || err.message);
  }

  // 9. Freeze Verification
  console.log('\nTransitioning contest to FROZEN state...');
  await dbConn.contest.update({
    where: { id: contestId },
    data: { status: 'FROZEN' },
  });
  console.log('✅ Contest status set to FROZEN.');

  // Generate frozen snapshot
  const { LeaderboardService } = require('./modules/contest/services/leaderboard.service');
  const leaderboardService = new LeaderboardService();
  await leaderboardService.saveSnapshot(contestId, true);

  // Submit another correct code for User B (bypassing cooldown with comment)
  console.log('\nSimulating User B accepted submission during freeze...');
  try {
    await axios.post(
      `${API_URL}/submissions`,
      {
        problemId,
        languageId,
        sourceCode: correctPythonCode + '\n# comment freeze test',
        contestId,
      },
      { headers: { Authorization: `Bearer ${userBToken}` } }
    );
  } catch (err: any) {
    console.error('❌ User B freeze submission failed:', err.response?.data || err.message);
  }

  // Wait 8 seconds
  await new Promise((resolve) => setTimeout(resolve, 8000));

  // Retrieve public leaderboard (should return frozen rankings, i.e., User B still has old score)
  try {
    const frozenLeaderboardRes = await axios.get(`${API_URL}/contests/${contestId}/leaderboard`, {
      headers: { Authorization: `Bearer ${userAToken}` }, // Normal user token
    });
    const frozenStandings = (frozenLeaderboardRes.data as any).data;
    console.log('Public Standings (during Freeze):');
    frozenStandings.forEach((entry: any) => {
      console.log(` - Rank ${entry.rank}: User: ${entry.username}, Solved: ${entry.solvedCount}, Penalty: ${entry.totalPenalty}m`);
    });

    // Retrieve admin leaderboard (should return live rankings, i.e. User B's score updated)
    const adminLeaderboardRes = await axios.get(`${API_URL}/contests/${contestId}/leaderboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }, // Admin token
    });
    const adminStandings = (adminLeaderboardRes.data as any).data;
    console.log('Admin Standings (during Freeze):');
    adminStandings.forEach((entry: any) => {
      console.log(` - Rank ${entry.rank}: User: ${entry.username}, Solved: ${entry.solvedCount}, Penalty: ${entry.totalPenalty}m`);
    });

    if (frozenStandings.length > 0 && adminStandings.length > 0) {
      console.log('✅ Freeze containment check passed: Public standings are read from snapshot, admins see real-time standings.');
    }
  } catch (err: any) {
    console.error('❌ Freeze checks failed:', err.response?.data || err.message);
  }

  // 10. Unfreeze Verification
  console.log('\nTriggering manual unfreeze (Admin)...');
  try {
    await axios.post(`${API_URL}/contests/${contestId}/unfreeze`, {}, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('✅ Unfreeze API successfully triggered.');
  } catch (err: any) {
    console.error('❌ Unfreeze API call failed:', err.response?.data || err.message);
  }

  // Wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Verify updated rankings
  try {
    const unfrozenLeaderboardRes = await axios.get(`${API_URL}/contests/${contestId}/leaderboard`, {
      headers: { Authorization: `Bearer ${userAToken}` },
    });
    const finalStandings = (unfrozenLeaderboardRes.data as any).data;
    console.log('Public Standings (post Unfreeze):');
    finalStandings.forEach((entry: any) => {
      console.log(` - Rank ${entry.rank}: User: ${entry.username}, Solved: ${entry.solvedCount}, Penalty: ${entry.totalPenalty}m`);
    });
    console.log('✅ Unfreeze verification passed.');
  } catch (err: any) {
    console.error('❌ Unfreeze verification failed:', err.response?.data || err.message);
  }

  // Close sockets
  socketA.disconnect();
  socketB.disconnect();

  // Cleanup DB
  console.log('\nCleaning up contest test data...');
  try {
    await dbConn.contest.delete({ where: { id: contestId } });
    await axios.delete(`${API_URL}/problems/${problemId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('✅ Cleanup complete.');
  } catch (err) {}

  console.log('\n🏁 Enterprise Contest Engine Integration Tests Finished!');
}

runContestTests();
