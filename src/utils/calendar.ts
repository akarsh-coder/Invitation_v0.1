import type { WeddingEvent } from '../types/wedding';

function formatToICSDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/-|:|\.\d+/g, '');
}

export function generateGoogleCalendarUrl(event: WeddingEvent): string {
  const start = formatToICSDate(event.startDateISO);
  const end = formatToICSDate(event.endDateISO);
  const title = encodeURIComponent(`Wedding: ${event.title} - Akarsh & Manasa`);
  const details = encodeURIComponent(
    `You are cordially invited to celebrate the wedding of Akarsh K.R. & Manasa R.\nEvent: ${event.title}\nTime: ${event.time}\nVenue: ${event.venueName}, ${event.venueAddress}`
  );
  const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function downloadICSFile(event: WeddingEvent): void {
  const start = formatToICSDate(event.startDateISO);
  const end = formatToICSDate(event.endDateISO);
  const now = formatToICSDate(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Akarsh & Manasa Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-${Date.now()}@akarshmanasa.wedding`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Wedding: ${event.title} - Akarsh & Manasa`,
    `DESCRIPTION:Wedding of Akarsh K.R. & Manasa R.\\n${event.time}\\nVenue: ${event.venueName}`,
    `LOCATION:${event.venueName}, ${event.venueAddress}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Wedding of Akarsh & Manasa tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Akarsh-Manasa-Wedding-${event.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
