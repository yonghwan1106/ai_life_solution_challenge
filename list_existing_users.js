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

async function listUsers() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ai-life-solution-challenge.duckdns.org',
      path: '/api/collections/users/records?perPage=100',
      method: 'GET',
      headers: { 'Authorization': authToken }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed: ${res.statusCode} ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  await authenticate();
  console.log('✅ Authenticated\n');

  const result = await listUsers();
  console.log(`Total users: ${result.totalItems}\n`);

  if (result.items.length > 0) {
    console.log('Existing users:');
    result.items.forEach((user, idx) => {
      console.log(`  ${idx + 1}. ${user.name || user.email || user.username} (${user.id})`);
      console.log(`     Email: ${user.email}`);
      console.log(`     Role: ${user.role || 'not set'}`);
      console.log(`     Created: ${user.created}`);
      console.log('');
    });
  } else {
    console.log('No users found.');
  }
}

main().catch(console.error);
