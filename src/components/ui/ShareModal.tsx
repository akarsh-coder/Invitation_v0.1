import React from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { useUiStore } from '../../store/uiStore';

interface ShareModalProps {
  className?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ className = '' }) => {
  const copied = useUiStore((state) => state.shareCopied);
  const setShareCopied = useUiStore((state) => state.setShareCopied);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const message = `✨ Wedding Invitation: Akarsh & Manasa ✨\nTogether with their families, cordially invite you to celebrate the wedding of Akarsh K.R. & Manasa R.\n📅 Dates: 12th & 13th December 2026\n📍 Venue: Smt. Chikkamma Ramaiah Kalyana Mantapa, Bengaluru\n\nView the invitation here:\n${window.location.href}`;

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
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>

      {navigator.share && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator
              .share({
                title: 'Akarsh & Manasa Wedding Invitation',
                text: 'You are cordially invited to the wedding of Akarsh K.R. & Manasa R.',
                url: window.location.href,
              })
              .catch(() => {});
          }}
          icon={<Share2 size={14} className="text-gold-700" />}
          className="text-xs"
        >
          Share
        </Button>
      )}
    </div>
  );
};
