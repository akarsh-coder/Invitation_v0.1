import React, { useState } from 'react';
import { Camera, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from './Button';
import type { WeddingPhotos, Language } from '../../types/wedding';

interface PhotoCustomizerProps {
  photos: WeddingPhotos;
  onUpdatePhotos: (updated: WeddingPhotos) => void;
  currentLang: Language;
}

export const PhotoCustomizer: React.FC<PhotoCustomizerProps> = ({
  photos,
  onUpdatePhotos,
  currentLang,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heroInput, setHeroInput] = useState(photos.heroCouple || '');
  const [groomInput, setGroomInput] = useState(photos.groomPortrait || '');
  const [brideInput, setBrideInput] = useState(photos.bridePortrait || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePhotos({
      ...photos,
      heroCouple: heroInput.trim(),
      groomPortrait: groomInput.trim(),
      bridePortrait: brideInput.trim(),
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsOpen(false);
    }, 1200);
  };

  const handleResetToDummy = () => {
    setHeroInput('');
    setGroomInput('');
    setBrideInput('');
    onUpdatePhotos({
      ...photos,
      heroCouple: '',
      groomPortrait: '',
      bridePortrait: '',
    });
  };

  return (
    <>
      {/* Floating Modern Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-gold-400/60 shadow-sm text-xs font-medium text-maroon-900 hover:border-gold-500 hover:shadow-gold-subtle transition-all duration-300 active:scale-95"
        title="Customize or preview engagement photos"
      >
        <Camera size={14} className="text-gold-600 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-sans">
          {currentLang === 'en' ? 'Photos' : 'ಫೋಟೋಗಳು'}
        </span>
      </button>

      {/* Modern Slide-over / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-gold-400/80 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gold-100/60 text-maroon-800 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2 text-gold-700">
              <Camera size={18} />
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest">
                {currentLang === 'en' ? 'Engagement Photography' : 'ಫೋಟೋಗಳ ವಿವರ'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-maroon-950 mb-1">
              {currentLang === 'en' ? 'Photo Settings' : 'ಭಾವಚಿತ್ರಗಳನ್ನು ಸೇರಿಸಿ'}
            </h3>
            <p className="text-xs text-maroon-800/80 mb-5 leading-relaxed font-sans">
              {currentLang === 'en'
                ? 'Paste links to your real engagement photos, or leave blank to automatically display curated dummy images.'
                : 'ನಿಮ್ಮ ನಿಶ್ಚಿತಾರ್ಥದ ಫೋಟೋ ಲಿಂಕ್‌ಗಳನ್ನು ನಮೂದಿಸಿ, ಖಾಲಿ ಬಿಟ್ಟರೆ ಸುಂದರ ಮಾದರಿ ಚಿತ್ರಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ.'}
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Hero Couple Photo */}
              <div>
                <label className="block text-xs font-semibold text-maroon-950 mb-1 font-sans">
                  {currentLang === 'en' ? 'Couple Portrait (Hero)' : 'ವರ-ವಧು ಮುಖ್ಯ ಭಾವಚಿತ್ರ'}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://... or /images/couple.jpg"
                    value={heroInput}
                    onChange={(e) => setHeroInput(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-400/60 bg-white"
                  />
                  {heroInput && (
                    <button
                      type="button"
                      onClick={() => setHeroInput('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-maroon-700 hover:text-maroon-900"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Groom Portrait */}
              <div>
                <label className="block text-xs font-semibold text-maroon-950 mb-1 font-sans">
                  {currentLang === 'en' ? 'Groom Portrait (Akarsh)' : 'ವರನ ಭಾವಚಿತ್ರ (ಆಕರ್ಷ್)'}
                </label>
                <input
                  type="url"
                  placeholder="https://... or /images/akarsh.jpg"
                  value={groomInput}
                  onChange={(e) => setGroomInput(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-400/60 bg-white"
                />
              </div>

              {/* Bride Portrait */}
              <div>
                <label className="block text-xs font-semibold text-maroon-950 mb-1 font-sans">
                  {currentLang === 'en' ? 'Bride Portrait (Manasa)' : 'ವಧುವಿನ ಭಾವಚಿತ್ರ (ಮಾನಸ)'}
                </label>
                <input
                  type="url"
                  placeholder="https://... or /images/manasa.jpg"
                  value={brideInput}
                  onChange={(e) => setBrideInput(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-400/60 bg-white"
                />
              </div>

              {/* Pro Tip */}
              <div className="p-3 rounded-xl bg-gold-50/70 border border-gold-300/40 text-[11px] text-maroon-900/80 leading-relaxed font-sans flex items-start gap-2">
                <Sparkles size={14} className="text-gold-600 shrink-0 mt-0.5" />
                <span>
                  Tip: You can also permanently configure image paths in{' '}
                  <code className="text-maroon-950 font-mono font-semibold">src/data/weddingContent.ts</code>.
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetToDummy}
                  className="text-xs text-gold-700 hover:text-maroon-900 hover:underline font-medium font-sans"
                >
                  Use Default Dummy Photos
                </button>

                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  icon={isSaved ? <Check size={14} /> : <ImageIcon size={14} />}
                >
                  {isSaved ? 'Updated!' : 'Apply Photos'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
