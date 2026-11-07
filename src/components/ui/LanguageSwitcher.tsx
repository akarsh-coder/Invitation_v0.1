import React from 'react';
import { Languages } from 'lucide-react';
import type { Language } from '../../types/wedding';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center bg-[#FDFBF7]/90 backdrop-blur-md border border-gold-500/50 p-1 rounded-full shadow-gold-subtle ${className}`}
      role="radiogroup"
      aria-label="Language Selector"
    >
      <div className="pl-2 pr-1 text-gold-700">
        <Languages size={15} />
      </div>

      <button
        type="button"
        role="radio"
        aria-checked={currentLang === 'en'}
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
          currentLang === 'en'
            ? 'bg-gradient-to-r from-maroon-700 to-maroon-800 text-[#FDFBF7] shadow-sm'
            : 'text-maroon-900/70 hover:text-maroon-900 hover:bg-gold-500/10'
        }`}
      >
        English
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={currentLang === 'kn'}
        onClick={() => onLanguageChange('kn')}
        className={`px-3 py-1 rounded-full text-xs font-semibold font-kannada transition-all duration-300 ${
          currentLang === 'kn'
            ? 'bg-gradient-to-r from-maroon-700 to-maroon-800 text-[#FDFBF7] shadow-sm'
            : 'text-maroon-900/70 hover:text-maroon-900 hover:bg-gold-500/10'
        }`}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
};
