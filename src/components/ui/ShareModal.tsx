import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import type { Language } from '../../types/wedding';

interface ShareModalProps {
  currentLang: Language;
  className?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ currentLang, className = '' }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const message = currentLang === 'en'
      ? `✨ Wedding Invitation: Akarsh & Manasa ✨\nTogether with their families, cordially invite you to celebrate the wedding of Akarsh K.R. & Manasa R.\n📅 Dates: 12th & 13th December 2026\n📍 Venue: Smt. Chikkamma Ramaiah Kalyana Mantapa, Bengaluru\n\nView the invitation here:\n${window.location.href}`
      : `✨ ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ: ಆಕರ್ಷ್ & ಮಾನಸ ✨\nಉಭಯ ಕುಟುಂಬಸ್ಥರ ಪ್ರೀತಿಯ ಆಹ್ವಾನ. ಆಕರ್ಷ್ ಕೆ.ಆರ್. & ಮಾನಸ ಆರ್. ಅವರ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ಸಕುಟುಂಬ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ ಶುಭ ಹಾರೈಸಬೇಕಾಗಿ ಪ್ರಾರ್ಥನೆ.\n📅 ದಿನಾಂಕ: 12 & 13 ಡಿಸೆಂಬರ್ 2026\n📍 ಸ್ಥಳ: ಶ್ರೀಮತಿ ಚಿಕ್ಕಮ್ಮ ರಾಮಯ್ಯ ಕಲ್ಯಾಣ ಮಂಟಪ, ಬೆಂಗಳೂರು\n\nಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ವೀಕ್ಷಿಸಲು ಈ ಲಿಂಕ್ ಒತ್ತಿರಿ:\n${window.location.href}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleWhatsAppShare}
        icon={<MessageCircle size={15} className="text-emerald-700" />}
        className="text-xs bg-white/90 hover:bg-emerald-50 border-emerald-600/40"
      >
        WhatsApp
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        icon={copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-gold-700" />}
        className="text-xs"
      >
        {copied
          ? (currentLang === 'en' ? 'Copied!' : 'ಕಾಪಿಯಾಗಿದೆ!')
          : (currentLang === 'en' ? 'Copy Link' : 'ಲಿಂಕ್ ಕಾಪಿ')}
      </Button>

      {navigator.share && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator.share({
              title: 'Akarsh & Manasa Wedding Invitation',
              text: 'You are cordially invited to the wedding of Akarsh K.R. & Manasa R.',
              url: window.location.href,
            }).catch(() => {});
          }}
          icon={<Share2 size={14} className="text-gold-700" />}
          className="text-xs"
        >
          {currentLang === 'en' ? 'Share' : 'ಹಂಚಿಕೊಳ್ಳಿ'}
        </Button>
      )}
    </div>
  );
};
