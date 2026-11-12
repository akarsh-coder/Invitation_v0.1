import React from 'react';
import { GoldDivider } from '../ornaments/GoldDivider';
import { KalashaIcon } from '../ornaments/KalashaIcon';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollMotion';
import type { WeddingEvent } from '../../types/wedding';
import { generateGoogleCalendarUrl, downloadICSFile } from '../../utils/calendar';
import { useWeddingContent } from '../../store/weddingStore';

function ReceptionEventActions({
  event,
  addToCalendarLabel,
  linkClassName,
}: {
  event: WeddingEvent;
  addToCalendarLabel: string;
  linkClassName: string;
}) {
  return (
    <div className="mt-5 flex flex-col items-start gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
      <a href={generateGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm">
          {addToCalendarLabel}
        </Button>
      </a>
      <button
        type="button"
        onClick={() => downloadICSFile(event)}
        className={`text-sm underline underline-offset-4 ${linkClassName}`}
      >
        Download .ics
      </button>
      <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className={`text-sm underline underline-offset-4 ${linkClassName}`}>
        Map
      </a>
    </div>
  );
}

function ReceptionCard({ event, addToCalendarLabel }: { event: WeddingEvent; addToCalendarLabel: string }) {
  return (
    <ScrollReveal>
      <article className="bg-[#FDFBF8]/90 px-4 py-5 sm:px-8 sm:py-7 shadow-[0_18px_40px_-30px_rgba(61,18,18,0.35)]">
        <h3 className="font-serif text-xl sm:text-2xl text-maroon-950">{event.title}</h3>
        <p className="mt-2 font-cormorant italic text-base sm:text-lg text-maroon-800">{event.date}</p>
        <p className="mt-4 font-sans text-sm text-maroon-950">{event.time}</p>
        <p className="mt-1 font-cormorant text-base text-maroon-900">{event.venueName}</p>
        <ReceptionEventActions
          event={event}
          addToCalendarLabel={addToCalendarLabel}
          linkClassName="text-maroon-800 decoration-gold-500/70"
        />
      </article>
    </ScrollReveal>
  );
}

function CeremonyEventSeparator({ onDark = false }: { onDark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-6 py-3 sm:py-3.5 ${onDark ? 'bg-[#2A070C]' : 'bg-[#F6F1E8]'}`}
      aria-hidden
    >
      <div className="flex w-full max-w-lg items-center gap-3">
        <div
          className={`h-px flex-1 bg-gradient-to-r from-transparent ${onDark ? 'to-gold-400/55' : 'to-gold-500/45'}`}
        />
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
            onDark ? 'border-gold-400/50 bg-[#3A0A12]' : 'border-gold-500/55 bg-[#FDFBF8]'
          }`}
        >
          <div className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
        </div>
        <div
          className={`h-px flex-1 bg-gradient-to-l from-transparent ${onDark ? 'to-gold-400/55' : 'to-gold-500/45'}`}
        />
      </div>
    </div>
  );
}

function ReceptionBannerCard({
  event,
  imageUrl,
  imageAlt,
  addToCalendarLabel,
  imageOn = 'right',
}: {
  event: WeddingEvent;
  imageUrl: string;
  imageAlt: string;
  addToCalendarLabel: string;
  imageOn?: 'left' | 'right';
}) {
  const imageRight = imageOn === 'right';
  const textColOrder = imageRight ? 'order-2 sm:order-1' : 'order-2 sm:order-2';
  const imageColOrder = imageRight ? 'order-1 sm:order-2' : 'order-1 sm:order-1';
  const dividerPosition = imageRight ? 'right-0' : 'left-0';
  const imageBleed = imageRight ? 'left-0' : 'right-0';
  const imageFocus = imageRight ? 'object-[72%_center]' : 'object-[38%_center]';

  return (
    <article className="mx-auto w-full max-w-5xl overflow-hidden border border-gold-500/25 bg-[#FDFBF8] shadow-[0_22px_50px_-36px_rgba(61,18,18,0.45)]">
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className={`relative flex flex-col justify-center px-5 py-7 text-left sm:px-9 sm:py-10 ${textColOrder}`}>
          <div
            className={`pointer-events-none absolute inset-y-4 ${dividerPosition} hidden w-px bg-gradient-to-b from-transparent via-gold-500/35 to-transparent sm:block`}
            aria-hidden
          />
          <p className="text-[11px] uppercase tracking-[0.14em] text-gold-700 font-sans">Reception</p>
          <h3 className="mt-2 font-serif text-2xl leading-tight text-maroon-950 sm:text-3xl">{event.title}</h3>
          <p className="mt-2 font-cormorant text-base italic text-maroon-800 sm:text-lg">{event.date}</p>
          <p className="mt-4 font-sans text-sm text-maroon-950">{event.time}</p>
          <p className="mt-1 font-cormorant text-base leading-snug text-maroon-900">{event.venueName}</p>
          {event.venueAddress && (
            <p className="mt-1 text-xs leading-relaxed text-maroon-800/85 font-sans sm:text-sm">{event.venueAddress}</p>
          )}
          <ReceptionEventActions
            event={event}
            addToCalendarLabel={addToCalendarLabel}
            linkClassName="text-maroon-800 decoration-gold-500/70"
          />
        </div>

        <div className={`relative min-h-[11.5rem] sm:min-h-[17.5rem] ${imageColOrder}`}>
          <img
            src={imageUrl}
            alt={imageAlt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover ${imageFocus}`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 ${imageBleed} hidden w-3 bg-[#FDFBF8] sm:block`}
            aria-hidden
          />
        </div>
      </div>
    </article>
  );
}

export const TimelineSection: React.FC = () => {
  const content = useWeddingContent();
  const muhurthaIndex = content.events.findIndex((event) => event.type === 'muhurtha');
  const muhurtha = muhurthaIndex >= 0 ? content.events[muhurthaIndex] : undefined;
  const before = muhurthaIndex >= 0 ? content.events.slice(0, muhurthaIndex) : content.events;
  const after = muhurthaIndex >= 0 ? content.events.slice(muhurthaIndex + 1) : [];
  const addToCalendar = content.actions.addToCalendar;
  const muhurthaImage = content.photos.muhurthaMoment;
  const receptionBengaluruImage = content.photos.receptionBengaluru;
  const receptionHiremagaluruImage = content.photos.receptionHiremagaluru;

  const muhurthaDetails = muhurtha ? (
    <>
      <p className="text-xs uppercase tracking-wide text-gold-300 font-sans">{muhurtha.title}</p>
      <KalashaIcon size={40} className="mt-3 scale-100 sm:mt-4 sm:scale-[1.15]" />
      <h3 className="mt-2 font-serif text-[1.65rem] leading-tight text-[#FFF6DF] sm:mt-3 sm:text-6xl">
        {muhurtha.lagna ?? muhurtha.title}
      </h3>
      <p className="mt-2 font-cormorant text-base italic text-gold-200 sm:mt-4 sm:text-2xl">{muhurtha.date}</p>
      <p className="mt-3 font-cinzel text-lg leading-snug text-gold-300 sm:mt-6 sm:text-4xl">{muhurtha.time}</p>
      <p className="mt-3 font-cormorant text-base leading-snug text-gold-100 sm:mt-4 sm:text-lg">{muhurtha.venueName}</p>
      <p className="mt-1 text-xs leading-relaxed text-gold-100/75 font-sans sm:text-sm sm:text-gold-100/60">
        {muhurtha.venueAddress}
      </p>

      <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-4">
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
    </>
  ) : null;

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

      <div className="mt-6 sm:mt-8">
        {before.map((event) => {
          if (event.id === 'reception-bengaluru' && receptionBengaluruImage) {
            return (
              <ScrollReveal key={event.id} amount={0.35} className="px-4 sm:px-8">
                <ReceptionBannerCard
                  event={event}
                  imageUrl={receptionBengaluruImage}
                  imageAlt={`${content.display.coupleAlt} — reception in Bengaluru`}
                  addToCalendarLabel={addToCalendar}
                />
              </ScrollReveal>
            );
          }

          return (
            <div key={event.id} className="mx-auto mb-4 max-w-3xl px-4 sm:mb-6 sm:px-8">
              <ReceptionCard event={event} addToCalendarLabel={addToCalendar} />
            </div>
          );
        })}

        {before.some((e) => e.id === 'reception-bengaluru' && receptionBengaluruImage) && muhurtha && (
          <CeremonyEventSeparator />
        )}

        {muhurtha && muhurthaDetails && (
          <ScrollReveal amount={0.35}>
            <div className="bg-[#2A070C] text-[#F8EFD6]">
            {muhurthaImage ? (
              <div className="relative w-full bg-[#2A070C]">
                <div className="relative w-full sm:aspect-[21/9]">
                  <div className="relative h-44 w-full overflow-hidden sm:absolute sm:inset-0 sm:h-full">
                    <img
                      src={muhurthaImage}
                      alt={`${content.display.coupleAlt} — sacred knot at the muhurtha`}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_bottom,transparent_0%,transparent_25%,rgba(42,7,12,0.55)_45%,rgba(42,7,12,0.92)_72%,#2A070C_100%)] sm:block"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#2A070C] to-transparent sm:hidden"
                      aria-hidden
                    />
                  </div>
                  <div className="relative z-[2] px-4 py-8 text-center sm:absolute sm:inset-x-0 sm:top-1/4 sm:bottom-0 sm:flex sm:flex-col sm:justify-end sm:px-6 sm:py-0 sm:pb-14">
                    <div className="mx-auto w-full max-w-3xl sm:[text-shadow:0_2px_24px_rgba(0,0,0,0.55),0_1px_10px_rgba(42,7,12,0.9)]">
                      {muhurthaDetails}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-20">{muhurthaDetails}</div>
            )}
            </div>
          </ScrollReveal>
        )}
      </div>

      {after.length > 0 && (
        <>
          <CeremonyEventSeparator />
          <div className="space-y-4 px-4 pb-4 pt-2 sm:space-y-6 sm:px-8 sm:pt-4">
            {after.map((event) => {
              if (event.id === 'reception-hiremagaluru' && receptionHiremagaluruImage) {
                return (
                  <ScrollReveal key={event.id} amount={0.35}>
                    <ReceptionBannerCard
                      event={event}
                      imageUrl={receptionHiremagaluruImage}
                      imageAlt={`${content.display.coupleAlt} — reception in Hiremagaluru`}
                      addToCalendarLabel={addToCalendar}
                      imageOn="left"
                    />
                  </ScrollReveal>
                );
              }

              return (
                <div key={event.id} className="mx-auto max-w-3xl">
                  <ReceptionCard event={event} addToCalendarLabel={addToCalendar} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};
