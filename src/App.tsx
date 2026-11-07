import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { FloatingBlobs } from './components/three/FloatingBlobs';
import { CurtainEntrance } from './components/sections/CurtainEntrance';
import { HeroSection } from './components/sections/HeroSection';
import { CoupleSection } from './components/sections/CoupleSection';
import { EngagementGallery } from './components/sections/EngagementGallery';
import { TimelineSection } from './components/sections/TimelineSection';
import { VenueSection } from './components/sections/VenueSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { LanguageSwitcher } from './components/ui/LanguageSwitcher';
import { AudioPlayer } from './components/ui/AudioPlayer';
import { PhotoCustomizer } from './components/ui/PhotoCustomizer';
import { musicPlayer } from './utils/audio';
import type { Language, WeddingPhotos } from './types/wedding';
import { weddingContentEn, weddingContentKn, defaultWeddingPhotos } from './data/weddingContent';

export function App() {
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [photos, setPhotos] = useState<WeddingPhotos>(defaultWeddingPhotos);

  // Configure custom music URL if provided
  useEffect(() => {
    const activeContent = currentLang === 'en' ? weddingContentEn : weddingContentKn;
    if (activeContent.musicUrl) {
      musicPlayer.setCustomMusicUrl(activeContent.musicUrl);
    }
  }, [currentLang]);

  // Initialize smooth inertia scrolling via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const baseContent = currentLang === 'en' ? weddingContentEn : weddingContentKn;
  // Blend current dynamic photos into the content
  const content = {
    ...baseContent,
    photos: photos,
  };

  return (
    <div className={`relative min-h-screen bg-[#FAF8F5] text-[#4A1515] overflow-x-hidden selection:bg-gold-500 selection:text-white ${currentLang === 'kn' ? 'font-kannada' : 'font-sans'}`}>
      {/* 1. 3D Out-of-Focus Floating Blobs (Off-White Backdrop) */}
      <FloatingBlobs />

      {/* 2. Modern Hairline Inset Border Frame */}
      <div className="fixed inset-3 sm:inset-5 border border-gold-400/25 rounded-2xl pointer-events-none z-20" />

      {/* 3. Modern Folio Entrance */}
      <CurtainEntrance
        isOpen={hasOpenedInvitation}
        onOpen={() => setHasOpenedInvitation(true)}
        currentLang={currentLang}
      />

      {/* 4. Floating Header with Audio, Photo Customizer & Language Switcher */}
      <header className="fixed top-5 right-5 sm:top-7 sm:right-9 z-40 flex items-center gap-2 sm:gap-3">
        <AudioPlayer autoStartOnFirstInteraction={false} />
        <PhotoCustomizer
          photos={photos}
          onUpdatePhotos={(updated) => setPhotos(updated)}
          currentLang={currentLang}
        />
        <LanguageSwitcher
          currentLang={currentLang}
          onLanguageChange={(lang) => setCurrentLang(lang)}
        />
      </header>

      {/* 5. Main Invitation Sections */}
      <main className="relative z-10">
        {/* Hero Section with Ganapathi Invocation & Featured Couple Portrait */}
        <HeroSection content={content} currentLang={currentLang} />

        {/* The Couple Showcase with Groom & Bride Portraits */}
        <CoupleSection content={content} currentLang={currentLang} />

        {/* Engagement Moments / Story Gallery with Lightbox */}
        <EngagementGallery photos={photos} currentLang={currentLang} />

        {/* Sacred Ceremonies Itinerary */}
        <TimelineSection content={content} currentLang={currentLang} />

        {/* Venues & Directions */}
        <VenueSection content={content} currentLang={currentLang} />

        {/* Live Countdown, Blessings & Footer */}
        <CountdownSection content={content} currentLang={currentLang} />
      </main>
    </div>
  );
}

export default App;
