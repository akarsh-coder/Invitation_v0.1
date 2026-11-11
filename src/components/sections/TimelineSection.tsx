import React from 'react';
import { GoldDivider } from '../ornaments/GoldDivider';
import { KalashaIcon } from '../ornaments/KalashaIcon';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollMotion';
import type { WeddingEvent } from '../../types/wedding';
import { generateGoogleCalendarUrl, downloadICSFile } from '../../utils/calendar';
import { useWeddingContent } from '../../store/weddingStore';

function ReceptionCard({ event, addToCalendarLabel }: { event: WeddingEvent; addToCalendarLabel: string }) {
  return (
    <ScrollReveal>
      <article className="bg-[#FDFBF8]/90 px-4 py-5 sm:px-8 sm:py-7 shadow-[0_18px_40px_-30px_rgba(61,18,18,0.35)]">
        <h3 className="font-serif text-xl sm:text-2xl text-maroon-950">{event.title}</h3>
        <p className="mt-2 font-cormorant italic text-base sm:text-lg text-maroon-800">{event.date}</p>
        <p className="mt-4 font-sans text-sm text-maroon-950">{event.time}</p>
        <p className="mt-1 font-cormorant text-base text-maroon-900">{event.venueName}</p>
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
          <a href={generateGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              {addToCalendarLabel}
            </Button>
          </a>
          <button
            type="button"
            onClick={() => downloadICSFile(event)}
            className="text-sm text-maroon-800 underline underline-offset-4 decoration-gold-500/70"
          >
            Download .ics
          </button>
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-maroon-800 underline underline-offset-4 decoration-gold-500/70"
          >
            Map
          </a>
        </div>
      </article>
    </ScrollReveal>
  );
}

export const TimelineSection: React.FC = () => {
  const content = useWeddingContent();
  const muhurthaIndex = content.events.findIndex((event) => event.type === 'muhurtha');
  const muhurtha = muhurthaIndex >= 0 ? content.events[muhurthaIndex] : undefined;
  const before = muhurthaIndex >= 0 ? content.events.slice(0, muhurthaIndex) : content.events;
  const after = muhurthaIndex >= 0 ? content.events.slice(muhurthaIndex + 1) : [];
  const addToCalendar = content.actions.addToCalendar;

  return (
    <section id="ceremonies" className="relative z-10 pt-6 sm:pt-8">
      <ScrollReveal amount={0.4}>
        <div className="bg-[#2A070C] text-[#F8EFD6]">
          <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 sm:py-14 text-center">
            <p className="font-cinzel text-2xl sm:text-4xl tracking-[0.08em] text-[#FFF6DF]">
              12 <span className="text-gold-300">·</span> 13 <span className="text-gold-300">·</span> 16 December
            </p>
            <p className="mt-3 font-cormorant italic text-base sm:text-xl text-gold-200">
              Bengaluru
              <span className="mx-2 text-gold-400">·</span>
              Hiremagaluru
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="max-w-3xl mx-auto px-4 sm:px-8 text-center mt-8 sm:mt-12">
        <p className="text-[11px] sm:text-xs uppercase text-gold-700 font-sans">Itinerary</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl text-maroon-950">The ceremonies</h2>
        <GoldDivider variant="simple" className="my-4 max-w-xs" />
      </ScrollReveal>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        {before.map((event) => (
          <ReceptionCard key={event.id} event={event} addToCalendarLabel={addToCalendar} />
        ))}
      </div>

      {muhurtha && (
        <ScrollReveal className="my-8 sm:my-12" amount={0.35}>
          <div className="bg-[#2A070C] text-[#F8EFD6]">
            <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 sm:py-20 text-center">
              <p className="text-[11px] sm:text-xs uppercase text-gold-300 font-sans">{muhurtha.title}</p>
              <KalashaIcon size={46} className="mt-4" />
              <h3 className="mt-3 font-serif text-3xl sm:text-6xl text-[#FFF6DF]">
                {muhurtha.lagna ?? muhurtha.title}
              </h3>
              <p className="mt-4 font-cormorant italic text-lg sm:text-2xl text-gold-200">{muhurtha.date}</p>
              <p className="mt-5 sm:mt-6 font-cinzel text-xl sm:text-4xl text-gold-300">{muhurtha.time}</p>
              <p className="mt-4 font-cormorant text-lg text-gold-100/85">{muhurtha.venueName}</p>
              <p className="mt-1 text-xs sm:text-sm text-gold-100/60 font-sans">{muhurtha.venueAddress}</p>

              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a href={generateGoogleCalendarUrl(muhurtha)} target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="sm">
                    {addToCalendar}
                  </Button>
                </a>
                <button
                  type="button"
                  onClick={() => downloadICSFile(muhurtha)}
                  className="text-sm text-gold-200 underline underline-offset-4 decoration-gold-300/50"
                >
                  Download .ics
                </button>
                <a
                  href={muhurtha.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-200 underline underline-offset-4 decoration-gold-300/50"
                >
                  Map
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-4 sm:space-y-6 pb-4">
        {after.map((event) => (
          <ReceptionCard key={event.id} event={event} addToCalendarLabel={addToCalendar} />
        ))}
      </div>
    </section>
  );
};
