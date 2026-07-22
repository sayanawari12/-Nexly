const axios = require('axios');

async function testCpp() {
  const payload = {
    language: 'c++',
    version: '10.2.0',
    files: [
      {
        name: 'main.cpp',
        content: '#include <iostream>\nint main() { std::cout << "Hello from C++\\n"; return 0; }',
      },
    ],
    stdin: '',
  };

  console.log('SENDING C++ PAYLOAD (with name: main.cpp):', JSON.stringify(payload, null, 2));

  const start = Date.now();
  try {
    const res = await axios.post('http://localhost:2000/api/v2/execute', payload);
    const duration = (Date.now() - start) / 1000;
    console.log(`DURATION: ${duration}s`);
    console.log('RESPONSE:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
  }
}

testCpp();
