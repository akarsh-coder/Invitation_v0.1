import { CurtainEntrance } from './components/sections/CurtainEntrance';
import { HeroSection } from './components/sections/HeroSection';
import { CoupleSection } from './components/sections/CoupleSection';
import { EngagementGallery } from './components/sections/EngagementGallery';
import { TimelineSection } from './components/sections/TimelineSection';
import { VenueSection } from './components/sections/VenueSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { AudioPlayer } from './components/ui/AudioPlayer';
import { useAppBootstrap } from './hooks/useAppBootstrap';
import { useInvitationStore } from './store/invitationStore';
import { useWeddingContent } from './store/weddingStore';

export function App() {
  useAppBootstrap();
  const content = useWeddingContent();
  const hasOpenedInvitation = useInvitationStore((state) => state.hasOpenedInvitation);
  const groomInitial = content.display.groomFirstName.charAt(0);
  const brideInitial = content.display.brideFirstName.charAt(0);

  return (
    <div className="relative min-h-screen bg-[#F6F1E8] text-[#4A1515] overflow-x-hidden selection:bg-gold-500 selection:text-white font-sans">
      <div className="pointer-events-none fixed inset-0 z-0 paper-texture" />
      <div className="pointer-events-none fixed inset-0 z-0 paper-grain" />

      <div className="hidden lg:block fixed inset-5 border border-gold-500/25 pointer-events-none z-20" />

      <CurtainEntrance />

      <header className="fixed top-5 left-5 right-5 z-40 flex items-start justify-between gap-3 sm:top-7 sm:left-9 sm:right-9">
        <div
          className={`pointer-events-none flex min-w-0 items-baseline gap-2 transition-opacity duration-700 sm:block ${
            hasOpenedInvitation ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!hasOpenedInvitation}
        >
          <p className="font-italiana text-[1.35rem] leading-none text-maroon-950 [text-shadow:0_0_12px_#F6F1E8,0_0_3px_#F6F1E8] sm:text-2xl">
            {groomInitial} <span className="text-gold-600">&</span> {brideInitial}
          </p>
          <p className="text-[9px] uppercase tracking-[0.12em] text-gold-700 font-sans sm:mt-1 sm:text-[10px] sm:tracking-[0.14em]">
            {content.display.dateLine}
          </p>
        </div>
        <AudioPlayer />
      </header>

      <main className="relative z-10">
        <HeroSection />
        <CoupleSection />
        <EngagementGallery />
        <TimelineSection />
        <VenueSection />
        <CountdownSection />
      </main>
    </div>
  );
}

export default App;
