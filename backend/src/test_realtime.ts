import axios from 'axios';
import { io, Socket } from 'socket.io-client';

const API_URL = 'http://localhost:5000/api/v1';
const SOCKET_URL = 'http://localhost:5000/submissions';

async function runTests() {
  console.log('🧪 Starting Real-Time WebSocket integration tests...');

  // 1. Authenticate Admin User (using default credentials admin@apex.domain / admin123)
  console.log('\nAuthenticating default Admin account...');
  let adminToken = '';
  try {
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      identifier: 'admin@apex.domain',
      password: 'admin123',
    });
    const body = loginRes.data as any;
    adminToken = body.data.accessToken;
    console.log('✅ Admin authenticated successfully.');
  } catch (err: any) {
    console.error('❌ Admin login failed. Seed database first! Details:', err.response?.data || err.message);
    process.exit(1);
  }

  // 2. Register and login test user
  console.log('\nRegistering and authenticating test user...');
  const uniqueId = Date.now();
  const userEmail = `user_${uniqueId}@test.com`;
  const userUsername = `user_${uniqueId}`;
  const userPassword = 'Password123!';
  let userToken = '';
  let userId = '';

  try {
    const regRes = await axios.post(`${API_URL}/auth/register`, {
      email: userEmail,
      username: userUsername,
      password: userPassword,
    });
    userId = (regRes.data as any).data.id;

    const userLogin = await axios.post(`${API_URL}/auth/login`, {
      identifier: userUsername,
      password: userPassword,
    });
    const body = userLogin.data as any;
    userToken = body.data.accessToken;
    console.log(`✅ Test user registered (ID: ${userId}) & authenticated.`);
  } catch (err: any) {
    console.error('❌ Test user registration failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 3. Create target problem and test cases
  console.log('\nCreating target problem and test cases (Admin)...');
  let problemId = '';
  let languageId = '';
  try {
    const createRes = await axios.post(
      `${API_URL}/problems`,
      {
        title: `RealTime Multiply ${uniqueId}`,
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
          { input: '3\n4', expectedOutput: '12\n', isSample: true, orderIndex: 0 },
        ],
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    const { prisma } = require('./config/database');
    const lang = await prisma.language.findFirst({
      where: { judge0LanguageId: 71 }, // Python
    });
    languageId = lang.id;
    console.log(`✅ Problem prep complete.`);
  } catch (err: any) {
    console.error('❌ Problem prep failed:', err.response?.data || err.message);
    process.exit(1);
  }

  // 4. Verification: Socket Connection Lifecycle & Handshake Guards
  console.log('\nTesting: WebSocket Handshake guards...');
  
  // A. Handshake without token (should fail)
  const socketNoToken = io(SOCKET_URL, { autoConnect: false });
  socketNoToken.connect();
  await new Promise<void>((resolve) => {
    socketNoToken.on('connect_error', (err) => {
      console.log('✅ Connection refused without token. Message:', err.message);
      socketNoToken.disconnect();
      resolve();
    });
  });

  // B. Handshake with invalid token (should fail)
  const socketBadToken = io(SOCKET_URL, {
    auth: { token: 'invalid-token' },
    autoConnect: false,
  });
  socketBadToken.connect();
  await new Promise<void>((resolve) => {
    socketBadToken.on('connect_error', (err) => {
      console.log('✅ Connection refused with bad token. Message:', err.message);
      socketBadToken.disconnect();
      resolve();
    });
  });

  // C. Handshake with valid token (should succeed)
  console.log('\nConnecting with valid user access token...');
  const clientSocket: Socket = io(SOCKET_URL, {
    auth: { token: userToken },
    autoConnect: false,
  });

  clientSocket.connect();

  await new Promise<void>((resolve) => {
    clientSocket.on('connect', () => {
      console.log('✅ Socket connected successfully! Socket ID:', clientSocket.id);
      resolve();
    });
  });

  // 5. Verification: Real-Time Event Streaming via WebSockets
  console.log('\nSubscribing to submission:updated socket events...');
  const receivedEvents: any[] = [];

  clientSocket.on('submission:updated', (data) => {
    console.log(`📡 WebSocket Event Received: ${data.status} (Seq: ${data.sequenceNumber})`);
    receivedEvents.push(data);
  });

  // Submit Python code
  console.log('\nSubmitting Python solution (POST /submissions)...');
  const pythonCode = `import sys
lines = sys.stdin.read().split()
if len(lines) >= 2:
    print(int(lines[0]) * int(lines[1]))
`;

  let submissionId = '';
  try {
    const subRes = await axios.post(
      `${API_URL}/submissions`,
      {
        problemId,
        languageId,
        sourceCode: pythonCode,
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    submissionId = (subRes.data as any).data.id;
    console.log(`✅ Submission registered. ID: ${submissionId}`);
  } catch (err: any) {
    console.error('❌ Submission request failed:', err.response?.data || err.message);
  }

  // Wait for real-time events to stream back (max 10 seconds)
  console.log('\nWaiting for live updates...');
  for (let wait = 1; wait <= 10; wait++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const completedEvent = receivedEvents.find((evt) => evt.status === 'ACCEPTED');
    if (completedEvent) {
      break;
    }
  }

  console.log(`\nTotal real-time events streamed: ${receivedEvents.length}`);
  receivedEvents.forEach((evt) => {
    console.log(` - State: ${evt.status}, Seq: ${evt.sequenceNumber}, Runtime: ${evt.executionTime}s, Memory: ${evt.memoryUsage}KB`);
  });

  if (receivedEvents.some((evt) => evt.status === 'ACCEPTED')) {
    console.log('\n✅ Real-time pipeline passed: Final state ACCEPTED streamed successfully!');
  } else {
    console.error('\n❌ Real-time pipeline failed: No final ACCEPTED state received.');
  }

  // 6. Verification: Access Isolation / Security Leakage Check
  console.log("\nTesting: Intruder socket trying to eavesdrop on user's channel...");
  const otherUser = `other_${uniqueId}`;
  let otherToken = '';
  try {
    await axios.post(`${API_URL}/auth/register`, {
      email: `other_${uniqueId}@test.com`,
      username: otherUser,
      password: userPassword,
    });
    const otherLogin = await axios.post(`${API_URL}/auth/login`, {
      identifier: otherUser,
      password: userPassword,
    });
    otherToken = (otherLogin.data as any).data.accessToken;
  } catch (err) {}

  const intruderSocket: Socket = io(SOCKET_URL, {
    auth: { token: otherToken },
    autoConnect: false,
  });

  let intruderReceived = false;
  intruderSocket.connect();
  
  await new Promise<void>((resolve) => {
    intruderSocket.on('connect', () => {
      intruderSocket.on('submission:updated', () => {
        intruderReceived = true;
      });
      resolve();
    });
  });

  // Re-submit python code under primary user token to trigger events stream
  try {
    await axios.post(
      `${API_URL}/submissions`,
      {
        problemId,
        languageId,
        sourceCode: pythonCode + '\n# comment to bypass idempotency',
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
  } catch (err) {}

  // Wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(`Intruder received event count: ${intruderReceived ? 'BREACHED' : '0 (SECURE)'}`);
  if (!intruderReceived) {
    console.log('✅ Access isolation check passed: Other users blocked from channel.');
  } else {
    console.error('❌ Security breach: Intruder eavesdropped on user channel.');
  }

  // Clean up
  clientSocket.disconnect();
  intruderSocket.disconnect();

  try {
    await axios.delete(`${API_URL}/problems/${problemId}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('Cleanup complete.');
  } catch (err) {}

  console.log('\n🏁 Real-Time WebSockets integration tests completed!');
}

runTests();
