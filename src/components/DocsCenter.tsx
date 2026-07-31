import { useState } from "react";
import { 
  Network, 
  Layers, 
  Database, 
  Terminal, 
  GitFork, 
  FileCode,
  Tag,
  Key,
  Calendar,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ClipboardCheck,
  CheckCircle2
} from "lucide-react";

export default function DocsCenter() {
  const [activeSubTab, setActiveSubTab] = useState<"menu" | "comp" | "api" | "db">("menu");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-900/10 shadow-sm max-w-7xl mx-auto my-8">
      {/* Doc Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-amber-900/10 pb-6 mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200 mb-2">
            <Network className="w-3 md:w-3.5 h-3.5" /> SYSTEM ARCHITECTURE & BLUEPRINT
          </div>
          <h2 className="text-2xl font-serif text-stone-800 font-bold">호롱잡화점 공식 시스템 설계 기획서</h2>
          <p className="text-stone-500 text-sm mt-1">
            전통 한복 업사이클링 이커머스 및 친환경 클래스 실시간 솔루션의 종합 설계 스택 명세서입니다.
          </p>
        </div>
        
        {/* Quick Menu Selection */}
        <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setActiveSubTab("menu")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              activeSubTab === "menu"
                ? "bg-amber-700 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-800 hover:bg-stone-200/50"
            }`}
          >
            <GitFork className="w-3.5 h-3.5" /> 메뉴 트리 (GNB)
          </button>
          <button
            onClick={() => setActiveSubTab("comp")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              activeSubTab === "comp"
                ? "bg-amber-700 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-800 hover:bg-stone-200/50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> React 컴포넌트
          </button>
          <button
            onClick={() => setActiveSubTab("api")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              activeSubTab === "api"
                ? "bg-amber-700 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-800 hover:bg-stone-200/50"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> RESTful API 명세
          </button>
          <button
            onClick={() => setActiveSubTab("db")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              activeSubTab === "db"
                ? "bg-amber-700 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-800 hover:bg-stone-200/50"
            }`}
          >
            <Database className="w-3.5 h-3.5" /> DB 스키마 (SQL)
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: MENU TREE */}
      {activeSubTab === "menu" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
            <h3 className="text-base font-bold text-stone-800 flex items-center gap-2 mb-4 font-serif">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              웹사이트 메뉴 트리 (GNB / LNB 구조)
            </h3>
            <p className="text-stone-500 text-xs mb-6">
              글로벌 이커머스와 오프라인 클래스 예약 신청, 백오피스 기능을 통합하는 호롱잡화점 웹사이트의 다국어 지원 메뉴 위계입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Menu Column 1 */}
              <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-900/5">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pb-2 border-b border-amber-900/10 mb-3">
                  <span className="bg-amber-700 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">1.0</span> Brand Story
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 공방 소개 (Story)
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>대구 서문시장 스토리</li>
                    <li>시니어 장인 & 청년 협업</li>
                  </ul>
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 6단계 제작공정 (Process)
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>선별 → 분해 → 세탁</li>
                    <li>재단 → 재봉 → 검사</li>
                  </ul>
                </ul>
              </div>

              {/* Menu Column 2 */}
              <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-900/5">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pb-2 border-b border-amber-900/10 mb-3">
                  <span className="bg-amber-700 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">2.0</span> Shop (상점)
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 제품 카테고리 (LNB)
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>가방 (조선백, 만개 파우치)</li>
                    <li>악세사리 (호롱댕기, 밴드)</li>
                    <li>오브제 (가랜드, 명태)</li>
                  </ul>
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 커스텀 상세 (Bespoke)
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>원단 매칭 / 이니셜 각인</li>
                    <li>태슬 및 보자기 포장 옵션</li>
                  </ul>
                </ul>
              </div>

              {/* Menu Column 3 */}
              <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-900/5">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pb-2 border-b border-amber-900/10 mb-3">
                  <span className="bg-amber-700 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">3.0</span> One-day Class
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 클래스 종류 (Class)
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>개인 맞춤체험 (2시간)</li>
                    <li>단체 소그룹 동아리</li>
                    <li>외부 기관/기업 ESG 출강</li>
                  </ul>
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 예약 신청 시스템
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>실시간 달력 날짜 연동</li>
                    <li>잔여 좌석 조회 및 차감</li>
                  </ul>
                </ul>
              </div>

              {/* Menu Column 4 */}
              <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-900/5">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pb-2 border-b border-amber-900/10 mb-3">
                  <span className="bg-amber-700 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">4.0</span> User Services
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 장바구니 보따리
                  </li>
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 주문 / 가상 결제
                  </li>
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 소셜 SSO 연동
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>카카오톡 로그인</li>
                    <li>구글 로그인</li>
                  </ul>
                </ul>
              </div>

              {/* Menu Column 5 */}
              <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-900/5">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1 pb-2 border-b border-amber-900/10 mb-3">
                  <span className="bg-amber-700 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">5.0</span> Back-Office
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 스태프 전용 관리
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>예약 수동 확정/취소</li>
                    <li>실시간 남은 정원 갱신</li>
                  </ul>
                  <li className="flex items-center gap-1 text-stone-800 font-medium">
                    <ChevronRight className="w-3 h-3 text-stone-400" /> 판매 및 배송 관리
                  </li>
                  <ul className="pl-4 space-y-1 text-[11px] text-stone-500 list-disc">
                    <li>상품 등록 / 실시간 재고 관리</li>
                    <li>Bespoke 주문내용 확인</li>
                    <li>준비/배송 단계 수작업 제어</li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
            <h4 className="text-sm font-bold text-stone-800 mb-3 font-serif">다국어 대응 (i18n) 및 사용자 편의성 기획 설계</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="p-3 bg-stone-50 rounded-xl">
                <strong className="text-stone-800 font-medium block mb-1">한·영·일 3개국 동시 번역</strong>
                제품명, 공정 설명, 각 맞춤 옵션 가격, 예약 달력 등 전 사이트 구성 요소를 완전 번역 키화하여 아시아 중심의 세계 무대로 발돋움하는 한복 가치를 직관화합니다.
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <strong className="text-stone-800 font-medium block mb-1">간편 소셜 0-Step 결합</strong>
                전통 브랜드의 주 고객층인 시니어부터 MZ세대 글로벌 관광객까지 원클릭으로 구매를 추적할 수 있도록 카카오/구글 통합 Mock SSO 인터페이스를 구성합니다.
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <strong className="text-stone-800 font-medium block mb-1">하이브리드 다바이스 설계</strong>
                달력 예약 모듈과 옵션 커스텀 모빌리티 환경 최적화를 위해 데스크톱의 여유 공간을 십분 활용하고, 모바일 보따리 인입 경험을 최적화한 유연 디자인을 차용합니다.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: COMPONENT GRAPH */}
      {activeSubTab === "comp" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
            <h3 className="text-base font-bold text-stone-800 flex items-center gap-2 mb-2 font-serif">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              프론트엔드 핵심 컴포넌트 계층 구조 (React / ESG Spec)
            </h3>
            <p className="text-stone-500 text-xs mb-6">
              컴포넌트의 단백화 및 단방향 데이터 바인딩을 달성하기 위한 컴포넌트 아키텍처 트리입니다.
            </p>

            <div className="bg-stone-900 text-stone-300 p-6 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
              <div className="text-stone-400"># src/ 디렉토리 구조 및 React 컴포넌트 의존 다이어그램</div>
              <div className="my-2 text-amber-400">App (Root Controller)</div>
              <div className="pl-4 border-l border-stone-700 ml-2 space-y-2 py-1">
                <div>├── <b className="text-emerald-400">GNBHeader</b> <span className="text-stone-500">// 글로벌 내비게이션, 장바구니 개수 배지, 언어스위쳐, 소셜 로그인 인입</span></div>
                <div>├── <b className="text-sky-400">BrandHero</b> <span className="text-stone-500">// 전통 스토리라인, 6단계 새활용 공정 카드 스태거드 애니메이션</span></div>
                <div>├── <b className="text-sky-400">ProductBespoke</b> <span className="text-stone-500">// 상점 메인 레이아웃 및 카테고리 필터링</span></div>
                <div className="pl-4 border-l border-stone-700 ml-2">
                  <div>├── <b>ProductCard</b> <span className="text-stone-500">// 개별 상품 리스팅 및 실시간 재고 바디</span></div>
                  <div>└── <b>BespokeCustomizer</b> <span className="text-stone-500">// 1:1 커스텀 옵션(원단 선택기, 이니셜 텍스트, 보자기 리퍼 패킹)</span></div>
                </div>
                <div>├── <b className="text-sky-400">ClassBooking</b> <span className="text-stone-500">// 원데이 클래스 달력 예약 제어판</span></div>
                <div className="pl-4 border-l border-stone-700 ml-2">
                  <div>├── <b>CalendarGrid</b> <span className="text-stone-500">// JS 대화형 그리드 날짜 연산, 휴무 상태 제어</span></div>
                  <div>└── <b>BookingTicketForm</b> <span className="text-stone-500">// 수강인원, 잔여좌석 실시간 검수 연산, 에러 방어</span></div>
                </div>
                <div>├── <b className="text-rose-400">CartDrawer</b> <span className="text-stone-500">// 장바구니 리스트 및 이커머스 옵션 상세 내역 요약</span></div>
                <div className="pl-4 border-l border-stone-700 ml-2">
                  <div>└── <b>MockCheckout</b> <span className="text-stone-500">// 빌링 요약, 가상 카드 결제창 및 성공 모달 가동</span></div>
                </div>
                <div>└── <b className="text-yellow-400">AdminConsole</b> <span className="text-stone-500">// 통합 백오피스 통합 대시보드</span></div>
                <div className="pl-4 border-l border-stone-700 ml-2">
                  <div>├── <b>ManageReservations</b> <span className="text-stone-500">// 클래스 실시간 예약자 현황 추적, 수동 확정/취소 API 가교</span></div>
                  <div>└── <b>ManageSalesProducts</b> <span className="text-stone-500">// 오더 상세 맞춤 옵션 체크, 배송 트래커, 제품 목록 및 재고 수정 추가</span></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/20 p-4 rounded-xl border border-amber-900/10">
              <span className="text-stone-800 font-serif font-bold text-xs block mb-2">프레임워크 코어 핵심 기획</span>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                <li><b>상태 중앙 연동</b>: App 컴포넌트에서 전체 DB(Products, Classes, Bookings, Orders) 상태를 일원화 관리함으로써 사용자 액션이 백오피스 관리 화면에 유기적 반영.</li>
                <li><b>실시간 반응형 애니메이션 (motion)</b>: 한복 원단이 매끄럽게 포개지는 느낌을 표현하기 위한 6단계 공정 스크롤 트랜지션 및 맞춤 옵션 확장 슬라이딩 애니메이션.</li>
              </ul>
            </div>
            <div className="bg-amber-50/20 p-4 rounded-xl border border-amber-900/10">
              <span className="text-stone-800 font-serif font-bold text-xs block mb-2">다국어 바인딩 구조 (i18n Context)</span>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                <li><b>i18nDictionary</b> 구조를 활용해 React Hooks 컴포넌트 내부에서 폼 헬퍼 번역을 한순간에 로드: <code className="bg-stone-200/60 px-1 py-0.5 rounded font-mono font-semibold">t.brandName</code></li>
                <li>세션 스토리지 또는 글로벌 로컬 메모리 상태에 <code className="bg-stone-200/60 px-1 py-0.5 rounded font-mono">lang</code>을 보관하여 리렌더링 시 다국어 통일 유지.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: API SPEC */}
      {activeSubTab === "api" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm relative">
            <div className="absolute top-6 right-6 flex items-center gap-1">
              <button 
                onClick={() => copyToClipboard(rawAPIText, "apiText")}
                className="text-stone-400 hover:text-stone-600 p-1.5 bg-stone-100 rounded-lg transition-colors border border-stone-200"
                title="API 명세서 텍스트 복사"
              >
                {copiedId === "apiText" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ClipboardCheck className="w-4 h-4" />}
              </button>
            </div>
            
            <h3 className="text-base font-bold text-stone-800 flex items-center gap-2 mb-2 font-serif">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              백엔드 주요 RESTful API 명세서 초안
            </h3>
            <p className="text-stone-500 text-xs mb-4">
              예약 접수, 이커머스 맞춤형 상품 오더 및 백오피스 조회를 위한 REST 규격의 스펙 문서입니다.
            </p>

            <div className="text-xs font-mono bg-stone-900 text-stone-200 rounded-xl overflow-x-auto p-4 max-h-[480px] overflow-y-auto border border-stone-800 space-y-4">
              {/* API CARD 1: PRODUCTS GET */}
              <div className="border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-[11px] mb-2">
                  <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">GET</span>
                  <span className="text-stone-400 font-bold">/api/products</span>
                  <span className="text-stone-500 ml-auto">상품 목록 조회 및 카테고리 필터링</span>
                </div>
                <div className="text-[11px] text-stone-400 pl-4 border-l border-emerald-500/30">
                  <span className="text-amber-400 font-semibold">// Query Parameters:</span> category=bag | accessory | object<br />
                  <span className="text-blue-400 font-semibold">// Response 200:</span><br />
                  {"{"} "products": [{"{"} "id": "prod-chosun", "name": {"{"}"ko":"시그니처 조선백"{"}"}, "basePrice": 68000, "stock": 12 {"}"}] {"}"}
                </div>
              </div>

              {/* API CARD 2: BESPOKE ORDER POST */}
              <div className="border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-[11px] mb-2">
                  <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">POST</span>
                  <span className="text-stone-400 font-bold">/api/orders</span>
                  <span className="text-stone-500 ml-auto">맞춤형 한복 상품 주문 및 가상 결제 생성</span>
                </div>
                <div className="text-[11px] text-stone-400 pl-4 border-l border-blue-500/30">
                  <span className="text-amber-400 font-semibold">// Request Body:</span><br />
                  {"{"}<br />
                  &nbsp;&nbsp;"userName": "김민우", "userEmail": "minwoo@example.com", "userPhone": "010-8765-4321", "address": "대구 중구 서문시장",<br />
                  &nbsp;&nbsp;"items": [{"{"} "productId": "prod-chosun", "quantity": 1, "options": {"{"} "fabric": "traditional", "engraving": "2026", "wrapping": "bojagi" {"}"}, "itemTotal": 71000 {"}"}],<br />
                  &nbsp;&nbsp;"totalAmount": 71000<br />
                  {"}"}<br />
                  <span className="text-blue-400 font-semibold">// Response 201 Success:</span><br />
                  {"{"} "success": true, "orderId": "ord-1003", "status": "completed" {"}"}
                </div>
              </div>

              {/* API CARD 3: CLASS BOOKING POST */}
              <div className="border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-[11px] mb-2">
                  <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">POST</span>
                  <span className="text-stone-400 font-bold">/api/classes/reservations</span>
                  <span className="text-stone-500 ml-auto">원데이 클래스 달력 예약 접수</span>
                </div>
                <div className="text-[11px] text-stone-400 pl-4 border-l border-blue-500/30">
                  <span className="text-amber-400 font-semibold">// Request Body:</span><br />
                  {"{"}<br />
                  &nbsp;&nbsp;"classId": "class-pouch", "date": "2026-06-25", "time": "14:00",<br />
                  &nbsp;&nbsp;"userName": "이지현", "userPhone": "010-1234-5678", "seats": 2<br />
                  {"}"}<br />
                  <span className="text-blue-400 font-semibold">// Response 201 Success:</span><br />
                  {"{"} "success": true, "reservationId": "res-901", "status": "pending", "message": "Reservation created waiting approval" {"}"}
                </div>
              </div>

              {/* API CARD 4: ADMIN ORDR PUT */}
              <div className="border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-[11px] mb-2">
                  <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">PUT</span>
                  <span className="text-stone-400 font-bold">/api/admin/orders/:id/status</span>
                  <span className="text-stone-500 ml-auto">[관리자] 주문 배송 상태 전환</span>
                </div>
                <div className="text-[11px] text-stone-400 pl-4 border-l border-amber-500/30">
                  <span className="text-amber-400 font-semibold">// Param:</span> id : ord-1001<br />
                  <span className="text-amber-400 font-semibold">// Request Body:</span> {"{"} "status": "preparing" | "shipping" | "delivered" {"}"}<br />
                  <span className="text-blue-400 font-semibold">// Response 200:</span> {"{"} "success": true, "updatedStatus": "shipping" {"}"}
                </div>
              </div>

              {/* API CARD 5: ADMIN RES PUT */}
              <div>
                <div className="flex items-center gap-2 text-[11px] mb-1">
                  <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">PUT</span>
                  <span className="text-stone-400 font-bold">/api/admin/reservations/:id/status</span>
                  <span className="text-stone-500 ml-auto">[관리자] 예약 수강 상태 변경</span>
                </div>
                <div className="text-[11px] text-stone-400 pl-4 border-l border-amber-500/30">
                  <span className="text-amber-400 font-semibold">// Param:</span> id : res-001<br />
                  <span className="text-amber-400 font-semibold">// Request Body:</span> {"{"} "status": "confirmed" | "cancelled" {"}"}<br />
                  <span className="text-blue-400 font-semibold">// Response 200:</span> {"{"} "success": true, "updatedStatus": "confirmed" {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DB SCHEMA */}
      {activeSubTab === "db" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm relative">
            <div className="absolute top-6 right-6 flex items-center gap-1">
              <button 
                onClick={() => copyToClipboard(rawSQLText, "sqlText")}
                className="text-stone-400 hover:text-stone-600 p-1.5 bg-stone-100 rounded-lg transition-colors border border-stone-200"
                title="데이터베이스 DDL 복사"
              >
                {copiedId === "sqlText" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ClipboardCheck className="w-4 h-4" />}
              </button>
            </div>
            
            <h3 className="text-base font-bold text-stone-800 flex items-center gap-2 mb-2 font-serif">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              데이터베이스 주요 테이블 스키마 설계안 (PostgreSQL 기준)
            </h3>
            <p className="text-stone-500 text-xs mb-4">
              사용자, 맞춤 한복 상품, BESPOKE 복합 오더 내역, 수강 클래스, 일자별 예약 스키마를 유기적으로 연결한 관계형 DB 스터디입니다.
            </p>

            <div className="text-xs font-mono bg-stone-900 text-emerald-300 rounded-xl overflow-x-auto p-4 max-h-[480px] overflow-y-auto border border-stone-800">
              <pre>{rawSQLText}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Raw Documentation texts for copy convenience
const rawAPIText = `
========================================
HORONG GENERAL STORE - RESTful API SPEC (DRAFT)
========================================

1. PRODUCT API
-----------------------
- GET /api/products
  Category filtering and product list search.
  - Query Params:
    * category = "bag" | "accessory" | "object"
  - Response (200 OK):
    {
      "products": [
        {
          "id": "prod-chosun",
          "name": { "ko": "시그니처 조선백", "en": "Signature Joseon Bag", "ja": "シグネチャー朝鮮バッグ" },
          "category": "bag",
          "basePrice": 68000,
          "stock": 12,
          "image": "/images/chosun.jpg"
        }
      ]
    }

2. ORDER & BESPOKE API
-----------------------
- POST /api/orders
  Creates bespoke order & processes checkout.
  - Request Body:
    {
      "userName": "이지성",
      "userEmail": "jiseong@mail.com",
      "userPhone": "010-9999-9999",
      "address": "대구시 중구 삼덕동",
      "items": [
        {
          "productId": "prod-chosun",
          "quantity": 1,
          "options": {
            "fabric": "traditional",
            "engraving": "HOPE-2026",
            "wrapping": "bojagi"
          },
          "itemTotal": 71000
        }
      ],
      "totalAmount": 71000
    }
  - Response (201 Created):
    {
      "success": true,
      "orderId": "ord-1003",
      "status": "completed"
    }

3. CLASS EXPERIENCE API
-----------------------
- GET /api/classes
  Retrieve list of upcycling workshops.
  - Response (200 OK):
    [
      {
        "id": "class-pouch",
        "title": { "ko": "한복 만개 파우치 클래스", "en": "Hanbok Pouch Class" },
        "price": 35000,
        "capacity": 6
      }
    ]

- POST /api/classes/reservations
  Book a seat on an upcycling class on selected date/time.
  - Request Body:
    {
      "classId": "class-pouch",
      "date": "2026-06-25",
      "time": "14:00",
      "userName": "박기량",
      "userEmail": "ryang@mail.com",
      "userPhone": "010-1111-2222",
      "seats": 3,
      "totalPrice": 105000
    }
  - Response (201 Created):
    {
      "success": true,
      "reservationId": "res-901",
      "status": "pending"
    }

4. BACK-OFFICE (ADMIN) API [REST - SECURED]
-----------------------
- PUT /api/admin/orders/:id/status
  Allows staff to change delivery and tailoring status of order.
  - Request Body: { "status": "preparing" | "shipping" | "delivered" }
  - Response (200 OK): { "success": true, "updatedStatus": "shipping" }

- PUT /api/admin/reservations/:id/status
  Confirm or Cancel user's class booking.
  - Request Body: { "status": "confirmed" | "cancelled" }
  - Response (200 OK): { "success": true, "updatedStatus": "confirmed" }
`;

const rawSQLText = `-- ========================================================
-- HORONG GENERAL STORE - POSTGRESQL TABLE SCHEMAS
-- ========================================================

-- 1. USER TABLE (카카오/구글 소셜 계정 연동 포함)
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,               -- 고유 식별값 (SSO 제공)
    email VARCHAR(100) UNIQUE NOT NULL,       -- 이메일 주소
    user_name VARCHAR(50) NOT NULL,           -- 고객 성명
    provider VARCHAR(20) DEFAULT 'local',     -- 로그인 연동처 ('kakao', 'google', 'local')
    phone VARCHAR(30),                         -- 연락처
    is_staff BOOLEAN DEFAULT FALSE,           -- 관리자(백오피스) 여부
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. PRODUCT TABLE (한복 업사이클링 상품 마스터)
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name_ko VARCHAR(150) NOT NULL,            -- 다국어 이름 (KOR)
    name_en VARCHAR(150),                     -- 다국어 이름 (ENG)
    name_ja VARCHAR(150),                     -- 다국어 이름 (JPN)
    category VARCHAR(30) NOT NULL,            -- 'bag', 'accessory', 'object'
    base_price INTEGER NOT NULL DEFAULT 0,    -- 기본 구매 가격 (원)
    description_ko TEXT,                      -- 한국어 브랜드 스토리텔링
    description_en TEXT,                      -- 영어 번역 설명
    description_ja TEXT,                      -- 일본어 번역 설명
    details_ko TEXT,                          -- 상세 사양 (조선백 치수 등)
    image_url TEXT,                           -- 업로드 이미지 주소
    stock INTEGER NOT NULL DEFAULT 0,         -- 미완성 원단에 따른 최대 실시간 수량
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ORDERS TABLE (Bespoke 옵션 주문 마스터)
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id), -- 계정 유저 관계성 (NULL 허용 - 비회원)
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_phone VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,                    -- 배송 목적지 주소
    total_amount INTEGER NOT NULL,            -- 총 결제 정산액
    status VARCHAR(30) DEFAULT 'completed',   -- 주문 진행단계 ('completed', 'preparing', 'shipping', 'delivered')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. ORDER ITEMS & BESPOKE OPTIONS (주문별 다국어 및 1:1 디테일 각인 옵션)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    
    -- 1:1 맞춤 커스터마이저 옵션 데이터
    bespoke_fabric VARCHAR(30) NOT NULL,      -- 은은한 전통 무늬, 파스텔 실크, 내추럴 린넨, 오방색 등
    bespoke_engraving VARCHAR(50),            -- 보자기 각인 레이저 이니셜
    bespoke_wrapping VARCHAR(30) NOT NULL,    -- 종이 포장, 호롱 전용 박스, 한복 보자기 매듭 포장
    
    item_total INTEGER NOT NULL               -- 개별 주문가액
);

-- 5. UP-CYCLING CLASSES (ESG 친환경 원데이 클래스 종류)
CREATE TABLE classes (
    id VARCHAR(50) PRIMARY KEY,
    title_ko VARCHAR(200) NOT NULL,
    title_en VARCHAR(200),
    title_ja VARCHAR(200),
    class_type VARCHAR(30) NOT NULL,          -- 'personal'(개인), 'group'(단체), 'external'(외부출강)
    price INTEGER NOT NULL DEFAULT 0,         -- 인당 체험비용
    duration VARCHAR(50),                     -- 소요시간 (예: '120분')
    capacity INTEGER NOT NULL DEFAULT 10,     -- 클래스당 최대 정원
    description_ko TEXT,                      -- 상세 설명
    image_url TEXT
);

-- 6. CLASS RESERVATIONS (일자별 대화형 달력 예약)
CREATE TABLE reservations (
    id VARCHAR(50) PRIMARY KEY,
    class_id VARCHAR(50) REFERENCES classes(id),
    res_date DATE NOT NULL,                   -- 선택 수강일자 (YYYY-MM-DD)
    res_time VARCHAR(20) NOT NULL,            -- 수강 개시 시간 (예: "14:00")
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_phone VARCHAR(30) NOT NULL,
    seats INTEGER NOT NULL DEFAULT 1,         -- 예약 인원수
    total_price INTEGER NOT NULL,             -- 총 수강 예약액
    status VARCHAR(30) DEFAULT 'pending',     -- 예약 상태 ('pending': 승인대기, 'confirmed': 확정됨, 'cancelled': 취소됨)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
