export type Language = "ko" | "en";

export interface TranslationDictionary {
  brandName: string;
  brandSub: string;
  tabHome: string;
  tabShop: string;
  tabClass: string;
  tabAdmin: string;
  tabDocs: string;
  
  // GNB
  langSelect: string;
  cart: string;
  login: string;
  logout: string;
  welcome: string;

  // Hero / Story
  heroTitle: string;
  heroSub: string;
  heroBtn: string;
  storyTitle: string;
  storySub: string;
  stepTitle: string;
  steps: {
    title: string;
    description: string;
  }[];

  // Shop
  allCategory: string;
  catBag: string;
  catAccessory: string;
  catObject: string;
  pieceCount: string;
  stockCount: string;
  outOfStock: string;
  customizationTitle: string;
  customFabric: string;
  fabricTraditional: string;
  fabricPastel: string;
  fabricModern: string;
  fabricVibrant: string;
  customEngraving: string;
  engravingPlaceholder: string;
  customWrapping: string;
  wrappingNone: string;
  wrappingBox: string;
  wrappingBojagi: string;
  btnAddToCart: string;
  quantity: string;
  itemDetails: string;
  priceTotal: string;

  // Cart / Checkout
  cartTitle: string;
  cartEmpty: string;
  checkoutBtn: string;
  checkoutTitle: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formAddress: string;
  formBespokeWarn: string;
  btnPay: string;
  paySuccess: string;
  paySuccessSub: string;

  // Class Calendar
  classHeroTitle: string;
  classHeroSub: string;
  totalSeats: string;
  remSeats: string;
  personalClass: string;
  groupClass: string;
  externalClass: string;
  btnViewClassSchedule: string;
  bookingFormTitle: string;
  bookingSuccess: string;
  bookingSuccessSub: string;
  noAvailableClass: string;

  // Login
  socialLoginTitle: string;
  socialKakao: string;
  socialGoogle: string;
  socialTestUser: string;
}

export const i18nDictionary: Record<Language, TranslationDictionary> = {
  ko: {
    brandName: "호롱잡화점",
    brandSub: "국내 유일 100% 한복 업사이클링 수제 공방",
    tabHome: "브랜드 스토리",
    tabShop: "제품",
    tabClass: "클래스 신청",
    tabAdmin: "관리자 (Staff Only)",
    tabDocs: "시스템 설계 기획서",

    langSelect: "언어 선택",
    cart: "장바구니",
    login: "로그인",
    logout: "로그아웃",
    welcome: "님, 반갑습니다!",

    heroTitle: "전통을 덧대어 내일을 짓는, 호롱잡화점",
    heroSub: "버려지던 고운 한복 자락에, 시니어 장인의 따뜻한 서툰 바느질과 청년들의 감각을 담아 세상에 단 하나뿐인 온기를 탄생시켰습니다.",
    heroBtn: "업사이클 이야기 보기",
    storyTitle: "호롱잡화점 가치와 이야기",
    storySub: "2021년 대구 서문시장의 구석, 버려지는 아름다운 한복 원단을 목격한 일로부터 시작되었습니다. 우리는 세월을 지나온 한복 속에 깃든 아름다움을 그대로 간직한 채, 실용적이고 세련된 현대 가방과 리빙 소품으로의 변화를 꾀했습니다.",
    stepTitle: "꼼꼼한 6단계 한복 새활용 공정",
    steps: [
      { title: "1. 선별 (Selection)", description: "대구 등 전국 각지 가치 있는 중고 가야 한복을 엄격히 기증 및 회수" },
      { title: "2. 분해 (Deconstruction)", description: "실밥 하나 터지지 않게 부드러운 손동작으로 깃, 동정, 자락을 일일이 분리" },
      { title: "3. 세탁 (Washing)", description: "원단의 비단 결을 보호하는 천연 유기농 중성 수제 세제를 사용해 고온 스팀 세척" },
      { title: "4. 재단 (Cutting)", description: "한복이 지닌 가장 화려하고 고즈넉한 무늬 부위를 선구해 정밀한 오차 없는 도안 재단" },
      { title: "5. 재봉 (Sewing)", description: "섬유 도시 대구를 지탱해 온 시니어 재봉사님들의 연륜 깃든 튼튼하고 고급스러운 박음질" },
      { title: "6. 마감 및 포장 (Packaging)", description: "보이지 않는 안감까지 꼼꼼한 무결점 100% 전수 검수 후 친환경 크라프트지 완제품 출고" }
    ],

    allCategory: "전체 상품",
    catBag: "가방",
    catAccessory: "전통 악세사리",
    catObject: "리빙 오브제",
    pieceCount: "개",
    stockCount: "개 남음",
    outOfStock: "일시 품절",
    customizationTitle: "호롱잡화점만의 1:1 맞춤 제작 옵션",
    customFabric: "배색 원단 선택",
    fabricTraditional: "전통 무늬 비단 (은은한 윤기)",
    fabricPastel: "파스텔 실크 (차분하고 여리여리)",
    fabricModern: "모던 린넨 한복지 (내추럴하고 캐주얼)",
    fabricVibrant: "오방색 원단 (화사한 색감 조화)",
    customEngraving: "무료 커스텀 한글/영문 이니셜 각인 (최대 12자)",
    engravingPlaceholder: "예시: HORONG 2026",
    customWrapping: "포장 패키지 옵션",
    wrappingNone: "기본 친환경 크라프트 종이 포장 (+0원)",
    wrappingBox: "호롱 전용 문양 선물 박스 (+1,000원)",
    wrappingBojagi: "장인 손길 전통 고운 보자기 매듭 포장 (+3,000원)",
    btnAddToCart: "장바구니 담기",
    quantity: "구매 수량",
    itemDetails: "제품 사양 및 상세",
    priceTotal: "옵션 포함 총 금액",

    cartTitle: "선택한 보따리 (장바구니)",
    cartEmpty: "담겨있는 따뜻한 수공예품이 아직 없습니다.",
    checkoutBtn: "장바구니 물품 주문하기",
    checkoutTitle: "고객 주문서 및 맞춤 배송 정보",
    formName: "주문자명 / 예약자명",
    formEmail: "이메일 주소",
    formPhone: "연락처 (휴대폰 번호)",
    formAddress: "배송 목적지 주소",
    formBespokeWarn: "※ 모든 상품은 주문 확인 즉시 시니어 재봉단의 100% 일대일 맞춤 바느질 수작업이 시작되므로, 단순 변심에 의한 발송 후 환불이 다소 어려울 수 있습니다.",
    btnPay: "안전하고 간편한 시뮬레이션 결제 완료",
    paySuccess: "주문 및 결제가 성공적으로 이루어졌습니다!",
    paySuccessSub: "호롱잡화점 장인들이 정성 들여 따뜻한 바느질을 시작하겠습니다. 배송 현황은 관리자 대시보드(Staff Only)에서 주문 현황을 임의로 시뮬레이션 제어하실 수 있습니다.",

    classHeroTitle: "폐한복을 활용한 ESG 새활용 클래스",
    classHeroSub: "2시간 동안 버려지는 한복에 다시 생명의 온기를 불어넣는 창작의 즐거움을 함께 누려요. 시니어 선생님들과 청년 크리에이터들이 친절히 길잡이가 되어 드립니다.",
    totalSeats: "정원",
    remSeats: "잔여석",
    personalClass: "개인 체험교실",
    groupClass: "소모임/단독 동아리",
    externalClass: "기업 ESG 외부 출강",
    btnViewClassSchedule: "수강 예약 접수하기",
    bookingFormTitle: "원데이 공방 클래스 참가 상세 예약서",
    bookingSuccess: "클래스 예약이 정상 등록되었습니다!",
    bookingSuccessSub: "예약 대기 상태로 등록되었습니다. 호롱잡화점 스태프가 확인 후 예약을 확정합니다. 관리자 탭에서 확정 및 취소 시뮬레이션을 하실 수 있습니다.",
    noAvailableClass: "예약을 원하는 날짜를 아래 달력에서 먼저 선택해 주세요.",

    socialLoginTitle: "호롱잡화점 간편 계정 연동 및 로그인",
    socialKakao: "카카오 아이디로 간편 시작",
    socialGoogle: "구글 통합 계정으로 시작",
    socialTestUser: "테스트 공용 계정 즉시 연동"
  },
  en: {
    brandName: "Horong Store",
    brandSub: "South Korea's Only 100% Upcycled Hanbok Artisan Workshop",
    tabHome: "Our Story",
    tabShop: "Products",
    tabClass: "One-Day Class",
    tabAdmin: "Staff Console",
    tabDocs: "Architecture Blueprint",

    langSelect: "Select Language",
    cart: "Cart",
    login: "Log In",
    logout: "Log Out",
    welcome: ", welcome back!",

    heroTitle: "Suturing Heritage, Crafting Tomorrow",
    heroSub: "Combining traditional discarded Hanbok fabrics with the beautiful handmade sewing of Daegu's senior artisans and the vibrant modern senses of young designers.",
    heroBtn: "Read Our Upcycling Story",
    storyTitle: "Our Heart & Roots",
    storySub: "Started in 2021 in a cozy corner of Daegu Seomun Market where we discovered beautiful historical Hanbok materials going to landfill. We decided to honor their longevity by converting them into elegant, durable contemporary bags and living decors.",
    stepTitle: "Rigorous 6-Step Upcycling Process",
    steps: [
      { title: "1. Selection", description: "Carefully source historical secondhand Hanbok from all over the country" },
      { title: "2. Separation", description: "Delicately separate collars, curves, and linings by hand to guard ancient yarns" },
      { title: "3. Steam Cleaning", description: "Thorough steam sterilization with eco-safe organic neutral soap" },
      { title: "4. Blueprint Cut", description: "Select and draft the most breathtaking embroidery zones of the patterns" },
      { title: "5. Seam Sewing", description: "Sturdy, exquisite stitching from Daegu's legendary senior tailors" },
      { title: "6. Inspection & Wrapping", description: "100% rigorous inner and outer quality check, then packed in eco kraft parcel" }
    ],

    allCategory: "All Items",
    catBag: "Bags",
    catAccessory: "Traditional Ornaments",
    catObject: "Home Objects",
    pieceCount: "qty",
    stockCount: "left",
    outOfStock: "Out of Stock",
    customizationTitle: "Bespoke Customizer Options",
    customFabric: "Bespoke Silk Selection",
    fabricTraditional: "Glossy Imperial Antique Pattern Silk",
    fabricPastel: "Pastel Velvet Soft Silk",
    fabricModern: "Casual Natural Linen Hanbok Blend",
    fabricVibrant: "Vibrant Core Harmony Silk",
    customEngraving: "Free Monogram Engraving/Embroidery (Max 12 chars)",
    engravingPlaceholder: "e.g., HORONG 2026",
    customWrapping: "Gift Wrap Packages",
    wrappingNone: "Eco Kraft Paper Pack (+₩0)",
    wrappingBox: "Horong Pattern Signature Box (+₩1,000)",
    wrappingBojagi: "Hand-tied Traditional Bojagi Silk Wrap (+₩3,000)",
    btnAddToCart: "Add to Bag",
    quantity: "Quantity",
    itemDetails: "Specifications & Sizing",
    priceTotal: "Total Price (Bespoke)",

    cartTitle: "Your Chosen Bundles (Cart)",
    cartEmpty: "No warm upcycled crafts inside your cart yet.",
    checkoutBtn: "Check Out Products",
    checkoutTitle: "Shipping & Contact Document",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Mobile Number",
    formAddress: "Destination Address",
    formBespokeWarn: "※ All products are custom hand-stitched by senior designers immediately upon check out. Please review options carefully before finishing.",
    btnPay: "Complete Mock Simulation Payment",
    paySuccess: "Order Executed Successfully!",
    paySuccessSub: "Our senior artisans are starting their warm needlework. You can view, track and modify order/shipping states in the Staff Console tab.",

    classHeroTitle: "Upcycling Craft Class (ESG Certified)",
    classHeroSub: "Devote 2 hours to breathe brand new purpose and warmth into vintage garments. Experienced craft tutors will guide your journey safely.",
    totalSeats: "Capacity",
    remSeats: "Remaining",
    personalClass: "Individual Experience",
    groupClass: "Socio Workshop Class",
    externalClass: "Corporate ESG On-site Seminar",
    btnViewClassSchedule: "Make Booking Reservation",
    bookingFormTitle: "One-Day Studio Reservation Sheet",
    bookingSuccess: "Class Booked Successfully!",
    bookingSuccessSub: "Registered in 'Pending Approval' status. Horong managers will review, accept or deny. You can simulate staff decisions instantly inside the Staff Console.",
    noAvailableClass: "Please pick a date on the calendar first to view available seats.",

    socialLoginTitle: "Horong Quick Social SSO Link",
    socialKakao: "Continue with KakaoTalk",
    socialGoogle: "Continue with Google Integration",
    socialTestUser: "Use Demo Testing Profile"
  }
};
