const axios = require('axios');

async function testJava(label, payload) {
  console.log(`\n=== TESTING JAVA: ${label} ===`);

  const start = Date.now();
  try {
    const res = await axios.post('http://localhost:2000/api/v2/execute', payload);
    const duration = (Date.now() - start) / 1000;
    console.log(`DURATION: ${duration}s`);
    console.log('RESPONSE:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log('ERROR:', err.response?.data || err.message);
  }
}

async function main() {
  const code = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, sayan!");
    }
}`;

  // Test 1: Standard
  await testJava('Standard (no args)', {
    language: 'java',
    version: '15.0.2',
    files: [{ content: code }],
    stdin: '',
  });

  // Test 2: Passing JVM args
  await testJava('With JVM args (-XX:TieredStopAtLevel=1 -XX:+UseSerialGC)', {
    language: 'java',
    version: '15.0.2',
    files: [{ content: code }],
    stdin: '',
    args: ['-XX:TieredStopAtLevel=1', '-XX:+UseSerialGC'],
  });
}

main();
