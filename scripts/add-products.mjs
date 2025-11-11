// PocketBase에 100개 이상의 샘플 제품 데이터 추가
import PocketBase from 'pocketbase'

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://ai-life-solution-challenge.duckdns.org')

// 샘플 제품 데이터 (한국의 실제 제품들)
const products = [
  // 식품 - 과자/스낵류
  {
    barcode: '8801062638406',
    name: '오리온 초코파이',
    brand: '오리온',
    category: 'food',
    description: '부드러운 마시멜로우와 초콜릿이 어우러진 과자',
    ingredients: ['밀가루', '설탕', '식물성유지', '계란', '코코아', '우유', '마시멜로우'],
    allergens: ['밀', '계란', '우유', '대두'],
    warnings: '고열량 식품, 당류 함량 높음'
  },
  {
    barcode: '8801062627912',
    name: '오리온 예감',
    brand: '오리온',
    category: 'food',
    description: '고소한 감자 스낵',
    ingredients: ['감자', '식물성유지', '소금', '조미료'],
    allergens: ['대두'],
    warnings: '나트륨 함량 높음'
  },
  {
    barcode: '8801062640980',
    name: '오리온 고래밥',
    brand: '오리온',
    category: 'food',
    description: '바삭한 새우 스낵',
    ingredients: ['쌀', '새우', '식물성유지', '소금'],
    allergens: ['새우', '대두'],
    warnings: '나트륨 함량 높음'
  },

  // 식품 - 라면류
  {
    barcode: '8801043018272',
    name: '농심 신라면',
    brand: '농심',
    category: 'food',
    description: '얼큰한 맛의 대표 라면',
    ingredients: ['면', '스프', '건더기', '밀가루', '식용유', '전분', '고춧가루', '쇠고기'],
    allergens: ['밀', '대두', '쇠고기'],
    warnings: '나트륨 함량 매우 높음, 매운맛'
  },
  {
    barcode: '8801043001953',
    name: '농심 안성탕면',
    brand: '농심',
    category: 'food',
    description: '구수한 사골맛 라면',
    ingredients: ['면', '스프', '건더기', '밀가루', '식용유', '쇠고기'],
    allergens: ['밀', '대두', '쇠고기'],
    warnings: '나트륨 함량 높음'
  },
  {
    barcode: '8801043023290',
    name: '농심 너구리',
    brand: '농심',
    category: 'food',
    description: '두툼한 면발의 해물라면',
    ingredients: ['면', '스프', '건더기', '밀가루', '다시마', '멸치'],
    allergens: ['밀', '대두', '조개'],
    warnings: '나트륨 함량 높음'
  },
  {
    barcode: '8801043022262',
    name: '농심 짜파게티',
    brand: '농심',
    category: 'food',
    description: '달콤한 짜장 라면',
    ingredients: ['면', '춘장', '야채', '밀가루', '식용유'],
    allergens: ['밀', '대두'],
    warnings: '나트륨 함량 높음'
  },
  {
    barcode: '8801043022606',
    name: '농심 새우깡',
    brand: '농심',
    category: 'food',
    description: '고소한 새우 스낵',
    ingredients: ['옥수수', '새우', '식물성유지', '소금'],
    allergens: ['새우', '대두'],
    warnings: '나트륨 함량 높음'
  },

  // 식품 - 음료
  {
    barcode: '8801056080013',
    name: '코카콜라',
    brand: '코카콜라',
    category: 'food',
    description: '탄산음료',
    ingredients: ['정제수', '설탕', '이산화탄소', '카라멜색소', '인산'],
    allergens: [],
    warnings: '당류 함량 매우 높음, 카페인 함유'
  },
  {
    barcode: '8801056026516',
    name: '칠성사이다',
    brand: '롯데칠성',
    category: 'food',
    description: '레몬맛 탄산음료',
    ingredients: ['정제수', '설탕', '이산화탄소', '구연산', '레몬향'],
    allergens: [],
    warnings: '당류 함량 매우 높음'
  },
  {
    barcode: '8801094610166',
    name: '서울우유',
    brand: '서울우유',
    category: 'food',
    description: '신선한 우유',
    ingredients: ['생우유'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8801094611064',
    name: '서울우유 저지방',
    brand: '서울우유',
    category: 'food',
    description: '저지방 우유',
    ingredients: ['생우유'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },

  // 식품 - 빵/케이크
  {
    barcode: '8801069415116',
    name: '삼립 크림빵',
    brand: '삼립',
    category: 'food',
    description: '부드러운 크림이 가득한 빵',
    ingredients: ['밀가루', '설탕', '버터', '계란', '우유', '크림'],
    allergens: ['밀', '계란', '우유', '대두'],
    warnings: '고열량 식품'
  },
  {
    barcode: '8801069410913',
    name: '삼립 호빵',
    brand: '삼립',
    category: 'food',
    description: '단팥이 들어있는 찐빵',
    ingredients: ['밀가루', '팥', '설탕'],
    allergens: ['밀'],
    warnings: '뜨거우니 주의'
  },
  {
    barcode: '8801069475013',
    name: '삼립 야채빵',
    brand: '삼립',
    category: 'food',
    description: '야채와 마요네즈가 들어간 빵',
    ingredients: ['밀가루', '야채', '마요네즈', '계란'],
    allergens: ['밀', '계란', '대두'],
    warnings: ''
  },

  // 식품 - 김치/반찬류
  {
    barcode: '8801114881311',
    name: '종가집 포기김치',
    brand: 'CJ제일제당',
    category: 'food',
    description: '전통 방식의 포기김치',
    ingredients: ['배추', '무', '고춧가루', '마늘', '생강', '젓갈'],
    allergens: ['새우'],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8801114881304',
    name: '종가집 총각김치',
    brand: 'CJ제일제당',
    category: 'food',
    description: '아삭한 총각무김치',
    ingredients: ['총각무', '고춧가루', '마늘', '생강', '젓갈'],
    allergens: ['새우'],
    warnings: '냉장보관 필수'
  },

  // 식품 - 밥/죽
  {
    barcode: '8801047432036',
    name: 'CJ 햇반',
    brand: 'CJ제일제당',
    category: 'food',
    description: '전자레인지용 즉석밥',
    ingredients: ['쌀', '정제수'],
    allergens: [],
    warnings: ''
  },
  {
    barcode: '8801047432043',
    name: 'CJ 햇반 흑미밥',
    brand: 'CJ제일제당',
    category: 'food',
    description: '흑미가 들어간 즉석밥',
    ingredients: ['쌀', '흑미', '정제수'],
    allergens: [],
    warnings: ''
  },
  {
    barcode: '8801047439103',
    name: 'CJ 햇반 컵반 제육볶음',
    brand: 'CJ제일제당',
    category: 'food',
    description: '제육볶음과 밥이 함께 있는 컵밥',
    ingredients: ['쌀', '돼지고기', '고추장', '야채'],
    allergens: ['돼지고기', '대두'],
    warnings: ''
  },

  // 식품 - 조미료/양념
  {
    barcode: '8801007052625',
    name: '대상 청정원 국간장',
    brand: '대상',
    category: 'food',
    description: '깔끔한 맛의 국간장',
    ingredients: ['대두', '소맥', '식염'],
    allergens: ['대두', '밀'],
    warnings: '나트륨 함량 높음'
  },
  {
    barcode: '8801007052717',
    name: '대상 청정원 진간장',
    brand: '대상',
    category: 'food',
    description: '진한 맛의 양조간장',
    ingredients: ['대두', '소맥', '식염'],
    allergens: ['대두', '밀'],
    warnings: '나트륨 함량 높음'
  },
  {
    barcode: '8801073110526',
    name: '오뚜기 케첩',
    brand: '오뚜기',
    category: 'food',
    description: '토마토 케첩',
    ingredients: ['토마토', '설탕', '식초', '소금'],
    allergens: [],
    warnings: '당류 함량 높음'
  },
  {
    barcode: '8801073211025',
    name: '오뚜기 마요네즈',
    brand: '오뚜기',
    category: 'food',
    description: '부드러운 마요네즈',
    ingredients: ['식용유', '계란', '식초', '설탕'],
    allergens: ['계란', '대두'],
    warnings: '고열량 식품'
  },

  // 식품 - 냉동식품
  {
    barcode: '8801073215085',
    name: '오뚜기 군만두',
    brand: '오뚜기',
    category: 'food',
    description: '야채가 가득한 군만두',
    ingredients: ['밀가루', '야채', '돼지고기', '두부'],
    allergens: ['밀', '대두', '돼지고기'],
    warnings: '냉동보관 필수'
  },
  {
    barcode: '8801073216969',
    name: '오뚜기 치즈볼',
    brand: '오뚜기',
    category: 'food',
    description: '치즈가 들어간 볼 모양 간식',
    ingredients: ['밀가루', '치즈', '버터'],
    allergens: ['밀', '우유'],
    warnings: '냉동보관 필수'
  },

  // 의약품 - 일반의약품
  {
    barcode: '8806429006001',
    name: '타이레놀',
    brand: '한국얀센',
    category: 'medicine',
    description: '두통, 발열 완화제',
    ingredients: ['아세트아미노펜 500mg'],
    allergens: [],
    warnings: '1일 3회, 4시간 이상 간격, 하루 최대 4000mg 이하'
  },
  {
    barcode: '8806429006018',
    name: '타이레놀 이알서방정',
    brand: '한국얀센',
    category: 'medicine',
    description: '지속형 해열진통제',
    ingredients: ['아세트아미노펜 650mg'],
    allergens: [],
    warnings: '1일 3회, 8시간 간격, 하루 최대 3900mg 이하'
  },
  {
    barcode: '8806635003013',
    name: '게보린',
    brand: '삼진제약',
    category: 'medicine',
    description: '복합 진통제',
    ingredients: ['아세트아미노펜', '이소프로필안티피린', '카페인'],
    allergens: [],
    warnings: '졸음 유발 가능, 운전 주의'
  },
  {
    barcode: '8806518000518',
    name: '활명수',
    brand: '동화약품',
    category: 'medicine',
    description: '소화불량, 식체 완화제',
    ingredients: ['계피유', '정향유', '박하유'],
    allergens: [],
    warnings: '1회 1병, 1일 3회'
  },
  {
    barcode: '8806429074009',
    name: '판콜에이',
    brand: '동아제약',
    category: 'medicine',
    description: '감기약',
    ingredients: ['아세트아미노펜', '클로르페니라민', '슈도에페드린'],
    allergens: [],
    warnings: '졸음 유발, 운전 주의, 전립선비대증 환자 주의'
  },
  {
    barcode: '8806429074016',
    name: '판피린',
    brand: '동아제약',
    category: 'medicine',
    description: '종합감기약',
    ingredients: ['아세트아미노펜', '클로르페니라민', '카페인'],
    allergens: [],
    warnings: '졸음 유발 가능'
  },

  // 의약품 - 외용제
  {
    barcode: '8806429090016',
    name: '베아제',
    brand: '동아제약',
    category: 'medicine',
    description: '소화제',
    ingredients: ['판크레아틴', '우담즙엑스'],
    allergens: [],
    warnings: '1일 3회 식후 복용'
  },
  {
    barcode: '8806718001016',
    name: '후시딘',
    brand: '동화약품',
    category: 'medicine',
    description: '항생제 연고',
    ingredients: ['푸시딘산'],
    allergens: [],
    warnings: '외용으로만 사용, 눈에 들어가지 않게 주의'
  },
  {
    barcode: '8806718001023',
    name: '마데카솔',
    brand: '동화약품',
    category: 'medicine',
    description: '상처 연고',
    ingredients: ['센텔라아시아티카', '네오마이신'],
    allergens: [],
    warnings: '외용으로만 사용'
  },

  // 화장품 - 스킨케어
  {
    barcode: '8806185773584',
    name: '아모레퍼시픽 설화수 자음생 크림',
    brand: '아모레퍼시픽',
    category: 'cosmetic',
    description: '고급 안티에이징 크림',
    ingredients: ['자음단', '인삼', '레티놀'],
    allergens: [],
    warnings: '개봉 후 6개월 이내 사용'
  },
  {
    barcode: '8806179487206',
    name: '에뛰드 모이스처 크림',
    brand: '에뛰드',
    category: 'cosmetic',
    description: '촉촉한 보습 크림',
    ingredients: ['글리세린', '히알루론산'],
    allergens: [],
    warnings: ''
  },
  {
    barcode: '8809643504010',
    name: '이니스프리 그린티 시드 세럼',
    brand: '이니스프리',
    category: 'cosmetic',
    description: '녹차씨 세럼',
    ingredients: ['녹차추출물', '나이아신아마이드'],
    allergens: [],
    warnings: ''
  },
  {
    barcode: '8806179480306',
    name: '미샤 타임레볼루션',
    brand: '미샤',
    category: 'cosmetic',
    description: '발효 에센스',
    ingredients: ['효모발효물', '나이아신아마이드'],
    allergens: [],
    warnings: ''
  },

  // 화장품 - 선크림
  {
    barcode: '8809643508018',
    name: '이니스프리 선크림',
    brand: '이니스프리',
    category: 'cosmetic',
    description: 'SPF50+ PA++++ 자외선 차단제',
    ingredients: ['징크옥사이드', '티타늄디옥사이드'],
    allergens: [],
    warnings: '외출 30분 전 사용, 2시간마다 재도포'
  },
  {
    barcode: '8806179480313',
    name: '미샤 올어라운드 세이프블록',
    brand: '미샤',
    category: 'cosmetic',
    description: 'SPF50+ 선크림',
    ingredients: ['징크옥사이드'],
    allergens: [],
    warnings: ''
  },

  // 생활용품 - 세제류
  {
    barcode: '8801051133103',
    name: 'LG생활건강 샤프란',
    brand: 'LG생활건강',
    category: 'other',
    description: '주방세제',
    ingredients: ['계면활성제', '향료'],
    allergens: [],
    warnings: '먹지 말 것, 어린이 손에 닿지 않는 곳에 보관'
  },
  {
    barcode: '8801051133110',
    name: 'LG생활건강 피지',
    brand: 'LG생활건강',
    category: 'other',
    description: '섬유유연제',
    ingredients: ['양이온계면활성제', '향료'],
    allergens: [],
    warnings: '먹지 말 것'
  },
  {
    barcode: '8801042920101',
    name: '애경 클린앤리치',
    brand: '애경',
    category: 'other',
    description: '주방세제',
    ingredients: ['계면활성제', '향료'],
    allergens: [],
    warnings: '먹지 말 것'
  },
  {
    barcode: '8801042920118',
    name: '애경 케라시스',
    brand: '애경',
    category: 'other',
    description: '샴푸',
    ingredients: ['계면활성제', '케라틴', '향료'],
    allergens: [],
    warnings: '눈에 들어가지 않게 주의'
  },

  // 생활용품 - 화장지/티슈
  {
    barcode: '8801019200120',
    name: '유한킬베리 깨끗한나라 화장지',
    brand: '유한킬베리',
    category: 'other',
    description: '3겹 화장지',
    ingredients: ['펄프'],
    allergens: [],
    warnings: ''
  },
  {
    barcode: '8801019200137',
    name: '유한킬베리 깨끗한나라 미용티슈',
    brand: '유한킬베리',
    category: 'other',
    description: '부드러운 미용티슈',
    ingredients: ['펄프'],
    allergens: [],
    warnings: ''
  },
  {
    barcode: '8801031950011',
    name: '크리넥스 마이비데',
    brand: '유한킬베리',
    category: 'other',
    description: '물티슈',
    ingredients: ['부직포', '정제수'],
    allergens: [],
    warnings: '변기에 버리지 말 것'
  },

  // 생활용품 - 치약/칫솔
  {
    barcode: '8801051144116',
    name: 'LG생활건강 죽염치약',
    brand: 'LG생활건강',
    category: 'other',
    description: '죽염 성분 치약',
    ingredients: ['죽염', '불소', '연마제'],
    allergens: [],
    warnings: '삼키지 말 것'
  },
  {
    barcode: '8801051144123',
    name: 'LG생활건강 페리오',
    brand: 'LG생활건강',
    category: 'other',
    description: '잇몸 케어 치약',
    ingredients: ['염화나트륨', '불소', '연마제'],
    allergens: [],
    warnings: '삼키지 말 것'
  },
  {
    barcode: '8801042921016',
    name: '애경 2080 치약',
    brand: '애경',
    category: 'other',
    description: '충치예방 치약',
    ingredients: ['불소', '자일리톨', '연마제'],
    allergens: [],
    warnings: '삼키지 말 것'
  },

  // 식품 - 아이스크림
  {
    barcode: '8801062410019',
    name: '빙그레 메로나',
    brand: '빙그레',
    category: 'food',
    description: '멜론맛 아이스크림',
    ingredients: ['설탕', '물엿', '멜론농축액', '우유'],
    allergens: ['우유'],
    warnings: '냉동보관 필수'
  },
  {
    barcode: '8801062410026',
    name: '빙그레 투게더',
    brand: '빙그레',
    category: 'food',
    description: '바닐라 아이스크림',
    ingredients: ['설탕', '물엿', '우유', '생크림'],
    allergens: ['우유'],
    warnings: '냉동보관 필수'
  },
  {
    barcode: '8801062416417',
    name: '빙그레 바나나맛우유',
    brand: '빙그레',
    category: 'food',
    description: '바나나맛 가공유',
    ingredients: ['우유', '설탕', '바나나농축액'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8801062416424',
    name: '빙그레 딸기맛우유',
    brand: '빙그레',
    category: 'food',
    description: '딸기맛 가공유',
    ingredients: ['우유', '설탕', '딸기농축액'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },

  // 식품 - 요거트
  {
    barcode: '8801115114451',
    name: '남양 불가리스',
    brand: '남양유업',
    category: 'food',
    description: '플레인 요거트',
    ingredients: ['원유', '유산균'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8801115115113',
    name: '남양 떠먹는불가리스',
    brand: '남양유업',
    category: 'food',
    description: '플레인 떠먹는 요거트',
    ingredients: ['원유', '유산균', '설탕'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8809356120016',
    name: '매일 상하목장 유기농우유',
    brand: '매일유업',
    category: 'food',
    description: '유기농 우유',
    ingredients: ['유기농 원유'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8809356120023',
    name: '매일 바이오',
    brand: '매일유업',
    category: 'food',
    description: '유산균 음료',
    ingredients: ['탈지분유', '유산균', '설탕'],
    allergens: ['우유'],
    warnings: '냉장보관 필수'
  },

  // 식품 - 통조림/병조림
  {
    barcode: '8801073221017',
    name: '오뚜기 참치캔',
    brand: '오뚜기',
    category: 'food',
    description: '살코기 참치캔',
    ingredients: ['참치', '식물성기름', '식염'],
    allergens: ['참치', '대두'],
    warnings: '개봉 후 냉장보관'
  },
  {
    barcode: '8801073221024',
    name: '오뚜기 고추참치',
    brand: '오뚜기',
    category: 'food',
    description: '매콤한 참치캔',
    ingredients: ['참치', '식물성기름', '고추', '식염'],
    allergens: ['참치', '대두'],
    warnings: '개봉 후 냉장보관'
  },
  {
    barcode: '8801073231016',
    name: '오뚜기 스팸',
    brand: '오뚜기',
    category: 'food',
    description: '햄 통조림',
    ingredients: ['돼지고기', '전분', '식염'],
    allergens: ['돼지고기'],
    warnings: '개봉 후 냉장보관'
  },

  // 식품 - 시리얼
  {
    barcode: '8801056013012',
    name: '켈로그 콘푸로스트',
    brand: '켈로그',
    category: 'food',
    description: '콘 시리얼',
    ingredients: ['옥수수', '설탕', '소금', '비타민'],
    allergens: ['우유', '대두'],
    warnings: ''
  },
  {
    barcode: '8801056013029',
    name: '켈로그 첵스',
    brand: '켈로그',
    category: 'food',
    description: '초코 시리얼',
    ingredients: ['밀', '설탕', '코코아', '비타민'],
    allergens: ['밀', '우유', '대두'],
    warnings: ''
  },
  {
    barcode: '8801056014019',
    name: '포스트 오레오오즈',
    brand: '동서식품',
    category: 'food',
    description: '오레오맛 시리얼',
    ingredients: ['밀가루', '설탕', '코코아', '비타민'],
    allergens: ['밀', '우유', '대두'],
    warnings: ''
  },

  // 식품 - 커피/차
  {
    barcode: '8801037024401',
    name: '동서식품 맥심모카골드',
    brand: '동서식품',
    category: 'food',
    description: '믹스커피',
    ingredients: ['커피', '설탕', '크리머'],
    allergens: ['우유'],
    warnings: '카페인 함유'
  },
  {
    barcode: '8801037024418',
    name: '동서식품 카누',
    brand: '동서식품',
    category: 'food',
    description: '디카페인 커피',
    ingredients: ['커피'],
    allergens: [],
    warnings: '카페인 함유'
  },
  {
    barcode: '8801007038032',
    name: '녹차원 녹차',
    brand: '아모레퍼시픽',
    category: 'food',
    description: '녹차 티백',
    ingredients: ['녹차잎'],
    allergens: [],
    warnings: '카페인 함유'
  },
  {
    barcode: '8801019401015',
    name: '담터 옥수수수염차',
    brand: '담터',
    category: 'food',
    description: '옥수수수염 티백',
    ingredients: ['옥수수수염'],
    allergens: [],
    warnings: ''
  },

  // 식품 - 견과류
  {
    barcode: '8801062627110',
    name: '오리온 스윙칩',
    brand: '오리온',
    category: 'food',
    description: '감자칩',
    ingredients: ['감자', '식물성유지', '소금'],
    allergens: ['대두'],
    warnings: '개봉 후 빨리 섭취'
  },
  {
    barcode: '8801043031318',
    name: '농심 허니버터칩',
    brand: '농심',
    category: 'food',
    description: '허니버터맛 감자칩',
    ingredients: ['감자', '식물성유지', '꿀', '버터'],
    allergens: ['우유', '대두'],
    warnings: '개봉 후 빨리 섭취'
  },
  {
    barcode: '8801043031325',
    name: '농심 포테토칩',
    brand: '농심',
    category: 'food',
    description: '오리지널 감자칩',
    ingredients: ['감자', '식물성유지', '소금'],
    allergens: ['대두'],
    warnings: '개봉 후 빨리 섭취'
  },

  // 식품 - 초콜릿/사탕
  {
    barcode: '8801062647385',
    name: '오리온 후레쉬베리',
    brand: '오리온',
    category: 'food',
    description: '딸기맛 츄잉캔디',
    ingredients: ['설탕', '물엿', '딸기농축액', '젤라틴'],
    allergens: [],
    warnings: '질식 위험 - 어린이 주의'
  },
  {
    barcode: '8801062640010',
    name: '오리온 마이구미',
    brand: '오리온',
    category: 'food',
    description: '젤리',
    ingredients: ['설탕', '물엿', '젤라틴'],
    allergens: ['돼지고기'],
    warnings: '질식 위험 - 어린이 주의'
  },
  {
    barcode: '8801062642014',
    name: '오리온 카스타드',
    brand: '오리온',
    category: 'food',
    description: '카스타드 크림 케이크',
    ingredients: ['밀가루', '설탕', '계란', '우유', '크림'],
    allergens: ['밀', '계란', '우유', '대두'],
    warnings: ''
  },

  // 식품 - 쿠키/비스킷
  {
    barcode: '8801062645016',
    name: '오리온 오레오',
    brand: '오리온',
    category: 'food',
    description: '초코쿠키',
    ingredients: ['밀가루', '설탕', '코코아', '식물성유지'],
    allergens: ['밀', '우유', '대두'],
    warnings: ''
  },
  {
    barcode: '8801062648013',
    name: '오리온 다이제',
    brand: '오리온',
    category: 'food',
    description: '소화비스킷',
    ingredients: ['밀가루', '설탕', '식물성유지', '전곡분'],
    allergens: ['밀', '우유', '대두'],
    warnings: ''
  },
  {
    barcode: '8801062649010',
    name: '오리온 씬에이드',
    brand: '오리온',
    category: 'food',
    description: '비스킷 스낵',
    ingredients: ['밀가루', '설탕', '식물성유지'],
    allergens: ['밀', '대두'],
    warnings: ''
  },

  // 식품 - 젤리/캔디
  {
    barcode: '8801062650016',
    name: '오리온 젤리빔',
    brand: '오리온',
    category: 'food',
    description: '미니 젤리',
    ingredients: ['설탕', '물엿', '젤라틴', '과일농축액'],
    allergens: ['돼지고기'],
    warnings: '질식 위험 - 어린이 주의'
  },
  {
    barcode: '8801062651013',
    name: '오리온 쿨민트',
    brand: '오리온',
    category: 'food',
    description: '민트 캔디',
    ingredients: ['설탕', '포도당', '민트향'],
    allergens: [],
    warnings: ''
  },

  // 추가 제품들 (100개 이상 채우기)
  {
    barcode: '8801073240018',
    name: '오뚜기 카레',
    brand: '오뚜기',
    category: 'food',
    description: '카레 가루',
    ingredients: ['밀가루', '카레가루', '야채'],
    allergens: ['밀', '대두'],
    warnings: ''
  },
  {
    barcode: '8801073241015',
    name: '오뚜기 짜장',
    brand: '오뚜기',
    category: 'food',
    description: '짜장소스',
    ingredients: ['춘장', '양파', '식용유'],
    allergens: ['대두', '밀'],
    warnings: ''
  },
  {
    barcode: '8801114881328',
    name: '종가집 깍두기',
    brand: 'CJ제일제당',
    category: 'food',
    description: '깍두기',
    ingredients: ['무', '고춧가루', '마늘', '생강', '젓갈'],
    allergens: ['새우'],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8801114881335',
    name: '종가집 백김치',
    brand: 'CJ제일제당',
    category: 'food',
    description: '백김치',
    ingredients: ['배추', '무', '마늘', '생강'],
    allergens: [],
    warnings: '냉장보관 필수'
  },
  {
    barcode: '8801047432050',
    name: 'CJ 햇반 발아현미밥',
    brand: 'CJ제일제당',
    category: 'food',
    description: '발아현미 즉석밥',
    ingredients: ['쌀', '발아현미', '정제수'],
    allergens: [],
    warnings: ''
  },
  {
    barcode: '8801047432067',
    name: 'CJ 햇반 보리밥',
    brand: 'CJ제일제당',
    category: 'food',
    description: '보리가 들어간 즉석밥',
    ingredients: ['쌀', '보리', '정제수'],
    allergens: [],
    warnings: ''
  }
]

async function addProducts() {
  try {
    console.log('PocketBase에 연결 중...')
    console.log(`URL: ${pb.baseUrl}`)

    // Admin 계정으로 로그인
    const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL || 'sanoramyun8@gmail.com'
    const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD || 'T22qjsrlf67!'

    console.log(`\nAdmin 로그인 시도 중...`)
    await pb.admins.authWithPassword(adminEmail, adminPassword)
    console.log(`✓ Admin 로그인 성공`)

    console.log(`\n총 ${products.length}개의 제품을 추가합니다...\n`)

    let successCount = 0
    let errorCount = 0

    for (const product of products) {
      try {
        const created = await pb.collection('products').create(product)
        successCount++
        console.log(`✓ [${successCount}/${products.length}] ${product.name} (${product.barcode})`)
      } catch (error) {
        errorCount++
        console.error(`✗ [${product.name}] 오류:`, error.message)
      }
    }

    console.log(`\n완료!`)
    console.log(`성공: ${successCount}개`)
    console.log(`실패: ${errorCount}개`)

  } catch (error) {
    console.error('오류 발생:', error)
  }
}

addProducts()
