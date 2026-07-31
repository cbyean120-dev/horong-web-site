import { Dispatch, SetStateAction } from "react";
import { Language, TranslationDictionary } from "../data/i18n";
import BrandLogo from "./BrandLogo";
import { 
  ShoppingBag, 
  Menu, 
  User, 
  FileText, 
  Globe2,
  Calendar,
  Layers,
  Heart,
  Award
} from "lucide-react";

interface GNBHeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: "home" | "brand_story" | "shop" | "class" | "admin" | "docs";
  setActiveTab: Dispatch<SetStateAction<"home" | "brand_story" | "shop" | "class" | "admin" | "docs">>;
  cartCount: number;
  user: { loggedIn: boolean; nickname: string; email: string; provider: string } | null;
  onLogout: () => void;
  onOpenCartDrawer: () => void;
  onOpenLogin: () => void;
  t: TranslationDictionary;
}

export default function GNBHeader({
  lang,
  setLang,
  activeTab,
  setActiveTab,
  cartCount,
  user,
  onLogout,
  onOpenCartDrawer,
  onOpenLogin,
  t,
}: GNBHeaderProps) {
  
  const isAdmin = user?.email === "horongkor1110";

  return (
    <header className="sticky top-0 z-40 bg-white transition-all duration-300">
      {/* Top Beige Banner */}
      <div className="bg-[#DCD9D0] text-stone-800 text-[9px] sm:text-[10px] md:text-xs text-center py-2 px-4 uppercase tracking-wider font-sans font-medium">
        {lang === "ko" ? "호롱 인스타그램 팔로우 시 5% 할인" : "5% discount when following Horong Instagram"}
      </div>

      <div className="border-b border-stone-200">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-14 md:h-16 flex justify-between items-center lg:grid lg:grid-cols-3">
          
          {/* Left: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 justify-start">
            {[
              { id: "home", label: t.tabHome },
              { id: "brand_story", label: t.tabBrandStory },
              { id: "shop", label: t.tabShop },
              { id: "class", label: t.tabClass },
              ...(isAdmin ? [
                { id: "admin", label: t.tabAdmin },
                { id: "docs", label: t.tabDocs }
              ] : []),
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`whitespace-nowrap text-[11px] md:text-xs font-sans tracking-wide uppercase transition-colors ${
                    isActive ? "text-stone-900 font-semibold" : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Center: Brand Logo */}
          <div className="flex lg:justify-center items-center h-full">
            <button
              onClick={() => setActiveTab("home")}
              className="focus:outline-hidden transition-transform hover:scale-[0.98] active:scale-[0.95]"
            >
              <span className="font-logo text-base md:text-2xl font-bold tracking-widest uppercase">
                HORONG
              </span>
            </button>
          </div>

          {/* Right Corner Utilities Widget */}
          <div className="flex items-center gap-3 lg:gap-4 justify-end">
            
            {/* Language Dropdown */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="text-[10px] sm:text-[11px] bg-transparent border-none py-1 focus:outline-hidden text-stone-600 hover:text-stone-900 cursor-pointer uppercase tracking-widest hidden sm:block font-sans"
            >
              <option value="ko">KO</option>
              <option value="en">EN</option>
            </select>

            {/* User Login/Logout */}
            <div className="flex items-center">
              {user ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-stone-600 hover:text-stone-900 p-1"
                  title="Logout"
                >
                  <User className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="text-stone-600 hover:text-stone-900 p-1"
                >
                  <User className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Cart Bag Trigger */}
            <button
              onClick={onOpenCartDrawer}
              className="text-stone-600 hover:text-stone-900 p-1 relative"
              title="장바구니 보기"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-stone-900 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button className="hidden sm:block text-stone-600 hover:text-stone-900 p-1">
              <Heart className="w-4 h-4" />
            </button>

            {/* Mobile Nav dropdown */}
            <div className="block lg:hidden ml-2">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
                className="text-[10px] font-sans uppercase bg-stone-100 text-stone-800 rounded px-2 py-1 border-none focus:outline-hidden"
              >
                <option value="home">{t.tabHome}</option>
                <option value="brand_story">{t.tabBrandStory}</option>
                <option value="shop">{t.tabShop}</option>
                <option value="class">{t.tabClass}</option>
                {isAdmin && (
                  <>
                    <option value="admin">{t.tabAdmin}</option>
                    <option value="docs">{t.tabDocs}</option>
                  </>
                )}
              </select>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
