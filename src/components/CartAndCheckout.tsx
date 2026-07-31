import React, { useState } from "react";
import { CartItem, Order, BespokeOption } from "../types";
import { Language, TranslationDictionary } from "../data/i18n";
import { 
  ShoppingBag, 
  Trash2, 
  Check, 
  ArrowRight, 
  Compass, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Lock,
  User,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface CartAndCheckoutProps {
  cartItems: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
  user: { loggedIn: boolean; nickname: string; email: string; provider: string } | null;
  onLogin: (provider: string, nickname: string, email: string) => void;
  onLogout: () => void;
  lang: Language;
  t: TranslationDictionary;
}

export default function CartAndCheckout({
  cartItems,
  onRemoveItem,
  onClearCart,
  onAddOrder,
  user,
  onLogin,
  onLogout,
  lang,
  t,
}: CartAndCheckoutProps) {
  // Navigation states inside cart view
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  
  // Checkout inputs
  const [userName, setUserName] = useState(user?.nickname || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [userPhone, setUserPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  
  const [recentOrderId, setRecentOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const getWrappingPrice = (wrap: BespokeOption["wrapping"]) => {
    if (wrap === "box") return 1000;
    if (wrap === "bojagi") return 3000;
    return 0;
  };

  const getCartTotals = () => {
    return cartItems.reduce((sum, item) => {
      const wrapPrice = getWrappingPrice(item.selectedOptions.wrapping);
      return sum + (item.product.basePrice + wrapPrice) * item.quantity;
    }, 0);
  };

  const totals = getCartTotals();

  // Handle SSO Mock Trigger
  const handleSSOLogin = (provider: string) => {
    if (provider === "kakao") {
      onLogin("kakao", "한복사랑 홍길동", "gildong@kakao.com");
      setUserName("한복사랑 홍길동");
      setUserEmail("gildong@kakao.com");
    } else if (provider === "google") {
      onLogin("google", "Alex Kim (Global)", "alex.kim@gmail.com");
      setUserName("Alex Kim (Global)");
      setUserEmail("alex.kim@gmail.com");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!userName.trim()) {
      setErrorMsg(lang === "ko" ? "성함을 입력해 주세요." : "Please enter your name.");
      return;
    }
    if (!userPhone.trim()) {
      setErrorMsg(lang === "ko" ? "연락처를 입력해 주세요." : "Please enter your phone number.");
      return;
    }
    if (!address.trim()) {
      setErrorMsg(lang === "ko" ? "배송 주소를 입력해 주세요." : "Please write a delivery address.");
      return;
    }

    setIsPaying(true);

    // Simulate merchant terminal delay
    setTimeout(() => {
      const newOrderId = "ord-" + Math.floor(Math.random() * 9000 + 1000);
      
      const newOrder: Order = {
        id: newOrderId,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          options: item.selectedOptions,
          itemTotal: (item.product.basePrice + getWrappingPrice(item.selectedOptions.wrapping)) * item.quantity,
        })),
        totalAmount: totals,
        userName,
        userEmail: userEmail || "guest@checkout.com",
        userPhone,
        address,
        status: "completed", // Starts completed as requested in Order Management back-office
        createdAt: new Date().toISOString().substring(0, 16).replace("T", " "),
      };

      onAddOrder(newOrder);
      setRecentOrderId(newOrderId);
      setIsPaying(false);
      setStep("success");
      onClearCart();
      // clean form
      setAddress("");
      setUserPhone("");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      
      {/* Checkout progress badge steps bar */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 text-[11px] font-medium text-stone-400 font-mono">
        <span className={`px-2 py-1 rounded-sm ${step === "cart" ? "text-amber-800 font-bold bg-amber-50" : "text-stone-600"}`}>
          01 BAG {lang === "ko" ? "장바구니" : ""}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className={`px-2 py-1 rounded-sm ${step === "checkout" ? "text-amber-800 font-bold bg-amber-50" : ""}`}>
          02 ORDER {lang === "ko" ? "주문결제" : ""}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className={`px-2 py-1 rounded-sm ${step === "success" ? "text-amber-800 font-bold bg-amber-50" : ""}`}>
          03 COMPLETE {lang === "ko" ? "완료" : ""}
        </span>
      </div>

      {step === "cart" && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-stone-800 font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800" />
            {t.cartTitle} ({cartItems.length})
          </h2>

          {cartItems.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-stone-200/60 shadow-xs flex flex-col justify-center items-center py-20">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-700/60 mb-4 text-2xl">
                🏺
              </div>
              <p className="text-stone-500 font-serif text-sm">
                {t.cartEmpty}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product list items (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-4">
                {cartItems.map((item) => {
                  const wrapCost = getWrappingPrice(item.selectedOptions.wrapping);
                  const singleBespokePrice = item.product.basePrice + wrapCost;

                  return (
                    <div 
                      key={item.cartId}
                      className="bg-white p-4 rounded-2xl border border-stone-200/60 shadow-xs flex gap-4 hover:border-amber-900/10 transition-colors"
                    >
                      <img 
                        src={item.product.image} 
                        alt={item.product.name[lang]} 
                        className="w-16 h-20 md:w-20 md:h-24 object-cover rounded-xl bg-stone-100 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-xs md:text-sm font-bold text-stone-800 font-serif">
                              {item.product.name[lang]}
                            </h3>
                            <button
                              onClick={() => onRemoveItem(item.cartId)}
                              className="text-stone-300 hover:text-red-600 transition-colors"
                              title="보따리 비우기"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Bespoke selected detail blocks */}
                          <div className="bg-stone-50 p-2 rounded-lg mt-2 text-[10px] text-stone-500 space-y-1 font-mono leading-relaxed border border-stone-100">
                            <div>
                              • <b className="text-stone-700">{t.customFabric}:</b>{" "}
                              {item.selectedOptions.fabric === "traditional" ? t.fabricTraditional
                                : item.selectedOptions.fabric === "pastel" ? t.fabricPastel
                                : item.selectedOptions.fabric === "modern" ? t.fabricModern
                                : t.fabricVibrant}
                            </div>
                            <div>
                              • <b className="text-stone-700">{lang === "ko" ? "각인 이니셜 부각" : "Engraved text"}:</b>{" "}
                              <span className="text-amber-800 font-medium">"{item.selectedOptions.engraving || "-"}"</span>
                            </div>
                            <div>
                              • <b className="text-stone-700">{t.customWrapping}:</b>{" "}
                              {item.selectedOptions.wrapping === "none" ? t.wrappingNone
                                : item.selectedOptions.wrapping === "box" ? t.wrappingBox
                                : t.wrappingBojagi}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono mt-3 pt-2 border-t border-stone-100/60">
                          <span className="text-stone-400">
                            ₩{singleBespokePrice.toLocaleString()} × {item.quantity}{t.pieceCount}
                          </span>
                          <span className="font-bold text-stone-800">
                            ₩{(singleBespokePrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bill totals and checkout step action (lg:col-span-4) */}
              <div className="lg:col-span-4 bg-amber-50/40 p-6 rounded-3xl border border-amber-900/5 space-y-4">
                <span className="text-[10px] font-bold text-stone-400 tracking-wider font-mono block uppercase">
                  BILLING SUMMARY
                </span>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>{lang === "ko" ? "원단 공예품 기본가" : "Items Base Price"}</span>
                    <span className="font-mono">
                      ₩{cartItems.reduce((acc, current) => acc + (current.product.basePrice * current.quantity), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "ko" ? "맞춤 보자기/옵션 포증" : "Wrapping Extras"}</span>
                    <span className="font-mono text-amber-800">
                      +₩{cartItems.reduce((acc, current) => acc + (getWrappingPrice(current.selectedOptions.wrapping) * current.quantity), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "ko" ? "기본 마감 및 배송료" : "Shipping"}</span>
                    <span className="text-emerald-700 font-semibold">{lang === "ko" ? "무료배송" : "Free Delivery"}</span>
                  </div>
                  
                  <div className="border-t border-stone-200/80 pt-3 flex justify-between font-serif text-sm font-bold text-stone-800">
                    <span>{t.priceTotal}</span>
                    <span className="font-mono text-lg text-amber-900">₩{totals.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("checkout")}
                  className="w-full relative group bg-stone-800 hover:bg-amber-800 text-white font-serif font-bold text-xs py-3 px-4 rounded-xl transition-all duration-300 shadow-sm overflow-hidden flex items-center justify-center gap-1.5"
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {t.checkoutBtn} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="absolute inset-0 w-full h-full bg-amber-950 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {step === "checkout" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Billing Inputs & SSO helper (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-stone-800 font-serif pb-2 border-b border-stone-100">
              {t.checkoutTitle}
            </h3>

            {/* requirement 3: 간편 계정 연동: 카카오톡 및 구글 소셜 로그인 연동 */}
            {!user ? (
              <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-xs space-y-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-mono font-bold">SSO EASY LOGIN</span>
                  <span className="text-[11px] text-stone-500 font-medium">{t.socialLoginTitle}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSSOLogin("kakao")}
                    className="flex items-center justify-center gap-2 p-2.5 bg-[#FEE500] hover:bg-[#FEE500]/95 text-stone-800 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    <span className="text-sm">💬</span> {t.socialKakao}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSSOLogin("google")}
                    className="flex items-center justify-center gap-2 p-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.67 14.98 1 12 1 7.35 1 3.37 3.65 1.42 7.5l3.79 2.94C6.11 7.22 8.84 5.04 12 5.04z" />
                      <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.46c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.56z" />
                      <path fill="#FBBC05" d="M5.21 10.44C4.97 11.23 4.84 12.07 4.84 12.92s.13 1.69.37 2.48l-3.79 2.94C.56 16.51 0 14.77 0 12.92s.56-3.59 1.42-5.42l3.79 2.94z" />
                      <path fill="#34A853" d="M12 22.92c3.24 0 5.97-1.08 7.96-2.92l-3.7-2.87c-1.03.69-2.34 1.1-4.26 1.1-3.16 0-5.89-2.18-6.79-5.4l-3.79 2.94C3.37 19.27 7.35 22.92 12 22.92z" />
                    </svg>
                    {t.socialGoogle}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50/30 p-4 rounded-2xl border border-amber-900/5 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-800 text-amber-50 flex items-center justify-center font-bold text-sm">
                    {user.nickname[0]}
                  </div>
                  <div>
                    <div className="font-bold text-stone-800">
                      {user.nickname} <span className="font-mono text-[9px] font-normal text-amber-800 uppercase px-1.5 py-0.2 bg-amber-100 rounded-sm">{user.provider} linked</span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono">{user.email}</div>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-[10px] font-bold text-stone-400 hover:text-amber-800 hover:underline"
                >
                  {t.logout}
                </button>
              </div>
            )}

            {/* Document Checkout Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 tracking-wider block mb-1 uppercase">
                    {t.formName} *
                  </label>
                  <input
                    required
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full text-xs border border-stone-200 bg-stone-50/50 rounded-lg px-3 py-2 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-800 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 tracking-wider block mb-1 uppercase">
                    {t.formPhone} *
                  </label>
                  <input
                    required
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full text-xs border border-stone-200 bg-stone-50/50 rounded-lg px-3 py-2 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 tracking-wider block mb-1 uppercase">
                  {t.formEmail}
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full text-xs border border-stone-200 bg-stone-50/50 rounded-lg px-3 py-2 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-800 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 tracking-wider block mb-1 uppercase">
                  {t.formAddress} *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="대구광역시 중구 서문시장 또는 자택 배송 주소"
                  className="w-full text-xs border border-stone-200 bg-stone-50/50 rounded-lg px-3 py-2 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-800 focus:bg-white"
                />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-1 p-2 bg-red-50 text-red-800 rounded-lg text-[10px]">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-[10px] text-stone-400 leading-relaxed flex items-start gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>호롱잡화점은 한국PG 보안 심사를 필한 가상 빌링 시스템으로, 안전하고 기밀하게 직조 주문을 전송합니다.</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="w-1/3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs py-3 font-serif font-semibold transition-colors"
                >
                  {lang === "ko" ? "뒤로가기" : "Back to Bag"}
                </button>
                <button
                  type="submit"
                  disabled={isPaying}
                  className="w-2/3 bg-amber-800 hover:bg-amber-900 font-serif font-bold text-xs text-white rounded-xl py-3 shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isPaying ? (
                    <span className="flex items-center gap-1">
                      <span className="animate-spin text-xs">⏳</span> {lang === "ko" ? "결제 처리 중..." : "Processing..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> {t.btnPay}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Items Review (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-stone-50/60 p-6 rounded-3xl border border-stone-200/60 space-y-4">
            <span className="text-[10px] font-bold text-stone-400 tracking-wider font-mono block uppercase">
              REVIEWS BUNDLE
            </span>

            <div className="max-h-60 overflow-y-auto space-y-3 pb-3 border-b border-stone-200">
              {cartItems.map((item) => {
                const singlePrice = item.product.basePrice + getWrappingPrice(item.selectedOptions.wrapping);
                return (
                  <div key={item.cartId} className="flex gap-2 text-xs">
                    <img 
                      src={item.product.image} 
                      alt="" 
                      className="w-10 h-12 object-cover rounded-md flex-shrink-0 bg-stone-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-stone-800 font-serif truncate">
                        {item.product.name[lang]}
                      </h4>
                      <div className="text-[9px] text-stone-400 text-slate-500 font-mono mt-0.5 truncate">
                        {t.customFabric}: {item.selectedOptions.fabric} / 각인: "{item.selectedOptions.engraving}"
                      </div>
                      <div className="text-[10px] text-stone-500 font-mono mt-1">
                        ₩{singlePrice.toLocaleString()} × {item.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between font-serif font-bold text-stone-800 text-sm">
              <span>{t.priceTotal}</span>
              <span className="font-mono text-base text-amber-900">
                ₩{totals.toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      )}

      {step === "success" && (
        <div className="bg-white p-8 md:p-12 text-center rounded-3xl border border-stone-200/60 shadow-md max-w-xl mx-auto py-16">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <h2 className="text-xl md:text-2xl font-serif text-stone-800 font-bold mb-3">
            {t.paySuccess}
          </h2>
          <p className="text-stone-500 text-xs md:text-sm leading-relaxed mb-6">
            {t.paySuccessSub}
          </p>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left font-mono text-xs text-stone-600 space-y-1.5 mb-8">
            <div>• <b className="text-stone-800">ORDER NO:</b> {recentOrderId}</div>
            <div>• <b className="text-stone-800">TOTAL AMOUNT:</b> ₩{totals.toLocaleString()}</div>
            <div>• <b className="text-stone-800">RECIPIENT:</b> {userName} ({userPhone})</div>
            <div>• <b className="text-stone-800">STATUS:</b> <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-bold">결제완료 (completed)</span></div>
          </div>

          <button
            onClick={() => setStep("cart")}
            className="w-full bg-stone-800 hover:bg-stone-900 text-white font-serif font-bold text-xs py-3 rounded-xl transition-all"
          >
            {lang === "ko" ? "상점으로 돌아가기" : "Back to Catalog"}
          </button>
        </div>
      )}

    </div>
  );
}
