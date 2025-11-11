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

// Sample data matching the actual schema
const sampleProducts = [
  {
    barcode: '8801234567890',
    name: '우유 1L',
    brand: '서울우유',
    category: 'food',
    description: '<p>신선한 우유입니다</p>',
    ingredients: ["우유 100%"],
    allergens: ["우유"],
    expiry_date: '2025-12-31',
    warnings: '<p>개봉 후 냉장보관</p>'
  },
  {
    barcode: '8801234567891',
    name: '식빵',
    brand: '삼립',
    category: 'food',
    description: '<p>부드러운 식빵</p>',
    ingredients: ["밀가루", "설탕", "이스트", "소금"],
    allergens: ["밀", "계란"],
    expiry_date: '2025-12-15',
    warnings: '<p>실온보관</p>'
  },
  {
    barcode: '8801234567892',
    name: '두부',
    brand: '풀무원',
    category: 'food',
    description: '<p>단백질이 풍부한 두부</p>',
    ingredients: ["대두", "간수"],
    allergens: ["대두"],
    expiry_date: '2025-11-25',
    warnings: '<p>냉장보관</p>'
  },
  {
    barcode: '8801234567893',
    name: '계란 10구',
    brand: '농협',
    category: 'food',
    description: '<p>신선한 계란</p>',
    ingredients: ["계란 100%"],
    allergens: ["계란"],
    expiry_date: '2025-11-30',
    warnings: '<p>냉장보관</p>'
  },
  {
    barcode: '8801234567894',
    name: '사과 5개입',
    brand: '청송',
    category: 'food',
    description: '<p>아삭한 사과</p>',
    ingredients: ["사과 100%"],
    allergens: [],
    expiry_date: '2025-11-20',
    warnings: '<p>세척 후 섭취</p>'
  },
  {
    barcode: '8801234567895',
    name: '혈압약',
    brand: '대웅제약',
    category: 'medicine',
    description: '<p>고혈압 치료제</p>',
    ingredients: ["암로디핀"],
    allergens: [],
    warnings: '<p>식후 30분 복용, 의사 처방 필요</p>'
  },
  {
    barcode: '8801234567896',
    name: '파스',
    brand: '동구제약',
    category: 'medicine',
    description: '<p>근육통 완화</p>',
    ingredients: ["멘톨", "캡사이신"],
    allergens: [],
    warnings: '<p>피부 알레르기 주의, 환부에만 부착</p>'
  },
  {
    barcode: '8801234567897',
    name: '비타민D',
    brand: 'GNC',
    category: 'other',
    description: '<p>뼈 건강에 좋은 비타민D</p>',
    ingredients: ["비타민D 1000IU"],
    allergens: [],
    warnings: '<p>1일 1회 복용</p>'
  },
  {
    barcode: '8801234567898',
    name: '고무장갑',
    brand: '안전코리아',
    category: 'other',
    description: '<p>위생 고무장갑</p>',
    ingredients: [],
    allergens: ["라텍스"],
    warnings: '<p>화기주의</p>'
  },
  {
    barcode: '8801234567899',
    name: '세제',
    brand: 'LG생활건강',
    category: 'other',
    description: '<p>중성 세제</p>',
    ingredients: ["계면활성제"],
    allergens: [],
    warnings: '<p>음용금지, 어린이 손 닿지 않는 곳에 보관</p>'
  }
];

const sampleUsers = [
  {
    email: 'senior1@test.com',
    password: 'Test1234!',
    passwordConfirm: 'Test1234!',
    name: '김영희',
    role: 'elderly'
  },
  {
    email: 'senior2@test.com',
    password: 'Test1234!',
    passwordConfirm: 'Test1234!',
    name: '이철수',
    role: 'elderly'
  },
  {
    email: 'senior3@test.com',
    password: 'Test1234!',
    passwordConfirm: 'Test1234!',
    name: '박순자',
    role: 'elderly'
  },
  {
    email: 'senior4@test.com',
    password: 'Test1234!',
    passwordConfirm: 'Test1234!',
    name: '최민수',
    role: 'elderly'
  },
  {
    email: 'guardian1@test.com',
    password: 'Test1234!',
    passwordConfirm: 'Test1234!',
    name: '김보호',
    role: 'guardian'
  }
];

async function seedData() {
  try {
    await authenticate();

    // Create users first
    console.log('👥 Creating users...');
    const users = [];
    for (const user of sampleUsers) {
      try {
        const created = await apiCall('POST', '/api/collections/users/records', user);
        users.push(created);
        console.log(`  ✅ Created: ${user.name} (${user.email}) - ${user.role}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`  ℹ️  ${user.name}: Already exists`);
        } else {
          console.log(`  ⚠️  ${user.name}: ${error.message}`);
        }
      }
    }

    // Fetch existing users if creation failed
    if (users.length === 0) {
      console.log('\n⚠️  No new users created. Fetching existing users...');
      const existingUsers = await apiCall('GET', '/api/collections/users/records?perPage=100');
      users.push(...existingUsers.items);
      console.log(`  Found ${users.length} existing users`);
    }

    if (users.length === 0) {
      console.log('❌ No users available. Cannot create related records.');
      return;
    }

    const elderlyUsers = users.filter(u => u.role === 'elderly');
    const guardianUsers = users.filter(u => u.role === 'guardian');

    console.log(`\n  Elderly users: ${elderlyUsers.length}`);
    console.log(`  Guardian users: ${guardianUsers.length}`);

    // Create products
    console.log('\n📦 Creating products...');
    const products = [];
    for (const product of sampleProducts) {
      try {
        const created = await apiCall('POST', '/api/collections/products/records', product);
        products.push(created);
        console.log(`  ✅ Created: ${product.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`  ℹ️  ${product.name}: Already exists`);
        } else {
          console.log(`  ⚠️  ${product.name}: ${error.message.substring(0, 100)}`);
        }
      }
    }

    // Create emergency contacts
    console.log('\n📞 Creating emergency contacts...');
    for (let i = 0; i < Math.min(elderlyUsers.length, 4); i++) {
      const user = elderlyUsers[i];
      try {
        const contact = {
          user: user.id,
          name: `보호자${i + 1}`,
          relationship: ['자녀', '배우자', '친구', '친척'][i],
          phone: `010-${1000 + i}111-${2000 + i}222`,
          email: `guardian${i + 1}@test.com`,
          priority: i + 1,
          is_primary: i === 0
        };
        await apiCall('POST', '/api/collections/emergency_contacts/records', contact);
        console.log(`  ✅ Created contact for ${user.name}`);
      } catch (error) {
        console.log(`  ⚠️  ${user.name}: ${error.message.substring(0, 80)}`);
      }
    }

    // Create kiosk sessions
    console.log('\n🖥️  Creating kiosk sessions...');
    const kioskTypes = ['fastfood', 'cafe', 'ticket', 'payment', 'other'];
    for (let i = 0; i < 8; i++) {
      const user = elderlyUsers[i % elderlyUsers.length];
      if (!user) continue;

      try {
        const session = {
          user: user.id,
          kiosk_type: kioskTypes[i % kioskTypes.length],
          location: ['맥도날드', '스타벅스', '영화관', '은행', '편의점'][i % 5],
          steps_completed: [
            { step: 1, name: '메뉴선택', completed: true },
            { step: 2, name: '결제', completed: Math.random() > 0.2 }
          ],
          duration: Math.floor(Math.random() * 300) + 60,
          success: Math.random() > 0.2,
          help_requested: Math.random() > 0.7
        };
        await apiCall('POST', '/api/collections/kiosk_sessions/records', session);
        console.log(`  ✅ Session #${i + 1} for ${user.name} at ${session.location}`);
      } catch (error) {
        console.log(`  ⚠️  Session ${i + 1}: ${error.message.substring(0, 80)}`);
      }
    }

    // Create voice phishing logs
    console.log('\n☎️  Creating voice phishing logs...');
    const riskLevels = ['low', 'medium', 'high'];
    for (let i = 0; i < 6; i++) {
      const user = elderlyUsers[i % elderlyUsers.length];
      if (!user) continue;

      try {
        const log = {
          user: user.id,
          transcript: `<p>의심스러운 전화 내용 ${i + 1}: "세금 환급이 있습니다. 계좌번호를 알려주세요..."</p>`,
          risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
          detected_patterns: [
            { pattern: 'account_request', confidence: 0.85 },
            { pattern: 'urgency', confidence: 0.75 }
          ],
          caller_info: {
            number: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
            location: '서울'
          },
          duration: Math.floor(Math.random() * 180) + 30,
          guardian_notified: Math.random() > 0.4,
          is_blocked: Math.random() > 0.3,
          user_action: ['none', 'reported', 'blocked', 'ignored'][Math.floor(Math.random() * 4)]
        };
        await apiCall('POST', '/api/collections/voice_phishing_logs/records', log);
        console.log(`  ✅ Phishing log #${i + 1} for ${user.name} (${log.risk_level})`);
      } catch (error) {
        console.log(`  ⚠️  Log ${i + 1}: ${error.message.substring(0, 80)}`);
      }
    }

    // Create daily activities
    console.log('\n📅 Creating daily activities...');
    for (let i = 0; i < 10; i++) {
      const user = elderlyUsers[i % elderlyUsers.length];
      if (!user) continue;

      const daysAgo = i;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      try {
        const activity = {
          user: user.id,
          date: date.toISOString().split('T')[0],
          barcode_scans: Math.floor(Math.random() * 10),
          kiosk_uses: Math.floor(Math.random() * 5),
          voice_phishing_detections: Math.floor(Math.random() * 3),
          active_time: Math.floor(Math.random() * 300) + 60,
          health_score: Math.floor(Math.random() * 30) + 70,
          summary: `<p>${user.name}님의 일일 활동 요약입니다.</p>`
        };
        await apiCall('POST', '/api/collections/daily_activities/records', activity);
        console.log(`  ✅ Activity for ${user.name} on ${activity.date}`);
      } catch (error) {
        console.log(`  ⚠️  Activity ${i + 1}: ${error.message.substring(0, 80)}`);
      }
    }

    // Create guardian notifications
    if (guardianUsers.length > 0 && elderlyUsers.length > 0) {
      console.log('\n🔔 Creating guardian notifications...');
      const notificationTypes = ['voice_phishing', 'unusual_activity', 'emergency', 'daily_summary'];
      const priorities = ['low', 'medium', 'high', 'urgent'];

      for (let i = 0; i < 8; i++) {
        const guardian = guardianUsers[i % guardianUsers.length];
        const elderly = elderlyUsers[i % elderlyUsers.length];

        try {
          const notification = {
            guardian: guardian.id,
            elderly_user: elderly.id,
            notification_type: notificationTypes[i % notificationTypes.length],
            title: `알림 ${i + 1}: ${elderly.name}님 활동`,
            message: `<p>${elderly.name}님의 활동에 대한 알림입니다.</p>`,
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            is_read: Math.random() > 0.5
          };
          await apiCall('POST', '/api/collections/guardian_notifications/records', notification);
          console.log(`  ✅ Notification #${i + 1}: ${guardian.name} → ${elderly.name}`);
        } catch (error) {
          console.log(`  ⚠️  Notification ${i + 1}: ${error.message.substring(0, 80)}`);
        }
      }
    }

    console.log('\n✅ Sample data seeding completed!');
    console.log('\n📊 Summary:');
    console.log(`  Users: ${users.length} (${elderlyUsers.length} elderly, ${guardianUsers.length} guardian)`);
    console.log(`  Products: ${products.length}`);
    console.log('  Emergency contacts: ✓');
    console.log('  Kiosk sessions: ✓');
    console.log('  Voice phishing logs: ✓');
    console.log('  Daily activities: ✓');
    console.log('  Guardian notifications: ✓');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  }
}

seedData();
