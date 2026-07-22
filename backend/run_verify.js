const axios = require('axios');

async function main() {
  console.log('>>> STARTING VERIFY SCRIPT...');
  try {
    const login = await axios.post('http://localhost:5000/api/v1/auth/login', {
      identifier: 'admin',
      password: 'admin123',
    });
    console.log('>>> LOGIN SUCCESSFUL');
    const token = login.data.data.accessToken;
    const headers = { Authorization: `Bearer ${token}` };

    console.log('\n--- TESTING C++ ---');
    const cpp = await axios.post('http://localhost:5000/api/v1/compiler/run', {
      languageId: 54,
      sourceCode: '#include <iostream>\nint main() { std::cout << "Hello from C++\\n"; return 0; }',
      stdin: '',
    }, { headers });
    console.log('C++ Status:', cpp.data?.data?.status);
    console.log('C++ Output:', JSON.stringify(cpp.data?.data?.stdout));

    console.log('\n--- TESTING JAVASCRIPT ---');
    const js = await axios.post('http://localhost:5000/api/v1/compiler/run', {
      languageId: 63,
      sourceCode: 'console.log("Hello from JavaScript");',
      stdin: '',
    }, { headers });
    console.log('JavaScript Status:', js.data?.data?.status);
    console.log('JavaScript Output:', JSON.stringify(js.data?.data?.stdout));
  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
  }
}

main();
