const https = require('https');

const pbUrl = 'https://ai-life-solution-challenge.duckdns.org';
const email = 'sanoramyun8@gmail.com';
const password = 'T22qjsrlf67!';

// Admin auth
const authData = JSON.stringify({
  identity: email,
  password: password
});

const authOptions = {
  hostname: 'ai-life-solution-challenge.duckdns.org',
  path: '/api/admins/auth-with-password',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': authData.length
  }
};

const authReq = https.request(authOptions, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const auth = JSON.parse(data);
      const token = auth.token;

      console.log('✓ Authentication successful');
      console.log('Token:', token.substring(0, 20) + '...\n');

      // Get collections
      const collOptions = {
        hostname: 'ai-life-solution-challenge.duckdns.org',
        path: '/api/collections',
        method: 'GET',
        headers: {
          'Authorization': token
        }
      };

      const collReq = https.request(collOptions, (res2) => {
        let collData = '';

        res2.on('data', (chunk) => {
          collData += chunk;
        });

        res2.on('end', () => {
          if (res2.statusCode === 200) {
            const response = JSON.parse(collData);
            console.log('Raw response:', JSON.stringify(response, null, 2).substring(0, 500));

            const collections = Array.isArray(response) ? response : (response.items || []);
            console.log('\nCollections found:', collections.length);
            console.log('\n=== Collection List ===\n');
            collections.forEach(coll => {
              console.log(`📦 ${coll.name} (${coll.type})`);
              console.log(`   ID: ${coll.id}`);
              console.log(`   Fields: ${coll.schema ? coll.schema.length : 0}`);
              console.log('');
            });
          } else {
            console.error('Error getting collections:', res2.statusCode, collData);
          }
        });
      });

      collReq.on('error', (error) => {
        console.error('Error:', error);
      });

      collReq.end();

    } else {
      console.error('Authentication failed:', res.statusCode, data);
    }
  });
});

authReq.on('error', (error) => {
  console.error('Error:', error);
});

authReq.write(authData);
authReq.end();
