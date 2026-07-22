const axios = require('axios');

async function testCpp() {
  const payload = {
    language: 'c++',
    version: '10.2.0',
    files: [
      {
        name: 'code.cpp',
        content: '#include <stdio.h>\nint main() { printf("Hello from C++\\n"); return 0; }',
      },
    ],
    stdin: '',
    compile_timeout: 10000,
    run_timeout: 5000,
  };

  console.log('TESTING C++ DIRECT:');
  try {
    const res = await axios.post('http://localhost:2000/api/v2/execute', payload);
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
  }
}

testCpp();
