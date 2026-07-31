export interface LocalizedText {
  ko: string;
  en: string;
  ja: string;
}

export type ProductCategory = "bag" | "accessory" | "object";

export interface Product {
  id: string;
  name: LocalizedText;
  category: ProductCategory;
  basePrice: number;
  description: LocalizedText;
  details: LocalizedText;
  image: string;
  stock: number;
  isSoldOut?: boolean;
}

export interface BespokeOption {
  fabric: "traditional" | "pastel" | "modern" | "vibrant"; // 원단 종류
  engraving: string; // 각인 문구
  wrapping: "none" | "box" | "bojagi"; // 포장 옵션
}

export interface CartItem {
  cartId: string; // Unique inside cart
  product: Product;
  selectedOptions: BespokeOption;
  quantity: number;
}

export type ClassType = "personal" | "group" | "external";

export interface CraftClass {
  id: string;
  type: ClassType;
  title: LocalizedText;
  price: number;
  duration: string;
  capacity: number;
  description: LocalizedText;
  image: string;
}

export interface Reservation {
  id: string;
  classId: string;
  classTitle: LocalizedText;
  date: string;
  time: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  seats: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Order {
  id: string;
  items: {
    productId: string;
    productName: LocalizedText;
    quantity: number;
    options: BespokeOption;
    itemTotal: number;
  }[];
  totalAmount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  address: string;
  status: "completed" | "preparing" | "shipping" | "delivered";
  createdAt: string;
}

// Default Products representing the unique offerings of Horong General Store
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-chosun",
    name: {
      ko: "시그니처 조선백",
      en: "Signature Joseon Bag",
      ja: "シグネチャー朝鮮バッグ",
    },
    category: "bag",
    basePrice: 68000,
    description: {
      ko: "2021년 대구 서문시장에서 시작된 호롱잡화점의 상징. 버려지는 고즈넉한 한복 원단을 덧대어 실용적이면서 우아한 전통의 실루엣을 자아냅니다.",
      en: "The icon of Horong Store, started in Seomun Market in 2021. Designed with discarded Hanbok silk to craft a practical yet elegent traditional silhouette.",
      ja: "2021年大邱西門市場から始まったホロン雑貨店のシンボル。捨てられる静かな韓服の生地をあて、実用的で優雅な伝統シルエットを醸し出します。",
    },
    details: {
      ko: "크기: 가로 32cm, 세로 28cm, 폭 8cm | 세탁: 가벼운 손세탁 권장 | 제작처: 대구 시니어 재봉사단 수작업",
      en: "Size: 32x28x8cm | Laundry: Gentle hand wash | Crafted: Handmade by senior seamstresses in Daegu",
      ja: "サイズ：横 32cm、縦 28cm、厚さ 8cm | 洗濯：軽い手洗い推奨 | 製作：大邱のシニア裁縫師による手作業",
    },
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600", // elegant craft textile
    stock: 12,
  },
  {
    id: "prod-mange",
    name: {
      ko: "만개 파우치백",
      en: "Full Bloom (Mange) Pouch Bag",
      ja: "満開パウチバッグ",
    },
    category: "bag",
    basePrice: 34000,
    description: {
      ko: "한복 동정의 부드러운 곡선과 주름을 모티브로 삼아, 수납을 든든히 채웠을 때 꽃처럼 풍성하게 피어나는 다용도 파우치 백입니다.",
      en: "Inspired by the gentle curves and folds of Hanbok necklines, this versatile pouch blooms like a flower when fully filled.",
      ja: "韓服の動静の柔らかい曲線とプリーツをモチーフに、収納をたっぷり入れた時に花のように豊かに咲く多目的パウ치バッグです。",
    },
    details: {
      ko: "크기: 직경 22cm, 높이 24cm | 소재: 비단 혼방 폐한복 원단 | 특이사항: 전통 댕기 수술 장식 포함",
      en: "Size: Diameter 22cm, Height 24cm | Material: Silk blend upcycled Hanbok | Note: Traditional tassel decoration included",
      ja: "サイズ：直径 22cm、高さ 24cm | 素材：絹ブレンドアップサイクル韓服生地 | 特記事項：伝統なタッセル装飾付き",
    },
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600", // premium purse aesthetic
    stock: 18,
  },
  {
    id: "prod-sanbo",
    name: {
      ko: "산보 이지백",
      en: "Sanbo Easy Canvas Bag",
      ja: "お散歩イージーバッグ",
    },
    category: "bag",
    basePrice: 42000,
    description: {
      ko: "가벼운 동네 산책길에 어울리는 전통 누빔 기법의 미니 백입니다. 은은한 한복 깃 형상의 외부 전면 포켓이 귀여운 가치를 더합니다.",
      en: "A mini bag utilizing traditional quilting patterns, perfect for a peaceful light stroll. The unique front pocket resembles a Hanbok collar style.",
      ja: "軽快なお散歩に似合う伝統キルティング（ヌビム）技法のミニバッグ。淡い韓服の襟形状の外部フロントポケットが可愛いアクセントを添えます。",
    },
    details: {
      ko: "크기: 가로 22cm, 세로 25cm | 어깨끈 길이: 110cm (조절 가능) | 재질: 고밀도 면 및 재생 한복 안감",
      en: "Size: 22x25cm | Strap length: 110cm (adjustable) | Body: Premium high-density cotton and upcycled lining",
      ja: "サイズ：横 22cm、縦 25cm | ストラップ：110cm（調整可能） | 材質：高密度コットン ＆ 再生韓服裏地",
    },
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600", // warm structured fabric purse
    stock: 8,
  },
  {
    id: "prod-daenggi",
    name: {
      ko: "호롱댕기 키링",
      en: "Horong Daenggi Keyring",
      ja: "ホロンデンギキーリング",
    },
    category: "accessory",
    basePrice: 15000,
    description: {
      ko: "한복 제작 후 남은 자투리 오색 비단들을 고이 모아 엮은 전통 댕기 키링입니다. 에어팟, 가방 등에 포인트를 주는 따뜻한 수공예품입니다.",
      en: "A traditional hair ribbon keyring handwired using leftover colorful Hanbok silk scraps. Provides a beautiful spotlight accent to backpacks, AirPods, and keys.",
      ja: "韓服の製作後に残ったパッチワーク用五色絹を集めて編み上げた伝統デンギキーリング。エアポッツやバッグなどに温かい伝統感あるアクセントを与えます。",
    },
    details: {
      ko: "조합: 무니켈 신주 걸이쇠 및 실크 매듭 | 길이: 약 15cm | 수제 특성상 물감염이나 자수 디테일이 소폭 다를 수 있습니다.",
      en: "Length: ~15cm | Clip: Nickel-free brass hook | Being handmade, actual embroidery patterns vary slightly.",
      ja: "長さ：約 15cm | 金具：ニッケルフリー真鍮フック | 手作りのため、若干のカラー配色ニュアンス差があります。",
    },
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600", // traditional elegant knot craft
    stock: 45,
  },
  {
    id: "prod-band",
    name: {
      ko: "겉꽃잎 밴드",
      en: "Geot-kkotnap Hanbok Headband",
      ja: "コッコナプ・カチューシャ",
    },
    category: "accessory",
    basePrice: 19000,
    description: {
      ko: "한복의 주름 치맛자락 모양을 본따 겉면을 장식한 세련된 여성용 헤어밴드입니다. 비단의 조밀한 광택감이 화사한 분위기를 선사합니다.",
      en: "A sophisticated hair accessory mimicking the rich, elegant folds of a traditional Hanbok dress skirt. The silk sheen injects elegant style.",
      ja: "韓服のプリーツスカートすその形をモチーフに表面を飾った上品なヘアバンドです。絹のほのかな高密度な光沢が華やかさを与えます。",
    },
    details: {
      ko: "폭: 3cm | 내부 소재: 귀 뒤가 아프지 않은 유연한 경질 밴드 | 원산지: 100% 대한민국 대구 수작업",
      en: "Width: 3cm | Band: Comfort-fit flexible inner band | Origin: 100% Handmade in Daegu, South Korea",
      ja: "最大幅：3cm | ベース：耳の痛くならない高弾性ハードバンド | 原産地：100% 大邱手作業ハンドメイド",
    },
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&q=80&w=600", // stylish head accessory
    stock: 25,
  },
  {
    id: "prod-garland",
    name: {
      ko: "조선의 소원 가랜드",
      en: "Joseon Wish Garland",
      ja: "朝鮮の願いガーランド",
    },
    category: "object",
    basePrice: 28000,
    description: {
      ko: "전통 한복의 다채로운 오방색 자투리 천을 조각보 기법으로 이은 벽걸이 인테리어 소품입니다. 집안에 복과 따뜻함의 의미를 들여놓으세요.",
      en: "Interior wall decoration sewn from vibrant remnant scraps of traditional colors. Brings fortune, warmth, and nostalgic beauty to your home.",
      ja: "伝統韓服のカラフルな五方色ハギレをコラージュ（チョガッポ技法）で繋いだ壁掛けガーランド。お部屋に福とぬくもりを引き寄せます。",
    },
    details: {
      ko: "총 구성: 1.2m 한지끈 및 주름 천 조각 7매 | 구성품: 전통 노리개 태슬 탈부착 가능",
      en: "Length: 1.2m linen rope with 7 pieces | Components: Detachable traditional Norigae tassel included",
      ja: "長さ：1.2mリネン紐、装飾布7枚 | 同梱：取り外し可能な伝統ノリゲ・タッセル1個",
    },
    image: "https://images.unsplash.com/photo-1513519107127-1dba3fa7fd5d?auto=format&fit=crop&q=80&w=600", // premium cozy hanging detail
    stock: 14,
  },
  {
    id: "prod-myungtae",
    name: {
      ko: "업사이클링 액막이 명태",
      en: "Upcycled Good Luck Pollack (Myungtae)",
      ja: "オプサイクル厄除け明太（ミョンテ）",
    },
    category: "object",
    basePrice: 32000,
    description: {
      ko: "가게 개업, 이사 선물 1순위. 예로부터 나쁜 기운을 막고 복을 부르던 말린 명태를 고운 전통 한복 누빔 천과 무명 실타래 장식으로 재해석한 현대식 수제 액막이입니다.",
      en: "Ranked #1 for store openings and housewarming parties. The traditional dried pollack warding off evil redefined with beautiful Hanbok textile and cotton threads.",
      ja: "創業・移祝いに指名No.1。古くから災いを防ぎ福を招く飾り「干し明太」を、上質な韓服裏地と木綿糸の組み合わせで再解釈したスタイリッシュな手作りの魔除けです。",
    },
    details: {
      ko: "크기: 길이 약 26cm, 폭 6cm | 구성: 한복 명태 본체, 무명실 타래, 전통 구리 동전 장식",
      en: "Size: 26x6cm | Contains: Fabric pollack model, pristine cotton bundle, copper coin accents",
      ja: "サイズ：全長26cm、幅6cm | 構成：韓服明太子、純綿糸の束、伝統コインアクセサリー",
    },
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=600", // beautiful clean fabric object
    stock: 10,
  }
];

// Default interactive classes for Horong General Store
export const INITIAL_CLASSES: CraftClass[] = [
  {
    id: "class-pouch",
    type: "personal",
    title: {
      ko: "내 손으로 만드는 한복 만개 파우치 클래스 (2시간)",
      en: "Craft Your Own Mange Hanbok Pouch Class (2hrs)",
      ja: "手作り韓服パウチ ワンデークラス (2時間)",
    },
    price: 35000,
    duration: "120분",
    capacity: 6,
    description: {
      ko: "기본 수공예 도구 사용법부터 재단선 그리기, 바느질 마무리까지 숙련된 시니어 강사와 청년 디자이너가 단계별로 친근하게 지도합니다. 완성한 꽃 모양 파우치는 바로 가져가실 수 있습니다.",
      en: "Step-by-step guidance from senior tailors and young designers on using fundamental needlework tools, drafting templates, and securing seams. Take home your custom pouch directly.",
      ja: "基本裁縫道具の使い方、裁단線の引き方、丁寧な手縫いの締めくくりまで、ベテラン講師が個別指導します。完成した可愛い巾着（満開パウチ）は当日お持ち帰り頂けます。",
    },
    image: "https://images.unsplash.com/photo-1456428190544-a131a9c8b2c6?auto=format&fit=crop&q=80&w=600", // warm cozy craft table
  },
  {
    id: "class-keyring",
    type: "group",
    title: {
      ko: "[소그룹/단체] 소원 댕기 키링 및 액막이 오색 소품 (90분)",
      en: "[Group] Traditional Ribbon Keyring & Five-color Ornaments (90m)",
      ja: "【少人数・団体】願いデンギキーリング製作体験 (90分)",
    },
    price: 25000,
    duration: "90분",
    capacity: 15,
    description: {
      ko: "인근 친구, 지인이나 공방 동아리 형식으로 진행하기 좋은 다채로운 천 액세서리 원데이 교실입니다. 부담이 적고 초보자도 아름다운 결과물을 보장합니다.",
      en: "A perfect 90-minute small-group workshop crafting traditional silk ribbon bookmarks and keyrings. Very beginner-friendly and highly satisfying results.",
      ja: "複数人の集まりや、趣味のサークルにぴったりな伝統ノット紐＆お守りアクセサリー単発教室です。敷居が低く、初心者でも美しい仕上がりを約束します。",
    },
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600", // traditional colorful textile desk
  },
  {
    id: "class-external",
    type: "external",
    title: {
      ko: "[외부 출강/출장] ESG지속가능 새활용 한복 인테리어 가랜드",
      en: "[External/ESG Seminar] Upcycled Garland Office Workshop",
      ja: "【外部出張・企業ESG】リサイクル韓服のウォールガーランド",
    },
    price: 50000,
    duration: "120분",
    capacity: 30,
    description: {
      ko: "관공서, 대기업 ESG 워크숍, 학교 등 친환경 가치 교육 및 실리공예를 체험하는 대규모 출강 프로그램입니다. 기수별 맞춤형 키트 및 포장 패키지를 제공해 드립니다.",
      en: "A premium corporate ESG-friendly lecture and team-building program on upcycling. Custom handwork kits, materials, and certificates are provided for your institution.",
      ja: "官公庁、企業研修（ESG教育）、学校などで大人気の、出張型エコアップサイクル体験プログラム。受講者全員分のプレミアム作成キットと資料パッケージを送付します。",
    },
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600", // collaborative room setting
  }
];

// Initial preloaded mock bookings and orders to bootstrap the Admin experience
export const INITIAL_RESERVATIONS: Reservation[] = [];

export const INITIAL_ORDERS: Order[] = [];
