import React, { useState } from "react";
import { Product, CraftClass, Reservation, Order } from "../types";
import { Language, TranslationDictionary } from "../data/i18n";
import { 
  Calendar, 
  ShoppingBag, 
  Package, 
  Edit3, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Sliders, 
  Truck, 
  Database,
  Users,
  Search,
  RefreshCw,
  Sparkles
} from "lucide-react";

interface AdminConsoleProps {
  products: Product[];
  classes: CraftClass[];
  reservations: Reservation[];
  orders: Order[];
  onUpdateReservationStatus: (id: string, status: Reservation["status"]) => void;
  onUpdateOrderStatus: (id: string, status: Order["status"]) => void;
  onUpdateProductStock: (id: string, stock: number, price?: number) => void;
  onUpdateProductDetails?: (id: string, nameKo: string, nameEn: string, descKo?: string, descEn?: string) => void;
  onDeleteProduct?: (id: string) => void;
  onAddProduct: (product: Product) => void;
  onUpdateProductImage?: (id: string, newImage: string) => void;
  onToggleProductSoldOut?: (id: string, isSoldOut: boolean) => void;
  onUpdateClassImage?: (id: string, newImage: string) => void;
  onUpdateClassDetails?: (id: string, titleKo: string, titleEn: string, descriptionKo: string, descriptionEn: string) => void;
  onDeleteClass?: (id: string) => void;
  monthlyItemsTitle?: string;
  onUpdateMonthlyTitle?: (title: string) => void;
  lang: Language;
  t: TranslationDictionary;
}

const compressImage = (file: File, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_SIZE = 400;
      let { width, height } = img;
      
      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL("image/jpeg", 0.5));
      } else {
        callback(e.target?.result as string);
      }
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

export default function AdminConsole({
  products,
  classes,
  reservations,
  orders,
  onUpdateReservationStatus,
  onUpdateOrderStatus,
  onUpdateProductStock,
  onUpdateProductDetails,
  onDeleteProduct,
  onAddProduct,
  onUpdateProductImage,
  onToggleProductSoldOut,
  onUpdateClassImage,
  onUpdateClassDetails,
  onDeleteClass,
  monthlyItemsTitle,
  onUpdateMonthlyTitle,
  lang,
  t,
}: AdminConsoleProps) {
  // Admin internal view tabs
  const [activeTab, setActiveTab] = useState<"reservations" | "orders" | "products" | "classes">("reservations");

  // Search filter strings
  const [resSearch, setResSearch] = useState("");
  const [ordSearch, setOrdSearch] = useState("");

  // Product edit state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [editImage, setEditImage] = useState("");
  const [editNameKo, setEditNameKo] = useState("");
  const [editNameEn, setEditNameEn] = useState("");
  const [editDescKo, setEditDescKo] = useState("");
  const [editDescEn, setEditDescEn] = useState("");

  // Class edit state
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editClassImage, setEditClassImage] = useState("");
  const [editClassTitleKo, setEditClassTitleKo] = useState("");
  const [editClassTitleEn, setEditClassTitleEn] = useState("");
  const [editClassDescriptionKo, setEditClassDescriptionKo] = useState("");
  const [editClassDescriptionEn, setEditClassDescriptionEn] = useState("");
  const [deleteClassConfirmId, setDeleteClassConfirmId] = useState<string | null>(null);

  // New product form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newId, setNewId] = useState("");
  const [newNameKo, setNewNameKo] = useState("");
  const [newNameEn, setNewNameEn] = useState("");
  const [newCat, setNewCat] = useState<Product["category"]>("bag");
  const [newPrice, setNewPrice] = useState(30000);
  const [newStock, setNewStock] = useState(10);
  const [newDescKo, setNewDescKo] = useState("");
  const [newDescEn, setNewDescEn] = useState("");
  const [newImage, setNewImage] = useState("https://images.unsplash.com/photo-1513519107127-1dba3fa7fd5d?auto=format&fit=crop&q=80&w=600");

  // Filter lists
  const filteredReservations = reservations.filter(
    (r) =>
      r.userName.toLowerCase().includes(resSearch.toLowerCase()) ||
      r.userPhone.includes(resSearch) ||
      r.classTitle[lang].toLowerCase().includes(resSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.userName.toLowerCase().includes(ordSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(ordSearch.toLowerCase()) ||
      o.userPhone.includes(ordSearch)
  );

  // Handle product edit start
  const handleStartEdit = (p: Product) => {
    setEditingProductId(p.id);
    setEditStock(p.stock);
    setEditPrice(p.basePrice);
    setEditImage(p.image);
    setEditNameKo(p.name.ko);
    setEditNameEn(p.name.en);
    setEditDescKo(p.description.ko);
    setEditDescEn(p.description.en);
  };

  const handleSaveProductChanges = (id: string) => {
    onUpdateProductStock(id, editStock, editPrice);
    if (onUpdateProductDetails) {
      onUpdateProductDetails(id, editNameKo, editNameEn, editDescKo, editDescEn);
    }
    if (onUpdateProductImage) {
      onUpdateProductImage(id, editImage);
    }
    setEditingProductId(null);
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId.trim() || !newNameKo.trim()) return;

    const newProd: Product = {
      id: "prod-" + newId.trim().toLowerCase(),
      name: {
        ko: newNameKo,
        en: newNameEn || newNameKo,
        ja: newNameKo,
      },
      category: newCat,
      basePrice: newPrice,
      description: {
        ko: newDescKo || "새로운 업사이클 공예품",
        en: newDescEn || "New Upcycled Craft Item",
        ja: newDescKo,
      },
      details: {
        ko: "규격: 수공예 커스텀 제작 | 재질: 한복 재활용 비단 원단",
        en: "Size: Handcrafted custom | Material: Upcycled Hanbok silk",
        ja: "スペック：手作りカスタム製品",
      },
      image: newImage,
      stock: newStock,
    };

    onAddProduct(newProd);

    // reset
    setNewId("");
    setNewNameKo("");
    setNewNameEn("");
    setNewDescKo("");
    setNewDescEn("");
    setNewImage("https://images.unsplash.com/photo-1513519107127-1dba3fa7fd5d?auto=format&fit=crop&q=80&w=600");
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      
      {/* Backoffice Admin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-stone-200 pb-5 mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1 bg-stone-800 text-amber-50 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm">
            🛡️ BACK-OFFICE OPERATIONS
          </div>
          <h2 className="text-xl md:text-2xl font-serif text-stone-800 font-bold mt-1.5 flex items-center gap-2">
            호롱 스태프 전용 통합 관리 시스템
          </h2>
        </div>

        {/* Console view modes tabs */}
        <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 w-full md:w-auto">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              activeTab === "reservations"
                ? "bg-stone-800 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>수강 예약 관리 ({reservations.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              activeTab === "orders"
                ? "bg-stone-800 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>판매 및 배송 관리 ({orders.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              activeTab === "products"
                ? "bg-stone-800 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>재고 및 상품 등록 ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("classes")}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              activeTab === "classes"
                ? "bg-stone-800 text-white shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>수강 과목 이미지 관리 ({classes.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: RESERVATION MANAGEMENT (예약 관리) */}
      {activeTab === "reservations" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={resSearch}
                onChange={(e) => setResSearch(e.target.value)}
                placeholder="예약자명, 연락처, 클래스 제목으로 조화..."
                className="w-full text-xs text-stone-800 bg-white border border-stone-200 rounded-xl py-2 pl-9 pr-4 focus:outline-hidden focus:ring-1 focus:ring-stone-700"
              />
            </div>
            <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1 self-end sm:self-auto">
              <Users className="w-3.5 h-3.5 text-stone-500" /> TOTAL ACTIVE BOOKING REQUESTS: {reservations.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px] text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-serif">
                  <th className="p-3">예약코드</th>
                  <th className="p-3">신청자 (연락처 / Email)</th>
                  <th className="p-3">신청 클래스 과목</th>
                  <th className="p-3">예정 일정 (인원 / 총액)</th>
                  <th className="p-3">승인 현황</th>
                  <th className="p-3 text-right">상태 제어</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredReservations.map((res) => {
                  return (
                    <tr key={res.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-stone-900">{res.id}</td>
                      <td className="p-3">
                        <div className="font-semibold">{res.userName}</div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">{res.userPhone}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{res.userEmail}</div>
                      </td>
                      <td className="p-3">
                        <div className="line-clamp-1 font-serif text-slate-700 max-w-xs">{res.classTitle[lang]}</div>
                        <span className="text-[9px] text-stone-400 font-mono block mt-0.5">ID: {res.classId}</span>
                      </td>
                      <td className="p-3 font-mono">
                        <div className="font-medium text-stone-900">{res.date} ({res.time})</div>
                        <div className="text-[10px] text-stone-500">{res.seats}팀 신청 / 협의 후 결정</div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          res.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : res.status === "cancelled"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {res.status === "confirmed" ? "승인확정" : res.status === "cancelled" ? "예약취소" : "승인대기"}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1 whitespace-nowrap">
                        {res.status === "pending" && (
                          <>
                            <button
                              onClick={() => onUpdateReservationStatus(res.id, "confirmed")}
                              className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-[10px] font-bold transition-all"
                            >
                              승인 (Confirm)
                            </button>
                            <button
                              onClick={() => onUpdateReservationStatus(res.id, "cancelled")}
                              className="px-2 py-1 bg-stone-100 hover:bg-rose-100 hover:text-rose-800 text-stone-600 rounded-md text-[10px] font-bold transition-all"
                            >
                              거절 (Reject)
                            </button>
                          </>
                        )}
                        {res.status !== "pending" && (
                          <button
                            onClick={() => onUpdateReservationStatus(res.id, "pending")}
                            className="px-2 py-1 border border-stone-200 hover:bg-stone-50 text-stone-500 rounded-md text-[10px] font-mono transition-all"
                          >
                            대기로 복원
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredReservations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-stone-400 font-serif">
                      검색 조건에 맞는 수강 예약 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: SALES & DELIVERY MANAGEMENT (판매 관리) */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={ordSearch}
                onChange={(e) => setOrdSearch(e.target.value)}
                placeholder="주문번호, 주문자명, 연락처 조회..."
                className="w-full text-xs text-stone-800 bg-white border border-stone-200 rounded-xl py-2 pl-9 pr-4 focus:outline-hidden focus:ring-1 focus:ring-stone-700"
              />
            </div>
            <div className="text-[11px] text-stone-400 font-mono">
              📦 TOTAL ORDERS ACQUIRED: {orders.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/60 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-serif">
                  <th className="p-3">주문번호</th>
                  <th className="p-3">수령인 / 배송처</th>
                  <th className="p-3">주문 제품 및 1:1 Bespoke 상세옵션</th>
                  <th className="p-3">결제총액</th>
                  <th className="p-3">진행단계</th>
                  <th className="p-3 text-right">배송트래킹 변경</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredOrders.map((ord) => {
                  return (
                    <tr key={ord.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-stone-900">{ord.id}</td>
                      <td className="p-3">
                        <div className="font-semibold">{ord.userName}</div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">{ord.userPhone}</div>
                        <div className="text-[10px] text-stone-500 mt-1 max-w-[200px] leading-relaxed break-words">{ord.address}</div>
                      </td>
                      <td className="p-3">
                        {ord.items.map((item, idx) => {
                          return (
                            <div key={idx} className="space-y-1 py-1">
                              <div className="font-semibold font-serif text-stone-800">
                                {item.productName[lang]} <span className="font-mono text-purple-800 text-[10px]">({item.quantity}개)</span>
                              </div>
                              <div className="bg-purple-50 text-[10px] text-purple-950 p-2 rounded-lg font-mono border border-purple-100/50 space-y-0.5 max-w-[340px]">
                                <div>• <b>원단선택:</b> {item.options.fabric}</div>
                                <div>• <b>각인이니셜:</b> <span className="font-bold">"{item.options.engraving}"</span></div>
                                <div>• <b>포장종류:</b> {item.options.wrapping}</div>
                                <div>• <b>품목합산:</b> ₩{item.itemTotal.toLocaleString()}</div>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td className="p-3 font-mono font-semibold text-stone-950">
                        ₩{ord.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          ord.status === "completed" ? "bg-emerald-100 text-emerald-800"
                            : ord.status === "preparing" ? "bg-amber-100 text-amber-800 text-orange-850"
                            : ord.status === "shipping" ? "bg-blue-100 text-blue-800"
                            : "bg-stone-100 text-stone-700"
                        }`}>
                          {ord.status === "completed" ? "결제완료"
                            : ord.status === "preparing" ? "배송준비중"
                            : ord.status === "shipping" ? "배송중"
                            : "배송완료"}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="text-[11px] bg-stone-50 border border-stone-200 rounded-md px-2 py-1 focus:outline-hidden focus:ring-1 focus:ring-stone-600"
                        >
                          <option value="completed">결제완료 (completed)</option>
                          <option value="preparing">배송준비 (preparing)</option>
                          <option value="shipping">배송중 (shipping)</option>
                          <option value="delivered">배송완료 (delivered)</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-stone-400 font-serif">
                      주문 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: PRODUCTSTOCK / ADD NEW ITEMS (상품 등록 및 재고 제어) */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-stone-500 font-serif block">
              🏺 실시간 원단 소진량에 따른 재고/가격 수동 긴급 통제 및 신규 라인 등록
            </span>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>신규 한복 업사이클 상품 출시 등록</span>
            </button>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="flex-1">
              <label className="text-[10px] text-stone-400 font-mono tracking-wider block mb-1">
                홈화면 하단 기획전 제목 (월간 기획전 등)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={monthlyItemsTitle || ""}
                  id="monthly-title-input"
                  placeholder="MONTHLY ITEMS"
                  className="w-full text-xs font-sans border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-hidden focus:border-stone-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("monthly-title-input") as HTMLInputElement;
                    if (el && onUpdateMonthlyTitle) {
                      onUpdateMonthlyTitle(el.value);
                      alert("변경 사항이 저장되었습니다.");
                    }
                  }}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-sm"
                >
                  수정 완료
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Insert Product form */}
          {showAddForm && (
            <form onSubmit={handleCreateProductSubmit} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 animate-fade-in max-w-2xl">
              <div className="text-xs font-bold text-stone-700 font-serif border-b border-stone-200 pb-2">
                🆕 신제품 기본 정보 명세 입력
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-stone-400 font-mono tracking-wider block mb-1">PROD ID (Excl. prefix) *</label>
                  <input
                    required
                    type="text"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                    placeholder="예: norigae"
                    className="w-full text-xs border border-stone-200 bg-white rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] text-stone-400 font-mono block mb-1">상품 한글명 *</label>
                  <input
                    required
                    type="text"
                    value={newNameKo}
                    onChange={(e) => setNewNameKo(e.target.value)}
                    placeholder="예: 가치 조각보 노리개"
                    className="w-full text-xs border border-stone-200 bg-white rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">카테고리 분류</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full text-xs border border-stone-200 bg-white rounded-lg px-2 py-1.5 text-stone-700"
                  >
                    <option value="bag">가방 (bag)</option>
                    <option value="accessory">전통 악세사리 (accessory)</option>
                    <option value="object">리빙 오브제 (object)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">기본 가격 (KRW)</label>
                  <input
                    required
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full text-xs border border-stone-200 bg-white rounded-lg px-2.5 py-1.5 text-stone-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">초기 준비 수량</label>
                  <input
                    required
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full text-xs border border-stone-200 bg-white rounded-lg px-2.5 py-1.5 text-stone-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">한글스토리텔링 내용</label>
                  <textarea
                    rows={2}
                    value={newDescKo}
                    onChange={(e) => setNewDescKo(e.target.value)}
                    placeholder="원데이 수급 한복의 가치에 대한 설명"
                    className="w-full text-xs border border-stone-200 bg-white rounded-lg px-2.5 py-1.5 text-stone-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-400 block mb-1">영어 번역 설명 (English)</label>
                  <textarea
                    rows={2}
                    value={newDescEn}
                    onChange={(e) => setNewDescEn(e.target.value)}
                    placeholder="Short description for global visitors"
                    className="w-full text-xs border border-stone-200 bg-white rounded-lg px-2.5 py-1.5 text-stone-700"
                  />
                </div>
              </div>

              {/* Product Image Selection & Direct Computer Upload */}
              <div className="space-y-1.5 pt-2 border-t border-stone-200/50">
                <label className="text-[10px] text-stone-500 font-serif font-bold block">
                  📸 상품 대표 이미지 설정 (컴퓨터에 있는 이미지 파일 선택 및 라이브 프리뷰 지원)
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-3 rounded-xl border border-stone-200/60">
                  <div className="w-14 h-18 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {newImage ? (
                      <img src={newImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-stone-300 text-[10px]">No Image</span>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2 w-full">
                    <div>
                      <span className="block text-[9px] text-stone-400 font-serif mb-0.5">이미지 웹 URL</span>
                      <input
                        type="text"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="이미지 웹 주소 (https://...)"
                        className="w-full text-[11px] font-mono border border-stone-250 bg-stone-50/50 rounded px-2 py-1 text-stone-700 focus:outline-hidden"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="inline-flex items-center px-2.5 py-1 bg-stone-800 hover:bg-stone-900 text-amber-50 rounded text-[10px] font-bold cursor-pointer transition-all active:scale-95 shadow-xs">
                        <span>📁 컴퓨터에서 이미지 파일 올리기</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              compressImage(file, (base64) => {
                                setNewImage(base64);
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[9px] text-stone-400">*.png, *.jpg, *.webp 내장 base64 인코딩 지원</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-stone-500 bg-stone-100 hover:bg-stone-200 rounded-lg"
                >
                  취소(Cancel)
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs text-white bg-amber-800 hover:bg-amber-900 rounded-lg font-bold"
                >
                  등록 완료 (Publish)
                </button>
              </div>
            </form>
          )}

          {/* Product list stock tuning grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => {
              const isEditing = editingProductId === p.id;
              return (
                <div 
                  key={p.id}
                  className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <img 
                        src={p.image} 
                        alt="" 
                        className="w-12 h-16 object-cover rounded-lg bg-stone-50 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold font-mono text-amber-800 uppercase bg-amber-50 px-1.5 py-0.2 rounded-sm block w-fit mb-1">
                          {p.category}
                        </span>
                        <h4 className="font-serif font-bold text-stone-800 text-xs truncate">
                          {p.name.ko}
                        </h4>
                        <span className="text-[9px] text-stone-400 font-mono">PRODUCT CODE: {p.id}</span>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="bg-stone-50 p-3 rounded-xl mt-3 space-y-2.5 font-mono text-[11px] text-stone-600 border border-stone-200/50">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center justify-between">제품명 (한글):
                            <input
                              type="text"
                              value={editNameKo}
                              onChange={(e) => setEditNameKo(e.target.value)}
                              className="w-32 text-right font-sans bg-white border border-stone-200 rounded px-1.5 py-0.5 text-xs"
                            />
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center justify-between">제품명 (영문):
                            <input
                              type="text"
                              value={editNameEn}
                              onChange={(e) => setEditNameEn(e.target.value)}
                              className="w-32 text-right font-sans bg-white border border-stone-200 rounded px-1.5 py-0.5 text-xs"
                            />
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="mb-1">제품 설명 (한글):</span>
                          <textarea
                            value={editDescKo}
                            onChange={(e) => setEditDescKo(e.target.value)}
                            className="w-full font-sans bg-white border border-stone-200 rounded px-2 py-1.5 text-xs h-16 resize-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="mb-1">제품 설명 (영문):</span>
                          <textarea
                            value={editDescEn}
                            onChange={(e) => setEditDescEn(e.target.value)}
                            className="w-full font-sans bg-white border border-stone-200 rounded px-2 py-1.5 text-xs h-16 resize-none"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-stone-200/50">
                          <span>보유 수량:</span>
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(Number(e.target.value))}
                            className="w-20 text-right font-mono bg-white border border-stone-200 rounded px-1.5 py-0.5 text-xs"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>단가(₩):</span>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-24 text-right font-mono bg-white border border-stone-200 rounded px-1.5 py-0.5 text-xs"
                          />
                        </div>
                        <div className="space-y-1.5 pt-1.5 border-t border-stone-200/50">
                          <span className="block text-[10px] text-stone-400 font-serif">상품 이미지 변경:</span>
                          <input
                            type="text"
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                            className="w-full text-[10px] font-mono bg-white border border-stone-200 rounded px-1.5 py-1 focus:outline-hidden"
                            placeholder="https://images.unsplash.com/..."
                          />
                          
                          <div className="flex items-center gap-1.5 pt-1">
                            <label className="inline-flex items-center px-2 py-0.5 bg-stone-200 hover:bg-stone-300 active:scale-95 text-stone-800 text-[9px] font-bold rounded cursor-pointer transition-all border border-stone-300">
                              <span>📁 컴퓨터 파일 선택</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file, (base64) => {
                                      setEditImage(base64);
                                    });
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            <span className="text-[8px] text-stone-400 font-sans">로컬 이미지 올리기</span>
                          </div>

                          <div className="flex gap-1 flex-wrap pt-1">
                            {[
                              { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600", label: "조선백" },
                              { url: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600", label: "조각보" },
                              { url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=600", label: "비단감" },
                              { url: "https://images.unsplash.com/photo-1513519107127-1dba3fa7fd5d?auto=format&fit=crop&q=80&w=600", label: "인테리어" }
                            ].map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setEditImage(preset.url)}
                                className={`px-1.5 py-0.5 border text-[9px] rounded-md font-sans transition-all ${
                                  editImage === preset.url 
                                    ? "bg-stone-850 text-white border-stone-800 bg-stone-800 font-bold" 
                                    : "bg-white hover:bg-stone-100 text-stone-600 border-stone-200"
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs mt-4 pt-2 border-t border-stone-100 font-mono text-stone-500">
                        <div>
                          재고: <span className={`font-bold font-mono ${p.stock <= 3 ? "text-red-650 font-black text-red-600" : "text-stone-800"}`}>{p.stock}개</span>
                        </div>
                        <div>
                          단가: <span className="font-bold text-stone-800">₩{(p.basePrice).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-3 gap-1 grid grid-cols-2 mt-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="px-2 py-1 border border-stone-200 text-stone-500 rounded-md text-[10px] text-center"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => {
                            handleSaveProductChanges(p.id);
                            alert("상품 정보가 수정되었습니다.");
                          }}
                          className="px-2 py-1 bg-stone-800 text-white rounded-md text-[10px] font-bold text-center flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3 h-3" /> 수정 완료
                        </button>
                      </>
                    ) : (
                      <>
                        {deleteConfirmId === p.id ? (
                          <div className="col-span-2 flex gap-1">
                            <button
                              onClick={() => {
                                if (onDeleteProduct) onDeleteProduct(p.id);
                                setDeleteConfirmId(null);
                              }}
                              className="flex-1 px-2 py-1.5 border border-red-500 bg-red-500 text-white hover:bg-red-600 rounded-xl text-[10px] text-center font-bold"
                            >
                              삭제 확인
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="flex-1 px-2 py-1.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 rounded-xl text-[10px] text-center font-bold"
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                if (onToggleProductSoldOut) {
                                  onToggleProductSoldOut(p.id, !p.isSoldOut);
                                }
                              }}
                              className={`col-span-2 px-2 py-1.5 border rounded-xl text-[10px] text-center font-bold flex items-center justify-center gap-1 mb-1 ${p.isSoldOut ? 'bg-amber-100 border-amber-300 text-amber-800' : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'}`}
                            >
                              <span>{p.isSoldOut ? "품절 상태 해제하기" : "일시 품절 상태로 변경"}</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(p.id)}
                              className="col-span-1 px-2 py-1.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-[10px] text-center font-bold flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>삭제</span>
                            </button>
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="col-span-1 px-2 py-1.5 border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-xl text-[10px] text-center font-bold flex items-center justify-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>변경</span>
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: CLASS IMAGE MANAGEMENT (수강 과목 이미지 관리) */}
      {activeTab === "classes" && (
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-stone-500 font-serif block mb-2">
              🧭 호롱 한복 새활용 원데이 클래스별 매력적인 홍보 마스터 이미지 URL 수정 관리
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => {
              const isEditing = editingClassId === cls.id;
              return (
                <div 
                  key={cls.id}
                  className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <img 
                        src={cls.image} 
                        alt="" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-xs text-stone-50 text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm">
                        {cls.type === "personal" ? "1:1 프라이빗" : cls.type === "group" ? "오픈 그룹" : "외부 출강"}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif font-black text-stone-850 text-sm">
                        {cls.title[lang]}
                      </h4>
                      <p className="text-[10px] text-stone-400 font-mono mt-1">CLASS ID: {cls.id}</p>
                      <p className="text-xs text-stone-550 line-clamp-2 mt-1.5 leading-relaxed">
                        {cls.description[lang]}
                      </p>
                    </div>

                    {isEditing ? (
                      <div className="bg-stone-50 p-3 rounded-xl space-y-2 border border-stone-200/60 animate-fade-in text-xs font-mono text-stone-600">
                        <div className="space-y-1.5 border-b border-stone-200 pb-2 mb-2">
                          <label className="block text-[10px] text-stone-400 font-serif">클래스명 (한글):</label>
                          <input
                            type="text"
                            value={editClassTitleKo}
                            onChange={(e) => setEditClassTitleKo(e.target.value)}
                            className="w-full text-xs font-sans bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-hidden"
                          />
                        </div>
                        <div className="space-y-1.5 border-b border-stone-200 pb-2 mb-2">
                          <label className="block text-[10px] text-stone-400 font-serif">클래스명 (영문):</label>
                          <input
                            type="text"
                            value={editClassTitleEn}
                            onChange={(e) => setEditClassTitleEn(e.target.value)}
                            className="w-full text-xs font-sans bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-hidden"
                          />
                        </div>
                        <div className="space-y-1.5 border-b border-stone-200 pb-2 mb-2">
                          <label className="block text-[10px] text-stone-400 font-serif">설명 (한글):</label>
                          <textarea
                            value={editClassDescriptionKo}
                            onChange={(e) => setEditClassDescriptionKo(e.target.value)}
                            className="w-full text-xs font-sans bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-hidden"
                            rows={2}
                          />
                        </div>
                        <div className="space-y-1.5 border-b border-stone-200 pb-2 mb-2">
                          <label className="block text-[10px] text-stone-400 font-serif">설명 (영문):</label>
                          <textarea
                            value={editClassDescriptionEn}
                            onChange={(e) => setEditClassDescriptionEn(e.target.value)}
                            className="w-full text-xs font-sans bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-hidden"
                            rows={2}
                          />
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <label className="block text-[10px] text-stone-400 font-serif">클래스 이미지 URL 변경:</label>
                          <input
                            type="text"
                            value={editClassImage}
                            onChange={(e) => setEditClassImage(e.target.value)}
                            className="w-full text-[10px] font-mono bg-white border border-stone-200 rounded px-2 py-1.5 focus:outline-hidden"
                            placeholder="https://images.unsplash.com/..."
                          />

                          <div className="flex items-center gap-1.5 pt-0.5">
                            <label className="inline-flex items-center px-2 py-0.5 bg-stone-200 hover:bg-stone-300 active:scale-95 text-stone-800 text-[9px] font-bold rounded cursor-pointer transition-all border border-stone-300">
                              <span>📁 컴퓨터 파일 선택</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    compressImage(file, (base64) => {
                                      setEditClassImage(base64);
                                    });
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            <span className="text-[8px] text-stone-400 font-sans">로컬 이미지 올리기</span>
                          </div>

                          <div className="flex gap-1 flex-wrap pt-1.5">
                            {[
                              { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600", label: "공방원단" },
                              { url: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600", label: "바느질" },
                              { url: "https://images.unsplash.com/photo-1513519107127-1dba3fa7fd5d?auto=format&fit=crop&q=80&w=600", label: "바느질방" },
                              { url: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600", label: "매듭짓기" },
                              { url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=600", label: "파스텔실크" }
                            ].map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setEditClassImage(preset.url)}
                                className={`px-1.5 py-0.5 border text-[9px] rounded-md transition-all ${
                                  editClassImage === preset.url 
                                    ? "bg-amber-800 text-white border-amber-800 font-bold" 
                                    : "bg-white hover:bg-stone-100 text-stone-600 border-stone-200"
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end gap-1.5 font-sans">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setEditingClassId(null)}
                          className="px-3 py-1.5 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-lg text-xs flex-1"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onUpdateClassImage) {
                              onUpdateClassImage(cls.id, editClassImage);
                            }
                            if (onUpdateClassDetails) {
                              onUpdateClassDetails(cls.id, editClassTitleKo, editClassTitleEn, editClassDescriptionKo, editClassDescriptionEn);
                            }
                            setEditingClassId(null);
                            alert("클래스 정보가 수정되었습니다.");
                          }}
                          className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 flex-1"
                        >
                          <Check className="w-3.5 h-3.5" /> 수정 완료
                        </button>
                      </>
                    ) : (
                      <>
                        {deleteClassConfirmId === cls.id ? (
                          <div className="flex gap-1.5 w-full">
                            <button
                              onClick={() => {
                                if (onDeleteClass) onDeleteClass(cls.id);
                                setDeleteClassConfirmId(null);
                              }}
                              className="flex-1 px-3 py-1.5 border border-red-500 bg-red-500 text-white hover:bg-red-600 rounded-lg text-xs text-center font-bold"
                            >
                              삭제 확인
                            </button>
                            <button
                              onClick={() => setDeleteClassConfirmId(null)}
                              className="flex-1 px-3 py-1.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 rounded-lg text-xs text-center font-bold"
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1.5 w-full">
                            <button
                              type="button"
                              onClick={() => setDeleteClassConfirmId(cls.id)}
                              className="flex-1 px-3 py-1.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>삭제</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingClassId(cls.id);
                                setEditClassImage(cls.image);
                                setEditClassTitleKo(cls.title.ko);
                                setEditClassTitleEn(cls.title.en);
                                setEditClassDescriptionKo(cls.description.ko);
                                setEditClassDescriptionEn(cls.description.en);
                              }}
                              className="flex-1 px-3 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>수정</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
