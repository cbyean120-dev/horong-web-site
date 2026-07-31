import React from "react";
import { Language, TranslationDictionary } from "../data/i18n";

interface BrandStoryProps {
  lang: Language;
}

export default function BrandStory({ lang }: BrandStoryProps) {
  const isKo = lang === "ko";

  return (
    <div className="animate-fade-in relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/main_product.jpg" 
          alt="Brand Story Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[#F9F9F8]/80 backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 pt-20 pb-32 text-stone-900 font-serif">
        
        {/* Top Titles */}
        <div className="mb-24 md:mb-32 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-800">
            {isKo 
              ? "전통을 잇고 섬유 도시 대구를 다시 빛내는 한복 업사이클링 전문 기업"
              : "Hanbok-Upcycling company that connects traditions and shines the textile city of Daegu again"}
          </h2>
          {!isKo && (
            <h3 className="text-base md:text-lg text-stone-600 font-sans tracking-wide">
              Hanbok-Upcycling company that connects traditions and shines the textile city of Daegu again
            </h3>
          )}
          {isKo && (
             <h3 className="text-base md:text-lg text-stone-600 font-sans tracking-wide">
               Hanbok-Upcycling company that connects traditions and shines the textile city of Daegu again
             </h3>
          )}
        </div>

        {/* Story Section */}
        <div className="mb-20 max-w-3xl">
          <h3 className="text-xl md:text-2xl font-black mb-8 text-stone-900 border-b border-stone-300 pb-4 inline-block">
            Our Story Since.2021
          </h3>
          <div className="space-y-8">
            <p className="text-lg md:text-xl font-bold tracking-tight text-stone-800 leading-relaxed break-keep">
              호롱잡화점은 2021년 대구 서문시장에서 버려지는 한복을 이용한 조선백을 시작으로 버려지는 우리의 전통 의상인 한복을 이용해 새활용 제품을 만듭니다.<br/><br/>
              더불어 우리의 것이 한복에 그치는 것이 아닌 섬유 도시를 빛낸 중장년 및 시니어 재봉사들과의 협업을 통해 일자리 창출에도 작은 목소리를 보태고 있습니다.
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-stone-800 font-sans tracking-wide bg-white/90 p-6 rounded-2xl border border-stone-100 shadow-md">
              Horong makes new products using Korean traditional clothes such as Hanbok, which is discarded at Seomun Market in Daegu in 2021.<br/><br/>
              <strong>In addition, we are adding a small voice to job creation through collaboration with middle-aged and senior seamstresses who have shone in textile cities, not just Hanbok.</strong>
            </p>
          </div>
        </div>

        {/* History Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-stone-800 flex items-center gap-4">
            Company History
            <div className="flex-1 h-px bg-stone-300"></div>
          </h3>
          <ul className="space-y-3 text-sm md:text-base text-stone-700 font-sans tracking-wide leading-relaxed pl-2 md:pl-4 border-l-2 border-stone-200">
            <li><span className="font-semibold text-stone-900 mr-2">2021.01</span> 텀블벅 프로젝트 '2021 조선백' 진행(406% 달성)</li>
            <li><span className="font-semibold text-stone-900 mr-2">2021.07</span> 텀블벅 프로젝트 '2021 미니 조선백' 진행(589% 달성)</li>
            <li><span className="font-semibold text-stone-900 mr-2">2022.07</span> '대구 청년 에나기 지원사업' 선정</li>
            <li><span className="font-semibold text-stone-900 mr-2">2022.10</span> 텀블벅 프로젝트 '호롱댕기기링' 진행(1026% 달성)</li>
            <li><span className="font-semibold text-stone-900 mr-2">2022.11</span> [2022 대구 소셜임팩트 페어] 참여</li>
            <li><span className="font-semibold text-stone-900 mr-2">2022.11</span> [2022 대구 소셜임팩트 페어 ESG 청년뱅크 IR 모의투자대회] 장려</li>
            <li><span className="font-semibold text-stone-900 mr-2">2022.12</span> [제6회 4차 산업혁명 인재양성 공유/협업 페스티벌] 창업아이디어 부문 장려</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.02</span> 아이디어스 입점</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.03</span> '대구 남구 청년창업연구소' 선정</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.03</span> '2023 사회적기업가 육성사업' 선정</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.04</span> [2023 지구의날] 행사 초청</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.05</span> [2023 대구 파워풀페스티벌] 초청</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.06</span> 법인 '주식회사 호롱잡화점' 설립</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.08</span> 여성기업 선정</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.07</span> 대구 신세계 백화점 8층 팝업스토어 진행</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.07</span> 텀블벅 프로젝트 '나심 댕기 네임텍&기링' 진행(303% 달성)</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.07</span> 경기도 파주 프로방스 마을 한복 편집샵 '하우스오브우노이' 입점</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.07</span> 광주 '어덜빈제 파장' 입점</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.07</span> [2023 부산 K-핸드메이드 페어] 참가</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.09</span> [2023 대구 여성up엑스포] 초청</li>
            <li><span className="font-semibold text-stone-900 mr-2">2023.09</span> 대구광역시 중구 경상감영길 27-14 2층 확장 이전</li>
            <li><span className="font-semibold text-stone-900 mr-2">2024.03</span> 대구 '무영당' 입점</li>
            <li><span className="font-semibold text-stone-900 mr-2">2024.04</span> '2024 새활용 육성산업' 선정</li>
            <li><span className="font-semibold text-stone-900 mr-2">2024.06</span> [2024 코리아 비건 페어] 초청</li>
            <li><span className="font-semibold text-stone-900 mr-2">2024.09</span> 파리 패션 박람회 [Who's Next] 참여</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
