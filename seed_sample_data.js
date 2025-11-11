const https = require('https');

const pbUrl = 'https://ai-life-solution-challenge.duckdns.org';
const email = 'sanoramyun8@gmail.com';
const password = 'T22qjsrlf67!';

let authToken = '';

// Helper function to make API calls
function apiCall(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ai-life-solution-challenge.duckdns.org',
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      }
    };

    if (data) {
      const body = JSON.stringify(data);
      options.headers['Content-Length'] = body.length;
    }

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Authenticate
async function authenticate() {
  console.log('🔐 Authenticating...');
  const authData = {
    identity: email,
    password: password
  };

  const options = {
    hostname: 'ai-life-solution-challenge.duckdns.org',
    path: '/api/admins/auth-with-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(authData).length
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
          console.log('✅ Authentication successful\n');
          resolve(auth);
        } else {
          reject(new Error(`Auth failed: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(authData));
    req.end();
  });
}

// Sample data
const sampleProducts = [
  { barcode: '8801234567890', name: '우유 1L', category: 'food', price: 3500, brand: '서울우유', nutritionInfo: '단백질 6g, 칼슘 200mg', allergyInfo: '우유', safetyWarnings: '개봉 후 냉장보관', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567891', name: '식빵', category: 'food', price: 2800, brand: '삼립', nutritionInfo: '탄수화물 45g', allergyInfo: '밀, 계란', safetyWarnings: '실온보관', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567892', name: '두부', category: 'food', price: 1500, brand: '풀무원', nutritionInfo: '단백질 8g, 칼슘 150mg', allergyInfo: '대두', safetyWarnings: '냉장보관', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567893', name: '계란 10구', category: 'food', price: 4000, brand: '농협', nutritionInfo: '단백질 12g', allergyInfo: '계란', safetyWarnings: '냉장보관', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567894', name: '사과 5개입', category: 'food', price: 8000, brand: '청송', nutritionInfo: '비타민 C', allergyInfo: 'none', safetyWarnings: '세척 후 섭취', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567895', name: '혈압약', category: 'medicine', price: 15000, brand: '대웅제약', nutritionInfo: '', allergyInfo: '', safetyWarnings: '식후 30분 복용, 의사 처방 필요', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567896', name: '파스', category: 'medicine', price: 5000, brand: '동구제약', nutritionInfo: '', allergyInfo: '피부 알레르기 주의', safetyWarnings: '환부에만 부착', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567897', name: '비타민D', category: 'health', price: 12000, brand: 'GNC', nutritionInfo: '비타민D 1000IU', allergyInfo: 'none', safetyWarnings: '1일 1회', recommendedFor: 'senior', imageUrl: '' },
  { barcode: '8801234567898', name: '고무장갑', category: 'household', price: 3000, brand: '안전코리아', nutritionInfo: '', allergyInfo: '라텍스', safetyWarnings: '화기주의', recommendedFor: 'all', imageUrl: '' },
  { barcode: '8801234567899', name: '세제', category: 'household', price: 8000, brand: 'LG생활건강', nutritionInfo: '', allergyInfo: '', safetyWarnings: '음용금지, 어린이 손 닿지 않는 곳에 보관', recommendedFor: 'all', imageUrl: '' }
];

const sampleUsers = [
  { email: 'senior1@test.com', password: 'Test1234!', passwordConfirm: 'Test1234!', name: '김영희', age: 72, guardianPhone: '010-1111-2222' },
  { email: 'senior2@test.com', password: 'Test1234!', passwordConfirm: 'Test1234!', name: '이철수', age: 68, age: 68, guardianPhone: '010-2222-3333' },
  { email: 'senior3@test.com', password: 'Test1234!', passwordConfirm: 'Test1234!', name: '박순자', age: 75, guardianPhone: '010-3333-4444' },
  { email: 'senior4@test.com', password: 'Test1234!', passwordConfirm: 'Test1234!', name: '최민수', age: 70, guardianPhone: '010-4444-5555' }
];

async function seedData() {
  try {
    await authenticate();

    // Create products
    console.log('📦 Creating products...');
    const products = [];
    for (const product of sampleProducts) {
      try {
        const created = await apiCall('POST', '/api/collections/products/records', product);
        products.push(created);
        console.log(`  ✅ Created: ${product.name}`);
      } catch (error) {
        console.log(`  ⚠️  ${product.name}: ${error.message}`);
      }
    }

    // Create users
    console.log('\n👥 Creating users...');
    const users = [];
    for (const user of sampleUsers) {
      try {
        const created = await apiCall('POST', '/api/collections/users/records', user);
        users.push(created);
        console.log(`  ✅ Created: ${user.name} (${user.email})`);
      } catch (error) {
        console.log(`  ⚠️  ${user.name}: ${error.message}`);
      }
    }

    if (users.length === 0) {
      console.log('\n⚠️  No users created. Fetching existing users...');
      const existingUsers = await apiCall('GET', '/api/collections/users/records?perPage=10');
      users.push(...existingUsers.items);
    }

    if (users.length === 0) {
      console.log('❌ No users available. Cannot create related records.');
      return;
    }

    // Create emergency contacts
    console.log('\n📞 Creating emergency contacts...');
    for (const user of users.slice(0, 4)) {
      try {
        const contact = {
          user: user.id,
          name: '보호자',
          relationship: 'child',
          phone: user.guardianPhone || '010-9999-8888',
          isPrimary: true,
          notificationEnabled: true,
          notes: '긴급 연락처'
        };
        await apiCall('POST', '/api/collections/emergency_contacts/records', contact);
        console.log(`  ✅ Created contact for ${user.name}`);
      } catch (error) {
        console.log(`  ⚠️  ${user.name}: ${error.message}`);
      }
    }

    // Create kiosk sessions
    console.log('\n🖥️  Creating kiosk sessions...');
    for (let i = 0; i < 5; i++) {
      const user = users[i % users.length];
      try {
        const session = {
          user: user.id,
          startTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString(),
          itemsScanned: Math.floor(Math.random() * 10) + 1,
          assistanceRequested: Math.random() > 0.7,
          completedSuccessfully: Math.random() > 0.2,
          difficultyLevel: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
          notes: '키오스크 사용 기록'
        };
        await apiCall('POST', '/api/collections/kiosk_sessions/records', session);
        console.log(`  ✅ Session #${i + 1} for ${user.name}`);
      } catch (error) {
        console.log(`  ⚠️  Session ${i + 1}: ${error.message}`);
      }
    }

    // Create voice phishing logs
    console.log('\n☎️  Creating voice phishing logs...');
    const phishingTypes = ['investment', 'tax', 'bank', 'family', 'other'];
    for (let i = 0; i < 6; i++) {
      const user = users[i % users.length];
      try {
        const log = {
          user: user.id,
          phoneNumber: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
          detectedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
          phishingType: phishingTypes[Math.floor(Math.random() * phishingTypes.length)],
          confidence: Math.floor(Math.random() * 30) + 70,
          blocked: Math.random() > 0.3,
          guardianNotified: Math.random() > 0.4,
          callDuration: Math.floor(Math.random() * 180),
          notes: '의심스러운 전화 감지'
        };
        await apiCall('POST', '/api/collections/voice_phishing_logs/records', log);
        console.log(`  ✅ Phishing log #${i + 1} for ${user.name}`);
      } catch (error) {
        console.log(`  ⚠️  Log ${i + 1}: ${error.message}`);
      }
    }

    // Create daily activities
    console.log('\n📅 Creating daily activities...');
    const activities = ['medication', 'meal', 'exercise', 'social', 'rest', 'shopping', 'other'];
    for (let i = 0; i < 8; i++) {
      const user = users[i % users.length];
      try {
        const activity = {
          user: user.id,
          activityType: activities[Math.floor(Math.random() * activities.length)],
          startTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString(),
          location: '집',
          completed: Math.random() > 0.2,
          moodRating: Math.floor(Math.random() * 3) + 3,
          notes: '일상 활동 기록'
        };
        await apiCall('POST', '/api/collections/daily_activities/records', activity);
        console.log(`  ✅ Activity #${i + 1} for ${user.name}`);
      } catch (error) {
        console.log(`  ⚠️  Activity ${i + 1}: ${error.message}`);
      }
    }

    // Create guardian notifications
    console.log('\n🔔 Creating guardian notifications...');
    const notificationTypes = ['emergency', 'warning', 'info', 'reminder'];
    for (let i = 0; i < 6; i++) {
      const user = users[i % users.length];
      try {
        const notification = {
          user: user.id,
          type: notificationTypes[Math.floor(Math.random() * notificationTypes.length)],
          title: '알림',
          message: '보호자 알림 메시지입니다.',
          sentAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          read: Math.random() > 0.5,
          acknowledged: Math.random() > 0.6,
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          relatedRecordId: ''
        };
        await apiCall('POST', '/api/collections/guardian_notifications/records', notification);
        console.log(`  ✅ Notification #${i + 1} for ${user.name}`);
      } catch (error) {
        console.log(`  ⚠️  Notification ${i + 1}: ${error.message}`);
      }
    }

    console.log('\n✅ Sample data seeding completed!');
    console.log('\n📊 Summary:');
    console.log(`  Products: ${products.length} created`);
    console.log(`  Users: ${users.length} available`);
    console.log('  Emergency contacts: created');
    console.log('  Kiosk sessions: created');
    console.log('  Voice phishing logs: created');
    console.log('  Daily activities: created');
    console.log('  Guardian notifications: created');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

seedData();
