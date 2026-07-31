import { useState, useEffect } from "react";
import { 
  Product, 
  CraftClass, 
  Reservation, 
  Order, 
  CartItem, 
  INITIAL_PRODUCTS, 
  INITIAL_CLASSES, 
  INITIAL_RESERVATIONS, 
  INITIAL_ORDERS 
} from "./types";
import { Language, i18nDictionary } from "./data/i18n";
import { onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { 
  productsCollection, 
  classesCollection, 
  reservationsCollection, 
  ordersCollection, 
  settingsCollection,
  initializeDefaults
} from "./lib/db";

import GNBHeader from "./components/GNBHeader";
import ProductBespoke from "./components/ProductBespoke";
import ClassBooking from "./components/ClassBooking";
import CartAndCheckout from "./components/CartAndCheckout";
import AdminConsole from "./components/AdminConsole";
import DocsCenter from "./components/DocsCenter";
import AuthModal from "./components/AuthModal";
import BrandLogo from "./components/BrandLogo";
import BrandStory from "./components/BrandStory";

import { 
  Heart, 
  ArrowRight, 
  Clock, 
  Users, 
  User as UserIcon, 
  ChevronRight, 
  Sparkles,
  Award,
  Globe2,
  CalendarDays,
  ShoppingBag,
  ExternalLink,
  Send,
  UserCircle,
  Zap,
  Circle
} from "lucide-react";

export default function App() {
  // 1. Core Config / Localisation State
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("horong_lang");
      return (saved as Language) || "ko";
    } catch {
      return "ko";
    }
  });
  const t = i18nDictionary[lang];

  // 2. Active Tab View
  const [activeTab, setActiveTab] = useState<"home" | "brand_story" | "shop" | "class" | "admin" | "docs">("home");

  // 3. User Login SSO Simulated State
  const [user, setUser] = useState<{ loggedIn: boolean; nickname: string; email: string; provider: string } | null>(() => {
    try {
      const saved = localStorage.getItem("horong_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. Products Data
  const [products, setProducts] = useState<Product[]>([]);

  // 5. Classes Data
  const [classes, setClasses] = useState<CraftClass[]>([]);

  // 6. Reservations
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // 7. Orders
  const [orders, setOrders] = useState<Order[]>([]);

  // 8. Selected Bag (Cart)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("horong_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Toggle Cart Drawer / Checkout review view
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // Toggle Auth Modal view
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 9. Interactive Home Product Showcase Selection (inspired by reference image)
  const [showcaseProductId, setShowcaseProductId] = useState("prod-chosun");
  const [showcaseFabric, setShowcaseFabric] = useState<"traditional" | "pastel" | "modern" | "vibrant">("traditional");
  const [showcaseEngraving, setShowcaseEngraving] = useState("");
  const [showcaseWrapping, setShowcaseWrapping] = useState<"none" | "box" | "bojagi">("none");
  const [showcaseQty, setShowcaseQty] = useState(1);

  // Monthly items section title
  const [monthlyItemsTitle, setMonthlyItemsTitle] = useState("MONTHLY ITEMS");

  const handleUpdateMonthlyTitle = async (title: string) => {
    try {
      await setDoc(doc(settingsCollection, "monthlyTitle"), { value: title });
    } catch (e) {
      console.error(e);
    }
  };

  // Synchronizers to localStorage for high-fidelity persistence
  useEffect(() => {
    try { localStorage.setItem("horong_lang", lang); } catch (e) {}
  }, [lang]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("horong_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("horong_user");
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try { localStorage.setItem("horong_cart", JSON.stringify(cartItems)); } catch (e) {}
  }, [cartItems]);

  // Firestore Subscriptions
  useEffect(() => {
    // Initialize defaults if empty
    initializeDefaults(INITIAL_PRODUCTS, INITIAL_CLASSES, INITIAL_RESERVATIONS, INITIAL_ORDERS);

    const unsubProducts = onSnapshot(productsCollection, (snapshot) => {
      const p: Product[] = [];
      snapshot.forEach(doc => p.push(doc.data() as Product));
      setProducts(p);
    });

    const unsubClasses = onSnapshot(classesCollection, (snapshot) => {
      const c: CraftClass[] = [];
      snapshot.forEach(doc => c.push(doc.data() as CraftClass));
      setClasses(c);
    });

    const unsubReservations = onSnapshot(reservationsCollection, (snapshot) => {
      const r: Reservation[] = [];
      snapshot.forEach(doc => r.push(doc.data() as Reservation));
      setReservations(r);
    });

    const unsubOrders = onSnapshot(ordersCollection, (snapshot) => {
      const o: Order[] = [];
      snapshot.forEach(doc => o.push(doc.data() as Order));
      setOrders(o);
    });

    const unsubSettings = onSnapshot(doc(settingsCollection, "monthlyTitle"), (doc) => {
      if (doc.exists()) {
        setMonthlyItemsTitle(doc.data().value);
      }
    });

    return () => {
      unsubProducts();
      unsubClasses();
      unsubReservations();
      unsubOrders();
      unsubSettings();
    };
  }, []);

  // ACTIONS: Multi-view triggers
  const getFabricLabel = (fabric: string) => {
    if (lang === "ko") {
      if (fabric === "traditional") return "전통 비단 (은은한 실크)";
      if (fabric === "pastel") return "파스텔 실크 (차분한 부드러움)";
      if (fabric === "modern") return "모던 린넨 (내추럴)";
      return "오방색 원단 (화사한 전통색)";
    } else if (lang === "ja") {
      if (fabric === "traditional") return "宮廷伝統紋 (艶絹)";
      if (fabric === "pastel") return "パステル細糸 (優しく優美)";
      if (fabric === "modern") return "リネン混紡 (ナチュラル)";
      return "オリエンタル五色 (華やか)";
    } else {
      if (fabric === "traditional") return "Glossy Antique";
      if (fabric === "pastel") return "Soft Pastel";
      if (fabric === "modern") return "Natural Linen";
      return "Vibrant Core";
    }
  };

  const handleLogin = (provider: string, nickname: string, email: string) => {
    setUser({ loggedIn: true, nickname, email, provider });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // If exactly the same item with identical bespoke options exists, increment volume
      const idx = prev.findIndex(
        (item) => 
          item.product.id === newItem.product.id && 
          item.selectedOptions.fabric === newItem.selectedOptions.fabric &&
          item.selectedOptions.engraving === newItem.selectedOptions.engraving &&
          item.selectedOptions.wrapping === newItem.selectedOptions.wrapping
      );

      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Class Reservation triggers
  const handleAddReservation = async (newRes: Reservation) => {
    await setDoc(doc(reservationsCollection, newRes.id), newRes);
  };

  const handleUpdateReservationStatus = async (id: string, status: Reservation["status"]) => {
    await updateDoc(doc(reservationsCollection, id), { status });
  };

  // Product Orders triggers
  const handleAddOrder = async (newOrder: Order) => {
    await setDoc(doc(ordersCollection, newOrder.id), newOrder);
    
    // Deduct stock of corresponding products
    newOrder.items.forEach(async (item) => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        await updateDoc(doc(productsCollection, prod.id), { 
          stock: Math.max(0, prod.stock - item.quantity) 
        });
      }
    });
  };

  const handleUpdateOrderStatus = async (id: string, status: Order["status"]) => {
    await updateDoc(doc(ordersCollection, id), { status });
  };

  // Product Stock tuning (Back-office)
  const handleUpdateProductStock = async (id: string, stock: number, price?: number) => {
    const data: any = { stock };
    if (price !== undefined) data.basePrice = price;
    await updateDoc(doc(productsCollection, id), data);
  };

  const handleUpdateProductDetails = async (id: string, nameKo: string, nameEn: string, descKo?: string, descEn?: string) => {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    await updateDoc(doc(productsCollection, id), {
      name: { ko: nameKo, en: nameEn },
      description: { 
        ko: descKo !== undefined ? descKo : prod.description.ko,
        en: descEn !== undefined ? descEn : prod.description.en 
      }
    });
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteDoc(doc(productsCollection, id));
  };

  const handlePublishNewProduct = async (newProd: Product) => {
    await setDoc(doc(productsCollection, newProd.id), newProd);
  };

  const handleUpdateProductImage = async (id: string, image: string) => {
    await updateDoc(doc(productsCollection, id), { image });
  };

  const handleToggleProductSoldOut = async (id: string, isSoldOut: boolean) => {
    await updateDoc(doc(productsCollection, id), { isSoldOut });
  };

  const handleUpdateClassDetails = async (id: string, titleKo: string, titleEn: string, descriptionKo: string, descriptionEn: string) => {
    const c = classes.find(c => c.id === id);
    if (!c) return;
    await updateDoc(doc(classesCollection, id), {
      title: { ko: titleKo, en: titleEn },
      description: { ko: descriptionKo, en: descriptionEn }
    });
  };

  const handleDeleteClass = async (id: string) => {
    await deleteDoc(doc(classesCollection, id));
  };

  const handleUpdateClassImage = async (id: string, image: string) => {
    await updateDoc(doc(classesCollection, id), { image });
  };

  return (
    <div id="horong-root" className="min-h-screen bg-white text-stone-800 flex flex-col font-sans selection:bg-stone-200 selection:text-stone-900">
      
      <div className="flex-1 bg-white flex flex-col relative w-full mx-auto">
      
      {/* 1. Header (GNB) */}
      <GNBHeader 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        user={user}
        onLogout={handleLogout}
        onOpenCartDrawer={() => {
          setActiveTab("shop"); 
          setShowCartDrawer(true);
        }}
        onOpenLogin={() => setShowLoginModal(true)}
        t={t}
      />

      {/* 2. Main content router depending on activeTab */}
      <main className="flex-1 flex flex-col">
        
        {/* VIEW A.1: BRAND STORY */}
        {activeTab === "brand_story" && (
          <BrandStory lang={lang} />
        )}

        {/* VIEW A: HOME */}
        {activeTab === "home" && (
          <div className="flex flex-col mb-auto w-full">
            
            {/* 1. Hero Image Section */}
            <section className="relative w-full h-[600px] md:h-[700px] flex overflow-hidden">
              <img 
                src="/main_product.jpg" 
                alt="Horong Product"
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col justify-start pointer-events-none">
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans text-stone-900 uppercase tracking-tighter leading-none mb-8 font-light sm:max-w-md pointer-events-auto">
                  NEW<br />COLLECTION
                </h1>
                
                <div className="pointer-events-auto">
                  <button
                    onClick={() => setActiveTab("shop")}
                    className="px-10 py-3 bg-stone-900 text-stone-100 text-xs font-sans uppercase tracking-wider hover:bg-stone-800 transition-colors"
                  >
                    Shop now
                  </button>
                </div>
                
                <div className="hidden md:flex absolute top-20 right-8 md:right-12 pointer-events-auto flex-col items-end">
                   <div className="flex items-start">
                    <span className="text-3xl md:text-5xl font-sans text-stone-900 font-light mr-4 leading-none">25/26</span>
                    <span className="text-xs md:text-sm font-sans tracking-widest text-stone-600 mt-1 uppercase text-right leading-relaxed">
                      Horong Upcycled<br />Heritage Goods
                    </span>
                  </div>
                </div>

              </div>
            </section>

            <div className="w-full bg-white text-stone-900 z-10 -mt-1 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pt-20">
              <div className="max-w-[1600px] mx-auto px-4 md:px-8 w-full">
                
                {/* 2. Product Grid Section (Ready to wear -> Daily Goods) */}
                <section className="pb-12">
                  <div className="flex justify-between items-end mb-10 pb-4">
                    <h2 className="text-2xl md:text-4xl font-sans uppercase tracking-tighter font-light">READY TO UPCYCLE</h2>
                    <button onClick={() => setActiveTab("shop")} className="text-xs font-sans flex items-center hover:text-stone-500 tracking-wide">
                      See more <ArrowRight className="w-3 h-3 ml-2" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(products || []).slice(0, 4).map((product, index) => (
                      <div 
                        key={product?.id || `product-rtw-${index}`} 
                        onClick={() => setActiveTab("shop")}
                        className="group cursor-pointer flex flex-col"
                      >
                         <div className="bg-[#f2f2f2] flex items-center justify-center aspect-[4/5] object-cover mb-4 relative overflow-hidden p-6 md:p-10">
                           <img 
                             src={product?.image || ''} 
                             alt={product?.name?.en || 'Product'} 
                             className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ${product?.isSoldOut ? 'opacity-50 grayscale' : 'group-hover:scale-105'}`}
                           />
                           {product?.isSoldOut && (
                             <div className="absolute inset-0 bg-white/20 flex items-center justify-center backdrop-blur-[1px]">
                               <span className="bg-stone-900 text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase">Sold Out</span>
                             </div>
                           )}
                         </div>
                         
                         <div className="flex flex-col mt-2">
                            <h4 className="font-sans text-[11px] md:text-xs text-stone-900 uppercase tracking-wide line-clamp-1">
                              {lang === "ko" ? product?.name?.ko : product?.name?.en}
                            </h4>
                            <span className="font-sans text-[11px] md:text-xs text-stone-500 mt-1 font-medium block">
                              ₩{(product?.basePrice || 0).toLocaleString()}
                            </span>
                         </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. MVC (Mission, Vision, Core Values) Section */}
                <section className="py-24 border-t border-stone-200">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
                    {/* Mission & Vision */}
                    <div className="w-full md:w-1/2 flex flex-col gap-16">
                      <div>
                        <h3 className="text-xl md:text-2xl font-sans uppercase tracking-widest font-light text-stone-400 mb-6">Mission</h3>
                        <p className="text-lg md:text-xl font-sans font-medium text-stone-900 leading-relaxed break-keep">
                          {lang === "ko" 
                            ? "버려지는 한복을 새활용하여 일상 제품과 체험을 제공하고, 로컬 시니어 재봉사 및 청년 인력에게 협업을, 한복 소상공인에게 경제적 가치 창출에 기여한다." 
                            : "Provide everyday products and experiences by upcycling discarded Hanbok, collaborate with local senior tailors and young talents, and contribute to creating economic value for Hanbok small businesses."}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl md:text-2xl font-sans uppercase tracking-widest font-light text-stone-400 mb-6">Vision</h3>
                        <p className="text-lg md:text-xl font-sans font-medium text-stone-900 leading-relaxed break-keep">
                          {lang === "ko" 
                            ? "한복 업사이클링을 통해 전통을 잇고, 과거의 가치를 현대적으로 재해석하여 소비자들에게 지속 가능한 가치를 전달하는 것." 
                            : "Connect traditions through Hanbok upcycling, reinterpret past values into modern aesthetics, and deliver sustainable value to consumers."}
                        </p>
                      </div>
                    </div>

                    {/* Core Values */}
                    <div className="w-full md:w-1/2 flex flex-col">
                      <h3 className="text-xl md:text-2xl font-sans uppercase tracking-widest font-light text-stone-400 mb-10">Core Values</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        <div className="flex flex-col gap-4">
                          <Send className="w-8 h-8 text-stone-800" strokeWidth={1.5} />
                          <h4 className="text-base font-bold font-sans text-stone-900">
                            {lang === "ko" ? "실행 중심" : "Execution-oriented"}
                          </h4>
                          <p className="text-sm font-sans text-stone-600 leading-relaxed break-keep">
                            {lang === "ko" 
                              ? "완벽보다 실행을 우선시합니다. 빠르게 시도하고 개선합니다." 
                              : "We prioritize execution over perfection. Try fast and improve constantly."}
                          </p>
                        </div>

                        <div className="flex flex-col gap-4">
                          <UserCircle className="w-8 h-8 text-stone-800" strokeWidth={1.5} />
                          <h4 className="text-base font-bold font-sans text-stone-900">
                            {lang === "ko" ? "고객 집착" : "Customer Obsession"}
                          </h4>
                          <p className="text-sm font-sans text-stone-600 leading-relaxed break-keep">
                            {lang === "ko" 
                              ? "고객의 입장에서 생각하고 고객의 기대를 뛰어넘습니다." 
                              : "We think from the customer's perspective and exceed their expectations."}
                          </p>
                        </div>

                        <div className="flex flex-col gap-4">
                          <Zap className="w-8 h-8 text-stone-800" strokeWidth={1.5} />
                          <h4 className="text-base font-bold font-sans text-stone-900">
                            {lang === "ko" ? "주도적 태도" : "Proactive Attitude"}
                          </h4>
                          <p className="text-sm font-sans text-stone-600 leading-relaxed break-keep">
                            {lang === "ko" 
                              ? "문제를 기다리지 않고 먼저 발견하고 해결합니다." 
                              : "We don't wait for problems; we find and solve them first."}
                          </p>
                        </div>

                        <div className="flex flex-col gap-4">
                          <Circle className="w-8 h-8 text-stone-800" strokeWidth={1.5} />
                          <h4 className="text-base font-bold font-sans text-stone-900">
                            {lang === "ko" ? "단순함" : "Simplicity"}
                          </h4>
                          <p className="text-sm font-sans text-stone-600 leading-relaxed break-keep">
                            {lang === "ko" 
                              ? "복잡한 것을 단순하게 만들고, 효율을 우선합니다." 
                              : "We simplify the complex and prioritize efficiency."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Second Product Grid Section (Accessories) */}
                <section className="pt-20 pb-24 border-t border-stone-200">
                  <div className="flex justify-between items-end mb-10 pb-4">
                    <h2 className="text-2xl md:text-4xl font-sans uppercase tracking-tighter font-light">{monthlyItemsTitle}</h2>
                    <button onClick={() => setActiveTab("shop")} className="text-xs font-sans flex items-center hover:text-stone-500 tracking-wide">
                      See more <ArrowRight className="w-3 h-3 ml-2" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(products || []).slice(4, 8).map((product, index) => (
                      <div 
                        key={product?.id || `product-acc-${index}`} 
                        onClick={() => setActiveTab("shop")}
                        className="group cursor-pointer flex flex-col"
                      >
                         <div className="bg-[#f2f2f2] flex items-center justify-center w-full aspect-square mb-4 relative overflow-hidden">
                           <img 
                             src={product?.image || ''} 
                             alt={product?.name?.en || 'Product'} 
                             className={`w-[80%] h-[80%] object-contain mix-blend-multiply transition-transform duration-700 ${product?.isSoldOut ? 'opacity-50 grayscale' : 'group-hover:scale-105'}`}
                           />
                           {product?.isSoldOut && (
                             <div className="absolute inset-0 bg-white/20 flex items-center justify-center backdrop-blur-[1px]">
                               <span className="bg-stone-900 text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase">Sold Out</span>
                             </div>
                           )}
                         </div>
                         
                         <div className="flex flex-col mt-2">
                            <h4 className="font-sans text-[11px] md:text-xs text-stone-900 uppercase tracking-wide line-clamp-1">
                              {lang === "ko" ? product?.name?.ko : product?.name?.en}
                            </h4>
                            <span className="font-sans text-[11px] md:text-xs text-stone-500 mt-1 font-medium block">
                              ₩{(product?.basePrice || 0).toLocaleString()}
                            </span>
                         </div>
                      </div>
                    ))}
                    {/* Fallback if less than 8 products */}
                    {(products?.length || 0) < 5 && (
                      <div className="flex items-center justify-center bg-stone-50 w-full aspect-square">
                         <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">Coming Soon</span>
                      </div>
                    )}
                  </div>
                </section>

              </div>
            </div>
          </div>
        )}

        {/* VIEW B: BESPOKE SHOP */}
        {activeTab === "shop" && (
          <div className="animate-fade-in">
            {showCartDrawer ? (
              <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
                <button
                  type="button"
                  onClick={() => setShowCartDrawer(false)}
                  className="flex items-center gap-1 text-xs text-stone-500 hover:text-amber-800 font-semibold mb-4"
                >
                  ← {lang === "ko" ? "상점 목록 보기" : "Back to catalog shop"}
                </button>
                <CartAndCheckout 
                  cartItems={cartItems}
                  onRemoveItem={handleRemoveCartItem}
                  onClearCart={handleClearCart}
                  onAddOrder={handleAddOrder}
                  user={user}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  lang={lang}
                  t={t}
                />
              </div>
            ) : (
              <ProductBespoke 
                products={products}
                onAddToCart={(item) => {
                  handleAddToCart(item);
                  // Open drawer directly on addition for high-end micro interaction
                  setShowCartDrawer(true);
                }}
                lang={lang}
                t={t}
              />
            )}
          </div>
        )}

        {/* VIEW C: CLASS BOOKING */}
        {activeTab === "class" && (
          <div className="animate-fade-in">
            <ClassBooking 
              classes={classes}
              reservations={reservations}
              onAddReservation={handleAddReservation}
              lang={lang}
              t={t}
            />
          </div>
        )}

        {/* VIEW D: ADMIN STAFF SECTION */}
        {activeTab === "admin" && (
          <div className="animate-fade-in animate-fade-in">
            {user?.email === "horongkor1110" ? (
              <AdminConsole 
                products={products}
                classes={classes}
                reservations={reservations}
                orders={orders}
                onUpdateReservationStatus={handleUpdateReservationStatus}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdateProductStock={handleUpdateProductStock}
                onUpdateProductDetails={handleUpdateProductDetails}
                onDeleteProduct={handleDeleteProduct}
                onAddProduct={handlePublishNewProduct}
                onUpdateProductImage={handleUpdateProductImage}
                onToggleProductSoldOut={handleToggleProductSoldOut}
                onUpdateClassImage={handleUpdateClassImage}
                onUpdateClassDetails={handleUpdateClassDetails}
                onDeleteClass={handleDeleteClass}
                monthlyItemsTitle={monthlyItemsTitle}
                onUpdateMonthlyTitle={handleUpdateMonthlyTitle}
                lang={lang}
                t={t}
              />
            ) : (
              <div id="admin-gate-card" className="max-w-md mx-auto my-16 p-8 bg-stone-50 rounded-3xl border border-stone-200/80 text-center space-y-6 shadow-xs animate-fade-in">
                <div className="w-16 h-16 bg-stone-100/80 text-stone-700 rounded-full flex items-center justify-center text-3xl mx-auto border border-stone-200">
                  🔒
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-lg text-stone-800">
                    {lang === "ko" ? "호롱 스태프 전용 통합 관리 시스템" : "Staff Operations Console"}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    {lang === "ko" 
                      ? "본 구역은 대구 서문시장 호롱잡화점 본교실 및 배송 물류 명사단 전용 백오피스 공간입니다. 권한 확인을 위해 호롱 관리자 계정으로 로그인해 주십시오."
                      : "This area is restricted to Horong staff and seamstresses of Daegu Seomun Market. Please sign in with the administrator account to continue."}
                  </p>
                </div>
                
                <button
                  type="button"
                  id="admin-login-trigger"
                  onClick={() => setShowLoginModal(true)}
                  className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-amber-50 hover:text-white rounded-xl text-xs font-serif font-bold transition-all shadow-sm transform hover:scale-[1.02] active:scale-95"
                >
                  {lang === "ko" ? "호롱 관리자 계정으로 로그인하기" : "Sign In with Admin Account"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW E: SYSTEM SPEC DOCS TAB */}
        {activeTab === "docs" && (
          <div className="animate-fade-in">
            <DocsCenter />
          </div>
        )}

      </main>
      </div>

      {/* 3. Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 md:px-8 border-t border-stone-800 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          
          <div className="md:col-span-4 space-y-3">
            <div className="text-stone-300">
              <BrandLogo className="h-14 md:h-16 w-auto" color="#e5e5d1" lang={lang} />
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              호롱잡화점은 대한민국 대구 서문시장에서 출발하여 버려지는 한복의 오색 비단들을 모아, 중장년 재봉 명사들과 지역 청년들이 함께 따뜻함을 전하는 국내 유일 업사이클 전문 소셜 크래프트 기업입니다.
            </p>
          </div>

          <div className="md:col-span-5 space-y-2 text-stone-500">
            <strong className="text-stone-300 font-medium block">공식 공방 주소 및 안내</strong>
            <div className="leading-relaxed">
              • 대표자: 이민지<br />
              • 주소: 대구광역시 태평로 160 (대구스테이션센터)<br />
              • 사업자등록번호: 165-88-03317<br />
              • 이메일: horonkor1110@naver.com
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <strong className="text-stone-300 font-medium block">Quick Switchers</strong>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLang("ko")}
                className={`px-3 py-1 bg-stone-800 border rounded-sm text-[10px] uppercase font-mono ${
                  lang === "ko" ? "border-amber-500 text-white" : "border-stone-700 text-stone-500 hover:text-stone-300"
                }`}
              >
                한국어
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 bg-stone-800 border rounded-sm text-[10px] uppercase font-mono ${
                  lang === "en" ? "border-amber-500 text-white" : "border-stone-700 text-stone-500 hover:text-stone-300"
                }`}
              >
                English
              </button>
            </div>
            <p className="text-[9px] text-stone-600 block pt-1">
              ※ 호롱잡화점의 모든 제품은 수작업 100% 한정수량 제작됩니다.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-stone-800/80 text-center text-stone-600 text-[10px] uppercase tracking-widest font-mono">
          ⓒ 2026 HORONG GENERAL STORE ARTISAN COOPERATIVE. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* Global Interactive Auth Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        lang={lang}
        onLoginSuccess={(nickname, email, provider) => {
          handleLogin(provider, nickname, email);
        }}
      />

    </div>
  );
}
