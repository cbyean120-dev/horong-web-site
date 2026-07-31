import { useState, FormEvent } from "react";
import { X, Sparkles, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Language } from "../data/i18n";
import BrandLogo from "./BrandLogo";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (nickname: string, email: string, provider: string) => void;
}

export default function AuthModal({ isOpen, onClose, lang, onLoginSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Error/Success Notification states
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  if (!isOpen) return null;

  // Simple feedback message utility
  const triggerFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  // 1. Classic Login Process
  const handleEmailLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      const msg = lang === "ko" 
        ? "이메일 주소와 비밀번호를 모두 입력해 주세요." 
        : "Please fill in all email and password fields.";
      triggerFeedback("error", msg);
      return;
    }

    if (loginPassword.length < 4) {
      const msg = lang === "ko" 
        ? "보안을 위해 비밀번호는 4자리 이상이어야 합니다." 
        : "Password must be at least 4 characters.";
      triggerFeedback("error", msg);
      return;
    }

    // Dynamic mock credentials fetch/simulation
    let accounts = [];
    try {
      const storedUsers = localStorage.getItem("horong_mock_accounts");
      accounts = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(accounts)) accounts = [];
    } catch {
      accounts = [];
    }
    
    const matched = accounts.find((u: any) => u.email === loginEmail && u.password === loginPassword);
    
    if (matched) {
      const successMsg = lang === "ko"
        ? `어서 오세요, ${matched.name}님! 전통 가치 호롱에 오신 것을 환영합니다.`
        : `Welcome back, ${matched.name}!`;

      triggerFeedback("success", successMsg);
      setTimeout(() => {
        onLoginSuccess(matched.name, matched.email, "email");
        onClose();
      }, 1000);
    } else {
      // Default fallback account for convenience
      const defaultUsers = [
        { email: "guest@horong.com", password: "guest", name: "홍길동" },
        { email: "user@horong.com", password: "user123", name: "호롱누리" },
        { email: "horongkor1110", password: "Horongkor1110@", name: "총괄관리자" }
      ];
      const defaultMatched = defaultUsers.find(u => u.email === loginEmail && u.password === loginPassword);

      if (defaultMatched) {
        triggerFeedback("success", lang === "ko" ? `${defaultMatched.name}님으로 로그인되었습니다.` : `Signed in as ${defaultMatched.name}`);
        setTimeout(() => {
          onLoginSuccess(defaultMatched.name, defaultMatched.email, "email");
          onClose();
        }, 1000);
      } else {
        const errorMsg = lang === "ko"
          ? "가입 정보가 없거나 아이디/비밀번호가 다릅니다."
          : "Invalid account or incorrect password.";
        triggerFeedback("error", errorMsg);
      }
    }
  };

  // 2. Class Registration Process
  const handleEmailSignup = (e: FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword || !confirmPassword) {
      const msg = lang === "ko" ? "모든 필수 입력 정보들을 채워 주세요." : "Please fill in all required fields.";
      triggerFeedback("error", msg);
      return;
    }

    if (signupPassword !== confirmPassword) {
      const msg = lang === "ko" ? "비밀번호와 비밀번호 확인이 서로 일치하지 않습니다." : "Passwords do not match.";
      triggerFeedback("error", msg);
      return;
    }

    if (!agreeTerms) {
      const msg = lang === "ko" ? "개인정보 수집 및 새활용 서비스 이용약관에 동의해 주세요." : "Please agree to the privacy policy.";
      triggerFeedback("error", msg);
      return;
    }

    // Save and simulate account
    let accounts = [];
    try {
      const storedUsers = localStorage.getItem("horong_mock_accounts");
      accounts = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(accounts)) accounts = [];
    } catch {
      accounts = [];
    }

    if (accounts.some((u: any) => u.email === signupEmail)) {
      const msg = lang === "ko" ? "이미 가입되어 있는 이메일 주소입니다." : "Email is already registered.";
      triggerFeedback("error", msg);
      return;
    }

    const newAccount = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      date: new Date().toISOString()
    };

    accounts.push(newAccount);
    try {
      localStorage.setItem("horong_mock_accounts", JSON.stringify(accounts));
    } catch (e) {}

    const okMsg = lang === "ko"
      ? "축하합니다! 회원가입이 안전하게 처리되었습니다. 바로 로그인하세요."
      : "Registration completed successfully! Please login now.";

    triggerFeedback("success", okMsg);

    // Swap to login screen after 1.5 seconds and pre-fill email
    setTimeout(() => {
      setLoginEmail(signupEmail);
      setLoginPassword(signupPassword);
      setMode("login");
    }, 1500);
  };

  return (
    <div id="auth-modal-screen" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      
      {/* Container Card */}
      <div className="bg-amber-50 rounded-[32px] w-full max-w-md border border-stone-200/80 shadow-2xl overflow-hidden relative font-sans flex flex-col max-h-[90vh] animate-scale-up">
        
        {/* Header Ribbon with Brand color */}
        <div className="bg-stone-100 px-6 py-5 border-b border-stone-200/60 flex items-center justify-between">
          <BrandLogo className="h-10 md:h-10 w-auto" lang={lang} />
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-500 transition-colors shadow-xs"
            title="창 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Notification Alert overlay */}
          {feedback && (
            <div className={`p-3.5 rounded-2xl flex items-start gap-2.5 text-xs font-serif shadow-xs ${
              feedback.type === "success" 
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60" 
                : "bg-red-50 text-red-800 border border-red-200/60"
            }`}>
              {feedback.type === "success" ? (
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <span className="leading-relaxed font-semibold">{feedback.message}</span>
            </div>
          )}

          {/* Form Switch selection header */}
          <div className="grid grid-cols-2 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
            <button
              type="button"
              onClick={() => { setMode("login"); setFeedback(null); }}
              className={`py-2 rounded-lg font-bold font-serif transition-all ${
                mode === "login" 
                  ? "bg-white text-stone-800 shadow-sm" 
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {lang === "ko" ? "기존 회원 로그인" : "Sign In"}
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setFeedback(null); }}
              className={`py-2 rounded-lg font-bold font-serif transition-all ${
                mode === "signup" 
                  ? "bg-white text-stone-800 shadow-sm" 
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {lang === "ko" ? "새로운 회원가입" : "Sign Up"}
            </button>
          </div>

          {/* Form Content: A) Login */}
          {mode === "login" ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-3">
                
                <div>
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">
                    {lang === "ko" ? "로그인 아이디 / 이메일" : "ID / Email Address"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "ko" ? "아이디 또는 이메일 입력" : "Enter ID or Email"}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs font-mono border border-stone-200 rounded-xl px-3 py-2.5 bg-white focus:outline-hidden focus:border-stone-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">
                    {lang === "ko" ? "비밀번호" : "Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      placeholder="guest"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full text-xs font-mono border border-stone-200 rounded-xl px-3 py-2.5 bg-white focus:outline-hidden focus:border-stone-500 pr-10 shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-750"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-serif font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>{lang === "ko" ? "호롱 계정으로 안전하게 로그인" : "Secure Login"}</span>
              </button>
            </form>
          ) : (
            
            /* Form Content: B) Register */
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-3">
                
                <div>
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">
                    {lang === "ko" ? "닉네임 / 성함" : "Your Name / Nickname"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "ko" ? "예시: 김희원" : "e.g., Jane Doe"}
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="w-full text-xs font-sans border border-stone-200 rounded-xl px-3 py-2.5 bg-white focus:outline-hidden focus:border-stone-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">
                    {lang === "ko" ? "이메일 주소" : "Sign Up Email"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@domain.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full text-xs font-mono border border-stone-200 rounded-xl px-3 py-2.5 bg-white focus:outline-hidden focus:border-stone-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">
                    {lang === "ko" ? "새 비밀번호 (4자 이상)" : "Password (min 4 characters)"}
                  </label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      required
                      placeholder="••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full text-xs font-mono border border-stone-200 rounded-xl px-3 py-2.5 bg-white focus:outline-hidden focus:border-stone-500 pr-10 shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-750"
                    >
                      {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">
                    {lang === "ko" ? "비밀번호 확인" : "Confirm Password"}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-xs font-mono border border-stone-200 rounded-xl px-3 py-2.5 bg-white focus:outline-hidden focus:border-stone-500 shadow-xs"
                  />
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-800 bg-white border-stone-300 focus:ring-0 mt-0.5"
                  />
                  <span className="text-[10px] text-stone-500 leading-normal select-none">
                    <b>{lang === "ko" ? "(필수) 개인정보 수집 동의및 이용약관" : "Agree to Privacy & Terms of services"}</b><br />
                    {lang === "ko" ? "폐원단 새활용 공예 보따리 등 1:1 맞춤 제작 신청 및 체험 공방 알림 발송용." : "Bespoke crafting customization notification & workshop schedule updates."}
                  </span>
                </label>

              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-stone-800 to-stone-900 hover:scale-[1.01] text-white rounded-xl text-xs font-serif font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>{lang === "ko" ? "회원가입 동의 및 완료하기" : "Complete Registration"}</span>
              </button>
            </form>

          )}

        </div>

        {/* Traditional Footer design signature */}
        <div className="bg-stone-50 border-t border-stone-200/60 p-4 text-center">
          <p className="text-[9px] text-stone-400 font-serif leading-relaxed">
            {lang === "ko" 
              ? "호렁은 모든 개인정보를 SSL 표준 보안에 따라 철저히 가상화하여 소각원단 기증에 기록합니다." 
              : "All information processed securely matching domestic Seomun traditional security protocols."}
          </p>
        </div>

      </div>

    </div>
  );
}
