const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000/api/v1';

async function testJavaLive() {
  console.log('\n========================================');
  console.log('🧪 TESTING JAVA LIVE EXECUTION');
  console.log('========================================');

  // 1. Authenticate (Login as admin)
  let token = '';
  try {
    const loginRes = await axios.post(`${BACKEND_URL}/auth/login`, {
      identifier: 'admin',
      password: 'admin123',
    });
    token = loginRes.data?.data?.accessToken;
    console.log('✅ Authentication Successful. JWT token acquired.');
  } catch (err) {
    console.error('❌ Login failed:', err.response?.data || err.message);
    throw err;
  }

  // 2. Test Java Code Execution
  const headers = { Authorization: `Bearer ${token}` };
  const sourceCode = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, sayan!");
    }
}`;

  console.log('\n2. Executing Java Code via POST /api/v1/compiler/run...');
  console.log('SOURCE CODE:\n' + sourceCode);

  const start = Date.now();
  try {
    const res = await axios.post(`${BACKEND_URL}/compiler/run`, {
      languageId: 62,
      sourceCode,
      stdin: '',
    }, { headers });

    const duration = (Date.now() - start) / 1000;
    console.log(`\nDURATION: ${duration}s`);
    console.log('HTTP Status:', res.status);
    console.log('RESPONSE PAYLOAD:', JSON.stringify(res.data, null, 2));

    if (res.data?.success && res.data?.data?.status === 'ACCEPTED') {
      console.log(`\n✅ JAVA EXECUTION SUCCESSFUL! Output: ${JSON.stringify(res.data.data.stdout)}`);
    } else {
      console.error(`\n❌ JAVA EXECUTION FAILED! Status:`, res.data?.data?.status);
    }
  } catch (err) {
    console.error(`\n❌ ERROR:`, err.response?.data || err.message);
  }
}

testJavaLive().catch(console.error);
