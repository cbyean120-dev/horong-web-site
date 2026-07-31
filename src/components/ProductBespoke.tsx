import { useState } from "react";
import { Product, BespokeOption, CartItem } from "../types";
import { Language, TranslationDictionary } from "../data/i18n";
import { 
  ShoppingBag, 
  Sparkles, 
  CornerDownRight, 
  Check, 
  HelpCircle,
  FileText,
  BadgeAlert,
  SlidersHorizontal,
  Plus,
  Minus
} from "lucide-react";

interface ProductBespokeProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  lang: Language;
  t: TranslationDictionary;
}

export default function ProductBespoke({
  products,
  onAddToCart,
  lang,
  t,
}: ProductBespokeProps) {
  // Category Filtering
  const [selectedCategory, setSelectedCategory] = useState<"all" | "bag" | "accessory" | "object">("all");
  
  // Customizing Modal / Workspace
  const [activeBespokeProduct, setActiveBespokeProduct] = useState<Product | null>(null);
  
  // Bespoke Options state
  const [selectedFabric, setSelectedFabric] = useState<BespokeOption["fabric"]>("traditional");
  const [engravingText, setEngravingText] = useState("");
  const [selectedWrapping, setSelectedWrapping] = useState<BespokeOption["wrapping"]>("none");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // Filter products
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Calculate Extra Option Fees
  const getWrappingPrice = (wrap: BespokeOption["wrapping"]) => {
    if (wrap === "box") return 1000;
    if (wrap === "bojagi") return 3000;
    return 0;
  };

  const getBespokeTotalPrice = (product: Product) => {
    const wrapPrice = getWrappingPrice(selectedWrapping);
    return (product.basePrice + wrapPrice) * quantity;
  };

  const handleOpenBespoke = (product: Product) => {
    setActiveBespokeProduct(product);
    // Reset options
    setSelectedFabric("traditional");
    setEngravingText("");
    setSelectedWrapping("none");
    setQuantity(1);
  };

  const handleConfirmAdd = () => {
    if (!activeBespokeProduct) return;

    const cartItemId = `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newCartItem: CartItem = {
      cartId: cartItemId,
      product: activeBespokeProduct,
      selectedOptions: {
        fabric: selectedFabric,
        engraving: engravingText.trim() || "-",
        wrapping: selectedWrapping,
      },
      quantity: quantity,
    };

    onAddToCart(newCartItem);
    
    // Quick success toast animation
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setActiveBespokeProduct(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      
      {/* Category selector / tab row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border-b border-stone-200 pb-5">
        <div className="flex items-center gap-1 text-stone-800 font-serif font-bold text-lg md:text-xl">
          <SlidersHorizontal className="w-4 h-4 text-amber-800" />
          <span>{lang === "ko" ? "호롱 한복 새활용 상점" : "Horong Hanbok Shop"}</span>
        </div>

        {/* LNB Cats */}
        <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          {[
            { id: "all", label: t.allCategory },
            { id: "bag", label: t.catBag },
            { id: "accessory", label: t.catAccessory },
            { id: "object", label: t.catObject },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-amber-800 text-white shadow-sm font-semibold"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => {
          const isSoldOut = p.stock <= 0 || p.isSoldOut;
          return (
            <div 
              key={p.id}
              onClick={() => handleOpenBespoke(p)}
              className="cursor-pointer group bg-white rounded-3xl border border-stone-200/60 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-900/10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Cover image */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img 
                  src={p.image} 
                  alt={p.name[lang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Customizer badge */}
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-amber-900 text-[9px] px-2 py-1 rounded-full font-serif font-bold flex items-center gap-1 shadow-sm border border-amber-900/10">
                  <Sparkles className="w-2.5 h-2.5 text-amber-700 animate-pulse" /> BESPOKE
                </span>

                {isSoldOut && (
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs py-2 text-center font-bold">
                    {t.outOfStock}
                  </div>
                )}
              </div>

              {/* Product description area */}
              <div className="p-4 flex-1 flex flex-col">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] text-stone-400 capitalize font-mono block">
                      {p.category === "bag" ? t.catBag : p.category === "accessory" ? t.catAccessory : t.catObject}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-stone-800 font-serif font-semibold line-clamp-1 group-hover:text-amber-800 transition-colors">
                    {p.name[lang]}
                  </h3>
                  
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                    {p.description[lang]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SmartStore Link */}
      <div className="flex justify-end mt-12">
        <a
          href="https://smartstore.naver.com/mivvvne"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#03C75A] hover:bg-[#03C75A]/90 text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{lang === "ko" ? "상품 구매하러 가기" : "Go to SmartStore"}</span>
        </a>
      </div>

      {/* BESPOKE PANELS: FLOATING DRAWER / MODAL */}
      {activeBespokeProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white max-w-2xl w-full rounded-3xl border border-stone-100 shadow-xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Visual Cover in panel (md:w-5/12) */}
            <div className="md:w-5/12 bg-stone-100 relative max-h-[240px] md:max-h-full">
              <img 
                src={activeBespokeProduct.image} 
                alt={activeBespokeProduct.name[lang]} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/80 via-black/35 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] text-amber-300 font-serif uppercase tracking-widest block font-bold mb-1">
                  100% Upcycled Craft
                </span>
                <h4 className="text-white text-base font-serif font-bold leading-snug">
                  {activeBespokeProduct.name[lang]}
                </h4>
              </div>
            </div>

            {/* Product details workspace (md:w-7/12) */}
            <div className="md:w-7/12 p-6 flex flex-col justify-between overflow-y-auto">
              
              {/* Header inside modal */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-stone-800 text-xs font-serif font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  {lang === "ko" ? "제품 상세 정보" : "Product Details"}
                </span>
                <button 
                  onClick={() => setActiveBespokeProduct(null)}
                  className="text-stone-400 hover:text-stone-700 text-sm p-1 rounded-lg hover:bg-stone-100 font-mono"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 py-6 text-stone-700 text-sm leading-relaxed">
                <p>
                  {activeBespokeProduct.description[lang]}
                </p>

                {activeBespokeProduct.details && (
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2">
                    <h5 className="text-[10px] uppercase font-mono text-stone-500 font-bold tracking-wider">
                      {lang === "ko" ? "제품 상세 구성" : "Product Specs"}
                    </h5>
                    <p className="text-xs text-stone-600">
                      {activeBespokeProduct.details[lang]}
                    </p>
                  </div>
                )}
              </div>

              {/* Add action */}
              <div className="pt-4 border-t border-stone-100 flex gap-3">
                <a
                  href="https://smartstore.naver.com/mivvvne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#03C75A] hover:bg-[#03C75A]/90 text-white font-serif font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {lang === "ko" ? "네이버 스마트스토어에서 구매하기" : "Buy on Naver SmartStore"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
