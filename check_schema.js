const https = require('https');

const pbUrl = 'https://ai-life-solution-challenge.duckdns.org';
const email = 'sanoramyun8@gmail.com';
const password = 'T22qjsrlf67!';

let authToken = '';

async function authenticate() {
  const authData = JSON.stringify({
    identity: email,
    password: password
  });

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
          const auth = JSON.parse(data);
          authToken = auth.token;
          resolve(auth);
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

async function getCollectionSchema(collectionName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ai-life-solution-challenge.duckdns.org',
      path: `/api/collections/${collectionName}`,
      method: 'GET',
      headers: {
        'Authorization': authToken
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed: ${data}`));
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

  const collections = ['products', 'users', 'emergency_contacts', 'kiosk_sessions', 'voice_phishing_logs', 'daily_activities', 'guardian_notifications'];

  for (const collName of collections) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📦 ${collName.toUpperCase()}`);
    console.log('='.repeat(60));

    try {
      const schema = await getCollectionSchema(collName);
      console.log(`Type: ${schema.type}`);
      console.log(`\nFields (${schema.schema.length}):`);

      schema.schema.forEach(field => {
        const required = field.required ? '(required)' : '(optional)';
        const unique = field.unique ? '[unique]' : '';
        console.log(`  • ${field.name}: ${field.type} ${required} ${unique}`);

        if (field.options) {
          const opts = Object.entries(field.options)
            .filter(([k, v]) => v !== null && v !== undefined && v !== false && v !== '')
            .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
            .join(', ');
          if (opts) {
            console.log(`    Options: ${opts}`);
          }
        }
      });
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }
}

main();
