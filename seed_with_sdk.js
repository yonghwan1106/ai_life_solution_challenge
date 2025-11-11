const PocketBase = require('pocketbase').default || require('pocketbase');

const pb = new PocketBase('https://ai-life-solution-challenge.duckdns.org');

const email = 'sanoramyun8@gmail.com';
const password = 'T22qjsrlf67!';

// Sample data
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
    ingredients: ["밀가루", "설탕", "이스트"],
    allergens: ["밀", "계란"],
    expiry_date: '2025-12-15',
    warnings: '<p>실온보관</p>'
  },
  {
    barcode: '8801234567892',
    name: '두부',
    brand: '풀무원',
    category: 'food',
    description: '<p>단백질 풍부</p>',
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
    ingredients: ["계란"],
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
    ingredients: ["사과"],
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
    warnings: '<p>식후 복용</p>'
  },
  {
    barcode: '8801234567896',
    name: '파스',
    brand: '동구제약',
    category: 'medicine',
    description: '<p>근육통 완화</p>',
    ingredients: ["멘톨"],
    allergens: [],
    warnings: '<p>환부에 부착</p>'
  },
  {
    barcode: '8801234567897',
    name: '비타민D',
    brand: 'GNC',
    category: 'other',
    description: '<p>뼈 건강</p>',
    ingredients: ["비타민D"],
    allergens: [],
    warnings: '<p>1일 1회</p>'
  },
  {
    barcode: '8801234567898',
    name: '고무장갑',
    brand: '안전코리아',
    category: 'other',
    description: '<p>위생장갑</p>',
    ingredients: [],
    allergens: ["라텍스"],
    warnings: '<p>화기주의</p>'
  },
  {
    barcode: '8801234567899',
    name: '세제',
    brand: 'LG생활건강',
    category: 'other',
    description: '<p>중성세제</p>',
    ingredients: ["계면활성제"],
    allergens: [],
    warnings: '<p>음용금지</p>'
  }
];

async function seedData() {
  try {
    // Authenticate as user
    console.log('🔐 Authenticating...');
    try {
      await pb.collection('users').authWithPassword(email, password);
      console.log('✅ Authenticated as user\n');
    } catch (error) {
      console.log('⚠️  User auth failed, trying admin auth...');
      // Set auth token manually from admin endpoint
      const https = require('https');
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

      const token = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(JSON.parse(data).token);
            } else {
              reject(new Error(`Auth failed: ${data}`));
            }
          });
        });
        req.on('error', reject);
        req.write(authData);
        req.end();
      });

      pb.authStore.save(token, { id: 'admin', email });
      console.log('✅ Authenticated as admin\n');
    }

    // Get existing users
    console.log('👥 Fetching users...');
    const users = await pb.collection('users').getFullList({
      sort: '-created',
    });
    console.log(`  Found ${users.length} users`);

    const elderlyUsers = users.filter(u => u.role === 'elderly');
    const guardianUsers = users.filter(u => u.role === 'guardian');
    console.log(`  Elderly: ${elderlyUsers.length}, Guardian: ${guardianUsers.length}\n`);

    if (users.length === 0) {
      console.log('❌ No users found');
      return;
    }

    // Create products
    console.log('📦 Creating products...');
    let productsCreated = 0;
    for (const product of sampleProducts) {
      try {
        await pb.collection('products').create(product);
        productsCreated++;
        console.log(`  ✅ ${product.name}`);
      } catch (error) {
        if (error.message.includes('duplicate') || error.data?.barcode) {
          console.log(`  ℹ️  ${product.name} (already exists)`);
        } else {
          console.log(`  ⚠️  ${product.name}: ${error.message}`);
        }
      }
    }
    console.log(`  Created: ${productsCreated}\n`);

    // Create emergency contacts
    console.log('📞 Creating emergency contacts...');
    let contactsCreated = 0;
    for (let i = 0; i < elderlyUsers.length; i++) {
      const user = elderlyUsers[i];
      try {
        const contact = {
          user: user.id,
          name: `보호자 ${i + 1}`,
          relationship: ['자녀', '배우자'][i % 2],
          phone: `010-${String(1000 + i).padStart(4, '0')}-${String(2000 + i).padStart(4, '0')}`,
          email: `contact${i + 1}@test.com`,
          priority: i + 1,
          is_primary: i === 0
        };
        await pb.collection('emergency_contacts').create(contact);
        contactsCreated++;
        console.log(`  ✅ ${contact.name} for ${user.email}`);
      } catch (error) {
        console.log(`  ⚠️  Contact ${i + 1}: ${error.message}`);
      }
    }
    console.log(`  Created: ${contactsCreated}\n`);

    // Create kiosk sessions
    console.log('🖥️  Creating kiosk sessions...');
    const kioskTypes = ['fastfood', 'cafe', 'ticket', 'payment', 'other'];
    const locations = ['맥도날드', '스타벅스', '영화관', '은행', '편의점'];
    let sessionsCreated = 0;

    for (let i = 0; i < 10; i++) {
      const user = elderlyUsers[i % elderlyUsers.length];
      try {
        const session = {
          user: user.id,
          kiosk_type: kioskTypes[i % kioskTypes.length],
          location: locations[i % locations.length],
          steps_completed: [
            { step: 1, name: '메뉴선택', completed: true },
            { step: 2, name: '결제', completed: Math.random() > 0.3 }
          ],
          duration: Math.floor(Math.random() * 300) + 60,
          success: Math.random() > 0.2,
          help_requested: Math.random() > 0.7
        };
        await pb.collection('kiosk_sessions').create(session);
        sessionsCreated++;
        console.log(`  ✅ ${session.kiosk_type} at ${session.location}`);
      } catch (error) {
        console.log(`  ⚠️  Session ${i + 1}: ${error.message.substring(0, 50)}`);
      }
    }
    console.log(`  Created: ${sessionsCreated}\n`);

    // Create voice phishing logs
    console.log('☎️  Creating voice phishing logs...');
    const riskLevels = ['low', 'medium', 'high'];
    let logsCreated = 0;

    for (let i = 0; i < 8; i++) {
      const user = elderlyUsers[i % elderlyUsers.length];
      const riskLevel = riskLevels[Math.floor(Math.random() * 3)];

      try {
        const log = {
          user: user.id,
          transcript: `<p>의심스러운 전화: "안녕하세요. 국세청입니다. 세금 환급이 있으니 계좌번호를 알려주세요."</p>`,
          risk_level: riskLevel,
          detected_patterns: [
            { pattern: 'account_request', confidence: 0.85 },
            { pattern: 'urgency', confidence: 0.75 }
          ],
          caller_info: {
            number: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
            location: '서울'
          },
          duration: Math.floor(Math.random() * 180) + 30,
          guardian_notified: riskLevel !== 'low',
          is_blocked: riskLevel === 'high',
          user_action: ['none', 'reported', 'blocked'][Math.floor(Math.random() * 3)]
        };
        await pb.collection('voice_phishing_logs').create(log);
        logsCreated++;
        console.log(`  ✅ ${riskLevel.toUpperCase()} risk - ${user.email}`);
      } catch (error) {
        console.log(`  ⚠️  Log ${i + 1}: ${error.message.substring(0, 50)}`);
      }
    }
    console.log(`  Created: ${logsCreated}\n`);

    // Create daily activities
    console.log('📅 Creating daily activities...');
    let activitiesCreated = 0;

    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      for (const user of elderlyUsers) {
        const date = new Date();
        date.setDate(date.getDate() - dayOffset);

        try {
          const activity = {
            user: user.id,
            date: date.toISOString().split('T')[0],
            barcode_scans: Math.floor(Math.random() * 10),
            kiosk_uses: Math.floor(Math.random() * 5),
            voice_phishing_detections: Math.floor(Math.random() * 3),
            active_time: Math.floor(Math.random() * 300) + 60,
            health_score: Math.floor(Math.random() * 30) + 70,
            summary: `<p>${date.toLocaleDateString('ko-KR')} 활동 요약</p>`
          };
          await pb.collection('daily_activities').create(activity);
          activitiesCreated++;
          if (activitiesCreated % 5 === 0) {
            console.log(`  ✅ ${activitiesCreated} activities...`);
          }
        } catch (error) {
          // Skip silently if duplicate
        }
      }
    }
    console.log(`  Created: ${activitiesCreated}\n`);

    // Create guardian notifications
    if (guardianUsers.length > 0) {
      console.log('🔔 Creating guardian notifications...');
      const notificationTypes = ['voice_phishing', 'unusual_activity', 'emergency', 'daily_summary'];
      const priorities = ['low', 'medium', 'high', 'urgent'];
      let notificationsCreated = 0;

      for (let i = 0; i < 10; i++) {
        const guardian = guardianUsers[i % guardianUsers.length];
        const elderly = elderlyUsers[i % elderlyUsers.length];
        const notifType = notificationTypes[i % notificationTypes.length];

        try {
          const notification = {
            guardian: guardian.id,
            elderly_user: elderly.id,
            notification_type: notifType,
            title: `${elderly.email}님 알림`,
            message: `<p>${elderly.email}님의 활동 알림입니다.</p>`,
            priority: priorities[i % priorities.length],
            is_read: Math.random() > 0.5
          };
          await pb.collection('guardian_notifications').create(notification);
          notificationsCreated++;
          console.log(`  ✅ ${notifType}`);
        } catch (error) {
          console.log(`  ⚠️  Notification ${i + 1}: ${error.message.substring(0, 50)}`);
        }
      }
      console.log(`  Created: ${notificationsCreated}\n`);
    }

    console.log('\n✅ Sample data seeding completed!\n');
    console.log('📊 Summary:');
    console.log(`  👥 Users: ${users.length} (${elderlyUsers.length} elderly, ${guardianUsers.length} guardian)`);
    console.log(`  📦 Products: ${productsCreated}`);
    console.log(`  📞 Emergency contacts: ${contactsCreated}`);
    console.log(`  🖥️  Kiosk sessions: ${sessionsCreated}`);
    console.log(`  ☎️  Voice phishing logs: ${logsCreated}`);
    console.log(`  📅 Daily activities: ${activitiesCreated}`);
    console.log(`  🔔 Guardian notifications: created`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.data) {
      console.error('Error data:', JSON.stringify(error.data, null, 2));
    }
  }
}

seedData();
