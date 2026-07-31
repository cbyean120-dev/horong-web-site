import { Language } from "../data/i18n";

interface BrandLogoProps {
  className?: string;
  color?: string; // Kept for API compatibility, though not used in image
  lang?: Language;
}

export default function BrandLogo({ className = "h-10 md:h-12 w-auto", color = "#63544a", lang = "ko" }: BrandLogoProps) {
  return (
    <div className="flex items-center select-none">
      <img 
        src="/logo.png" 
        alt="HORONG LOGO" 
        className={`object-contain ${className}`}
      />
    </div>
  );
}
