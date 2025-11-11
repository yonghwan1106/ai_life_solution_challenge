const https = require('https');

const email = 'sanoramyun8@gmail.com';
const password = 'T22qjsrlf67!';
let authToken = '';

async function authenticate() {
  const authData = JSON.stringify({ identity: email, password: password });
  const options = {
    hostname: 'ai-life-solution-challenge.duckdns.org',
    path: '/api/admins/auth-with-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': authData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          authToken = JSON.parse(data).token;
          resolve();
        } else {
          reject(new Error(`Auth failed: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(authData);
    req.end();
  });
}

async function testCreate() {
  // Test 1: Minimal product
  console.log('Test 1: Creating minimal product...');
  const minimalProduct = {
    barcode: '1234567890',
    name: '테스트 상품'
  };

  const body1 = JSON.stringify(minimalProduct);
  console.log('Payload:', body1);

  const options1 = {
    hostname: 'ai-life-solution-challenge.duckdns.org',
    path: '/api/collections/products/records',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body1.length,
      'Authorization': authToken
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options1, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', data);
        resolve();
      });
    });
    req.on('error', reject);
    req.write(body1);
    req.end();
  });
}

async function main() {
  await authenticate();
  console.log('✅ Authenticated\n');
  await testCreate();
}

main().catch(console.error);
