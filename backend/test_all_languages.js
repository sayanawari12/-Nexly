const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000/api/v1';

async function testAll() {
  console.log('\n========================================');
  console.log('🧪 VERIFYING ALL LANGUAGES SYSTEM-WIDE');
  console.log('========================================');

  const loginRes = await axios.post(`${BACKEND_URL}/auth/login`, {
    identifier: 'admin',
    password: 'admin123',
  });
  const token = loginRes.data?.data?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  const tests = [
    { name: 'C', id: 50, code: '#include <stdio.h>\nint main() { printf("Hello from C\\n"); return 0; }' },
    { name: 'C++', id: 54, code: '#include <cstdio>\nint main() { printf("Hello from C++\\n"); return 0; }' },
    { name: 'Python', id: 71, code: 'print("Hello from Python")' },
    { name: 'Java', id: 62, code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, sayan!");\n    }\n}' },
  ];

  for (const t of tests) {
    console.log(`\nTesting ${t.name} (languageId: ${t.id})...`);
    try {
      const res = await axios.post(`${BACKEND_URL}/compiler/run`, {
        languageId: t.id,
        sourceCode: t.code,
        stdin: '',
      }, { headers });

      console.log(`STATUS: ${res.data?.data?.status}`);
      console.log(`STDOUT: ${JSON.stringify(res.data?.data?.stdout)}`);
      console.log(`STDERR: ${JSON.stringify(res.data?.data?.stderr)}`);
      console.log(`TIME: ${res.data?.data?.executionTime}s`);
    } catch (err) {
      console.error(`ERROR for ${t.name}:`, err.response?.data || err.message);
    }
  }
}

testAll();
