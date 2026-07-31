import React, { useState } from "react";
import { CraftClass, Reservation } from "../types";
import { Language, TranslationDictionary } from "../data/i18n";
import { Calendar, Clock, Users, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface ClassBookingProps {
  classes: CraftClass[];
  reservations: Reservation[];
  onAddReservation: (res: Reservation) => void;
  lang: Language;
  t: TranslationDictionary;
}

export default function ClassBooking({
  classes,
  reservations,
  onAddReservation,
  lang,
  t,
}: ClassBookingProps) {
  // Select active Class
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || "");
  const activeClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  // Dynamic Calendar State
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 6, 1)); // July 2026

  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const daysInMonthCount = getDaysInMonth(currentYear, currentMonthIdx);
  const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);
  const firstDayOfMonth = new Date(currentYear, currentMonthIdx, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonthIdx - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonthIdx + 1, 1));
  };

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("14:00");
  const [seatsCount, setSeatsCount] = useState<number>(1);

  // Form states
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [recentBookingId, setRecentBookingId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const daysOfWeekEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysHeader = lang === "en" ? daysOfWeekEn : daysOfWeek;

  // Let's calculate remaining seats for the selected date, time, and class
  const getRemainingSeats = (classId: string, date: string, time: string) => {
    return 0; // Forced to be fully sold out as per request
  };

  const remainingSeats = getRemainingSeats(selectedClassId, selectedDate, selectedTime);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedDate) {
      setErrorMsg(lang === "ko" ? "예약 날짜를 지정해 주세요." : "Please choose a reservation date.");
      return;
    }
    if (!userName.trim()) {
      setErrorMsg(lang === "ko" ? "예약자 이름을 입력해 주세요." : "Please enter your name.");
      return;
    }
    if (!userPhone.trim()) {
      setErrorMsg(lang === "ko" ? "연락처를 입력해 주세요." : "Please enter a contact number.");
      return;
    }
    if (seatsCount > remainingSeats) {
      setErrorMsg(
        lang === "ko"
          ? `선택한 시간대의 남은 좌석(${remainingSeats}석)을 초과할 수 없습니다.`
          : `Cannot exceed remaining seats (${remainingSeats}) for this period.`
      );
      return;
    }

    const newId = "res-" + Math.floor(Math.random() * 900000 + 100000);
    const totalPrice = (activeClass?.price || 0) * seatsCount;

    const newRes: Reservation = {
      id: newId,
      classId: selectedClassId,
      classTitle: activeClass.title,
      date: selectedDate,
      time: selectedTime,
      userName,
      userEmail: userEmail || "unregistered@guest.com",
      userPhone,
      seats: seatsCount,
      totalPrice,
      status: "pending", // Waiting staff confirm as requested in Back-office spec
      createdAt: new Date().toISOString().substring(0, 16).replace("T", " "),
    };

    onAddReservation(newRes);
    setRecentBookingId(newId);
    setBookingSuccess(true);
    
    // Clear inputs
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setSeatsCount(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      
      {/* Dynamic Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-amber-800 font-serif font-bold text-sm tracking-widest uppercase block mb-2">
          🏺 {t.brandName} WORKSHOP
        </span>
        <h1 className="text-3xl md:text-4xl font-serif text-stone-800 font-bold mb-4">
          {t.classHeroTitle}
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          {t.classHeroSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Select Class Item & Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="text-sm font-bold text-stone-700 font-serif px-1">
            {lang === "ko" ? "🛠️ 클래스 코스 종류" : "🛠️ Select Class Course"}
          </div>

          <div className="space-y-4">
            {classes.map((c) => {
              const isSelected = c.id === selectedClassId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedClassId(c.id);
                    setBookingSuccess(false);
                    setErrorMsg("");
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-800 bg-amber-50/60 ring-1 ring-amber-800/20 shadow-md"
                      : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-serif font-semibold ${
                      c.type === "personal" 
                        ? "bg-stone-100 text-stone-700" 
                        : c.type === "group" 
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {c.type === "personal" ? t.personalClass : c.type === "group" ? t.groupClass : t.externalClass}
                    </span>
                    <span className="text-xs font-bold text-amber-900 font-serif">
                      {lang === "ko" ? "협의 후 결정" : "Price TBD"}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 leading-snug mb-1 font-serif">
                    {c.title[lang]}
                  </h3>
                  
                  <p className="text-[11px] text-stone-500 line-clamp-2 mb-3">
                    {c.description[lang]}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-stone-400 font-mono border-t border-stone-100 pt-2 w-full">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700" /> {c.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-amber-700" /> {lang === "ko" ? "1팀 단독 진행" : "1 Team Exclusive"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Class Image display card */}
          <div className="bg-stone-100 rounded-3xl overflow-hidden border border-stone-200/60 shadow-sm relative group h-48 md:h-56">
            <img 
              src={activeClass.image} 
              alt={activeClass.title[lang]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] text-amber-300 font-mono tracking-wider">HORONG ARTISANS</span>
              <p className="text-white text-xs font-serif font-medium mt-1 line-clamp-2">
                {activeClass.description[lang]}
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right Side: Interactive Calendar & Booking Sheet */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-stone-200/60 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Calendar Day Grid (md:col-span-7) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-800" />
                  <span className="text-sm font-bold text-stone-800 font-serif">{currentYear}년 {currentMonthIdx + 1}월</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={handlePrevMonth} className="px-2 py-0.5 border border-stone-200 rounded text-xs hover:bg-stone-50">&lt;</button>
                  <button onClick={handleNextMonth} className="px-2 py-0.5 border border-stone-200 rounded text-xs hover:bg-stone-50">&gt;</button>
                </div>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                {lang === "ko" ? "실시간 예약가" : "Booking Live"}
              </span>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {daysHeader.map((day, idx) => (
                <div key={idx} className="text-[11px] font-medium text-stone-400 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Month Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                <div key={`empty-${idx}`} className="text-center py-2 text-stone-200 text-xs"></div>
              ))}
              
              {daysInMonth.map((day) => {
                const dayStr = day < 10 ? `0${day}` : `${day}`;
                const monthStr = currentMonthIdx + 1 < 10 ? `0${currentMonthIdx + 1}` : `${currentMonthIdx + 1}`;
                const fullDate = `${currentYear}-${monthStr}-${dayStr}`;
                const isSelected = selectedDate === fullDate;
                
                const dayOfWeekIdx = new Date(currentYear, currentMonthIdx, day).getDay();
                const isSunday = dayOfWeekIdx === 0;
                const isSaturday = dayOfWeekIdx === 6;

                // Let's simulate some fully booked days for realistic interaction
                const isFullyBooked = false;

                return (
                  <button
                    key={day}
                    disabled={isFullyBooked}
                    onClick={() => {
                      setSelectedDate(fullDate);
                      setBookingSuccess(false);
                      setErrorMsg("");
                    }}
                    className={`text-center py-2 rounded-xl text-xs font-mono font-medium relative transition-all ${
                      isFullyBooked 
                        ? "bg-stone-50 text-stone-300 line-through cursor-not-allowed"
                        : isSelected
                        ? "bg-amber-800 text-white shadow-md font-bold scale-105"
                        : "bg-white hover:bg-stone-100 text-stone-700"
                    }`}
                  >
                    <div>{day}</div>
                    {/* Small dots */}
                    {isFullyBooked ? (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-stone-300"></span>
                    ) : (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? "bg-amber-100" : isSunday ? "bg-red-400" : isSaturday ? "bg-blue-400" : "bg-emerald-400"}`}></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Time select slot picker */}
            <div className="pt-4 space-y-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {lang === "ko" ? "⏰ 희망 예약 시간대 선택" : "⏰ Choose Workshop Shift"}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {["10:00", "14:00", "17:00"].map((time) => {
                  const isTimeSelected = selectedTime === time;
                  const currentRemaining = getRemainingSeats(selectedClassId, selectedDate, time);
                  const isSoldOut = currentRemaining === 0;

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isSoldOut}
                      onClick={() => {
                        setSelectedTime(time);
                        setBookingSuccess(false);
                        setErrorMsg("");
                      }}
                      className={`py-2 px-3 border rounded-xl text-xs font-mono font-medium transition-all ${
                        isSoldOut
                          ? "bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed line-through"
                          : isTimeSelected
                          ? "border-amber-800 bg-amber-50 text-amber-900 font-bold"
                          : "border-stone-200 bg-white hover:border-stone-300 text-stone-600"
                      }`}
                    >
                      <div>{time}</div>
                      <div className={`text-[9px] font-sans mt-0.5 ${isSoldOut ? "text-stone-300" : isTimeSelected ? "text-amber-800" : "text-emerald-600"}`}>
                        {isSoldOut ? (lang === "ko" ? "매진" : "Full") : `${t.remSeats}: ${currentRemaining}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking inputs form (md:col-span-5) */}
          <div className="md:col-span-12 lg:col-span-5 md:border-l md:border-stone-100 md:pl-6 space-y-4">
            
            {bookingSuccess ? (
              <div className="bg-stone-50 p-6 rounded-2xl border border-emerald-950/10 text-center py-10 my-auto h-full flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-stone-800 font-serif mb-2">
                  {t.bookingSuccess}
                </h4>
                <p className="text-stone-500 text-[11px] leading-relaxed mb-4">
                  {t.bookingSuccessSub}
                </p>
                
                <div className="bg-white p-3 rounded-xl border border-stone-200 w-full text-left font-mono text-[10px] text-stone-600 space-y-1 mb-5">
                  <div>• <b className="text-stone-800">CLASS:</b> {activeClass.title[lang]}</div>
                  <div>• <b className="text-stone-800">DATE:</b> {selectedDate} {selectedTime}</div>
                  <div>• <b className="text-stone-800">TICKET:</b> {recentBookingId}</div>
                  <div>• <b className="text-stone-800">SEATS:</b> {lang === "ko" ? `${seatsCount}팀 예약대기` : `${seatsCount} team(s) pending`}</div>
                </div>

                <button
                  onClick={() => setBookingSuccess(false)}
                  className="w-full bg-stone-800 text-white rounded-xl py-2 text-xs font-medium hover:bg-stone-900 transition-colors"
                >
                  {lang === "ko" ? "새로운 일정 예약하기" : "Make Another Booking"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-900/5">
                  <div className="text-[11px] text-stone-500 font-serif">{t.bookingFormTitle}</div>
                  <div className="text-stone-800 font-serif font-bold text-xs mt-1">
                    {selectedDate} <span className="text-amber-800">@{selectedTime}</span>
                  </div>
                  <div className="text-[11px] text-stone-600 font-mono mt-1 break-words">
                    {activeClass.title[lang]}
                  </div>
                </div>

                {/* Seats ticket selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex justify-between">
                    <span>{lang === "ko" ? "👥 참가 신청 인원" : "👥 Ticket Seats"}</span>
                    <span className="text-amber-800 font-bold">{lang === "ko" ? "협의 후 결정" : "Price TBD"}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={seatsCount <= 1}
                      onClick={() => setSeatsCount((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-center font-bold text-stone-600 disabled:opacity-40"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center font-mono py-1 border border-stone-200 rounded-lg text-xs font-bold text-stone-800">
                      {seatsCount} {lang === "ko" ? "팀" : "team(s)"}
                    </div>
                    <button
                      type="button"
                      disabled={seatsCount >= remainingSeats}
                      onClick={() => setSeatsCount((prev) => Math.min(remainingSeats, prev + 1))}
                      className="w-8 h-8 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-center font-bold text-stone-600 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 tracking-wider block mb-1">
                      {t.formName} *
                    </label>
                    <input
                      required
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="예: 이지현 (Applicant)"
                      className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-800 bg-stone-50/50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-400 tracking-wider block mb-1">
                      {t.formPhone} *
                    </label>
                    <input
                      required
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-800 bg-stone-50/50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-stone-400 tracking-wider block mb-1">
                      {t.formEmail}
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full text-xs border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300 focus:outline-hidden focus:ring-1 focus:ring-amber-800 bg-stone-50/50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Error msg */}
                {errorMsg && (
                  <div className="flex items-start gap-1.5 p-2 bg-red-50 text-red-800 rounded-lg text-[10px]">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={remainingSeats === 0}
                  className="w-full relative group bg-amber-800 hover:bg-amber-900 text-white font-serif font-bold text-xs py-3 px-4 rounded-xl transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1">
                    {t.btnViewClassSchedule} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <div className="absolute inset-0 w-full h-full bg-amber-950 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                </button>
              </form>
            )}

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[10px] text-stone-400 space-y-1">
              <div>• {lang === "ko" ? "예약금은 수강 확정 시 이메일 또는 문자로 결제 전송됩니다." : "Reservation request starts as pending. Staff will confirm via text/email."}</div>
              <div className="text-amber-800 font-medium">• {lang === "ko" ? "외부 대기업/단체 출강 문의는 별도 유선 연락 부탁드립니다." : "Business inquiries are welcome, please contact support."}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
