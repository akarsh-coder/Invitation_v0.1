import type { WeddingContent, WeddingEvent, WeddingPhotos } from '../types/wedding';

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'reception-bengaluru',
    title: 'Reception (Bengaluru)',
    titleKannada: 'ಆರತಕ್ಷತೆ (ಬೆಂಗಳೂರು)',
    type: 'reception',
    date: 'Saturday, 12th December 2026',
    dateKannada: 'ಶನಿವಾರ, 12 ಡಿಸೆಂಬರ್ 2026',
    time: '7:30 PM onwards',
    timeKannada: 'ಸಂಜೆ 7:30 ರಿಂದ',
    venueName: 'Smt. Chikkamma Ramaiah Kalyana Mantapa',
    venueNameKannada: 'ಶ್ರೀಮತಿ ಚಿಕ್ಕಮ್ಮ ರಾಮಯ್ಯ ಕಲ್ಯಾಣ ಮಂಟಪ',
    venueAddress: '8th Cross, Ullal Main Road, Gnanajyothinagar, Bengaluru - 56',
    venueAddressKannada: '8ನೇ ಅಡ್ಡರಸ್ತೆ, ಉಳ್ಳಾಲ ಮುಖ್ಯರಸ್ತೆ, ಜ್ಞಾನಜ್ಯೋತಿನಗರ, ಬೆಂಗಳೂರು - 56',
    mapUrl: 'https://maps.google.com/?q=Smt.+Chikkamma+Ramaiah+Kalyana+Mantapa+Gnanajyothinagar+Bengaluru',
    startDateISO: '2026-12-12T19:30:00+05:30',
    endDateISO: '2026-12-12T22:30:00+05:30'
  },
  {
    id: 'muhurtha-bengaluru',
    title: 'Muhurtha',
    titleKannada: 'ಶುಭ ಮುಹೂರ್ತ',
    type: 'muhurtha',
    date: 'Sunday, 13th December 2026',
    dateKannada: 'ಭಾನುವಾರ, 13 ಡಿಸೆಂಬರ್ 2026',
    time: '10:40 AM to 10:50 AM',
    timeKannada: 'ಬೆಳಿಗ್ಗೆ 10:40 ರಿಂದ 10:50',
    lagna: 'Makara Lagna',
    lagnaKannada: 'ಲಗ್ನ : ಮಕರ',
    venueName: 'Smt. Chikkamma Ramaiah Kalyana Mantapa',
    venueNameKannada: 'ಶ್ರೀಮತಿ ಚಿಕ್ಕಮ್ಮ ರಾಮಯ್ಯ ಕಲ್ಯಾಣ ಮಂಟಪ',
    venueAddress: '8th Cross, Ullal Main Road, Gnanajyothinagar, Bengaluru - 56',
    venueAddressKannada: '8ನೇ ಅಡ್ಡರಸ್ತೆ, ಉಳ್ಳಾಲ ಮುಖ್ಯರಸ್ತೆ, ಜ್ಞಾನಜ್ಯೋತಿನಗರ, ಬೆಂಗಳೂರು - 56',
    mapUrl: 'https://maps.google.com/?q=Smt.+Chikkamma+Ramaiah+Kalyana+Mantapa+Gnanajyothinagar+Bengaluru',
    startDateISO: '2026-12-13T10:40:00+05:30',
    endDateISO: '2026-12-13T13:30:00+05:30'
  },
  {
    id: 'reception-hiremagaluru',
    title: 'Reception (Hiremagaluru)',
    titleKannada: 'ಆರತಕ್ಷತೆ (ಹಿರೇಮಗಳೂರು)',
    type: 'reception',
    date: 'Wednesday, 16th December 2026',
    dateKannada: 'ಬುಧವಾರ, 16 ಡಿಸೆಂಬರ್ 2026',
    time: '11:00 AM onwards',
    timeKannada: 'ಬೆಳಿಗ್ಗೆ 11:00 ಕ್ಕೆ',
    venueName: 'Hiremagaluru Sangha Kalyana Mantapa',
    venueNameKannada: 'ಹಿರೇಮಗಳೂರು ಸಂಘ ಕಲ್ಯಾಣ ಮಂಟಪ',
    venueAddress: 'Hiremagaluru, Chikkamagaluru District, Karnataka',
    venueAddressKannada: 'ಹಿರೇಮಗಳೂರು, ಚಿಕ್ಕಮಗಳೂರು ಜಿಲ್ಲೆ',
    mapUrl: 'https://maps.google.com/?q=Hiremagaluru+Sangha+Kalyana+Mantapa+Hiremagaluru',
    startDateISO: '2026-12-16T11:00:00+05:30',
    endDateISO: '2026-12-16T15:00:00+05:30'
  }
];

// Engagement & Pre-wedding Photo configuration with curated aesthetic dummy fallbacks
export const defaultWeddingPhotos: WeddingPhotos = {
  // Uses Hero.png from public/images
  heroCouple: '/images/Hero.JPG',
  heroCoupleDummy: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',

  groomPortrait: '/images/Groom1.png',
  groomPortraitDummy: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',

  bridePortrait: '/images/Bride1.png',
  bridePortraitDummy: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',

  gallery: [
    {
      id: 'photo-1',
      titleEn: 'The Engagement Moment',
      titleKn: 'ನಿಶ್ಚಿತಾರ್ಥದ ಶುಭ ಗಳಿಗೆ',
      dateEn: 'Cherished Beginning',
      dateKn: 'ಹೊಸ ಆರಂಭ',
      url: '/images/PHA00323.JPG',
      dummyUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'photo-2',
      titleEn: 'A Shared Smile',
      titleKn: 'ಪ್ರೀತಿಯ ನಗೆ',
      dateEn: 'Unfiltered Joy',
      dateKn: 'ಸಂಭ್ರಮದ ಕ್ಷಣ',
      url: '/images/GSWR8634.JPG',
      dummyUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'photo-3',
      titleEn: 'The Sacred Promise',
      titleKn: 'ಪವಿತ್ರ ಮಾತುಕತೆ',
      dateEn: 'Hearts United',
      dateKn: 'ಮನಸಾರೆ ಒಂದಾಗಿ',
      url: '/images/GSWR7490.JPG',
      dummyUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'photo-4',
      titleEn: 'Together Towards Tomorrow',
      titleKn: 'ಮುಂದಿನ ಪಯಣ',
      dateEn: 'Forever & Always',
      dateKn: 'ಶಾಶ್ವತ ಸಂಗಾತಿ',
      url: '/images/Hero.JPG',
      dummyUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
    }
  ]
};

export const weddingContentEn: WeddingContent = {
  invocation: {
    ganapathi: '|| Sri Mahaganapathaye Namaha ||'
  },
  headerTagline: 'WE ARE GETTING MARRIED',
  hosts: {
    invitationLead: 'Together with their families',
    groomFamily: {
      parents: 'Smt. Savithri & Sri Ravishankar K.S.',
      origin: 'Hiremagaluru'
    },
    brideFamily: {
      parents: 'Smt. Sulochana S. & Sri Ramamurthy K.A.',
      origin: 'Bengaluru'
    }
  },
  invitationText: 'Cordially invite you to grace the wedding celebration of their children and bestow your blessings on the new beginning',
  groom: {
    prefix: 'Chi. Ry.',
    name: 'AKARSH K.R.',
    parents: 'Son of Smt. Savithri & Sri Ravishankar K.S., Hiremagaluru'
  },
  bride: {
    prefix: 'Chi. Sou.',
    name: 'MANASA R.',
    parents: 'Daughter of Smt. Sulochana S. & Sri Ramamurthy K.A., Bengaluru'
  },
  musicUrl: '/music/background.mpeg', // Custom MP3 path inside public/music/
  photos: defaultWeddingPhotos,
  events: weddingEvents,
  mainVenue: {
    name: 'Smt. Chikkamma Ramaiah Kalyana Mantapa',
    address: '8th Cross, Ullal Main Road, Gnanajyothinagar, Bengaluru - 56',
    city: 'Bengaluru, Karnataka',
    mapQuery: 'Smt. Chikkamma Ramaiah Kalyana Mantapa, Gnanajyothinagar, Bengaluru',
    googleMapsUrl: 'https://maps.google.com/?q=Smt.+Chikkamma+Ramaiah+Kalyana+Mantapa+Gnanajyothinagar+Bengaluru'
  },
  hiremagaluruVenue: {
    name: 'Hiremagaluru Sangha Kalyana Mantapa',
    address: 'Hiremagaluru, Chikkamagaluru District, Karnataka',
    mapQuery: 'Hiremagaluru Sangha Kalyana Mantapa, Hiremagaluru',
    googleMapsUrl: 'https://maps.google.com/?q=Hiremagaluru+Sangha+Kalyana+Mantapa+Hiremagaluru'
  },
  countdown: {
    targetDateISO: '2026-12-13T10:40:00+05:30',
    title: 'Countdown to the Muhurtha',
    subText: 'Counting the moments until our auspicious beginning'
  },
  compliments: {
    heading: 'With Best Compliments From:',
    note: 'Relatives & Friends'
  },
  actions: {
    addToCalendar: 'Add to Calendar',
    getDirections: 'Get Directions on Google Maps',
    showerBlessings: 'Shower Petals & Blessings',
    shareInvitation: 'Share Invitation',
    openInvitation: 'Open Invitation',
    tapToOpen: 'Tap to Open Invitation',
    musicOn: 'Play Ambient Melody',
    musicOff: 'Mute Music',
    copied: 'Link copied to clipboard!',
    receptionBlr: 'Reception (Bengaluru)',
    muhurtha: 'Muhurtha (Makara Lagna)',
    receptionHml: 'Reception (Hiremagaluru)'
  }
};

export const weddingContentKn: WeddingContent = {
  invocation: {
    ganapathi: '|| ಶ್ರೀ ಮಹಾಗಣಪತಯೇ ನಮಃ ||'
  },
  headerTagline: 'ಶುಭ ವಿವಾಹ ಮಹೋತ್ಸವದ ಆಮಂತ್ರಣ',
  hosts: {
    invitationLead: 'ಉಭಯ ಕುಟುಂಬಸ್ಥರ ಪ್ರೀತಿಯ ಆಹ್ವಾನ',
    groomFamily: {
      parents: 'ಶ್ರೀಮತಿ ಸಾವಿತ್ರಿ ಮತ್ತು ಶ್ರೀ ರವಿಶಂಕರ್ ಕೆ.ಎಸ್.',
      origin: 'ಹಿರೇಮಗಳೂರು'
    },
    brideFamily: {
      parents: 'ಶ್ರೀಮತಿ ಸುಲೋಚನ ಎಸ್. ಮತ್ತು ಶ್ರೀ ರಾಮಮೂರ್ತಿ ಕೆ.ಎ.',
      origin: 'ಬೆಂಗಳೂರು'
    }
  },
  invitationText: 'ಬಂಧು-ಮಿತ್ರರೊಂದಿಗೆ ಸಕುಟುಂಬ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ ನೂತನ ವಧು-ವರರಿಗೆ ಶುಭ ಹಾರೈಸಿ ಆಶೀರ್ವದಿಸಬೇಕಾಗಿ ವಿನಮ್ರ ಪ್ರಾರ್ಥನೆ',
  groom: {
    prefix: 'ಚಿ|| ರಾ||',
    name: 'ಆಕರ್ಷ್ ಕೆ.ಆರ್.',
    parents: 'ಶ್ರೀಮತಿ ಸಾವಿತ್ರಿ ಮತ್ತು ಶ್ರೀ ರವಿಶಂಕರ್ ಕೆ.ಎಸ್. ರವರ ಪುತ್ರ (ಹಿರೇಮಗಳೂರು)'
  },
  bride: {
    prefix: 'ಚಿ|| ಸೌ||',
    name: 'ಮಾನಸ ಆರ್.',
    parents: 'ಶ್ರೀಮತಿ ಸುಲೋಚನ ಎಸ್. ಮತ್ತು ಶ್ರೀ ರಾಮಮೂರ್ತಿ ಕೆ.ಎ. ರವರ ಸುಪುತ್ರಿ (ಬೆಂಗಳೂರು)'
  },
  musicUrl: '/music/background.mp3', // Custom MP3 path inside public/music/
  photos: defaultWeddingPhotos,
  events: weddingEvents,
  mainVenue: {
    name: 'ಶ್ರೀಮತಿ ಚಿಕ್ಕಮ್ಮ ರಾಮಯ್ಯ ಕಲ್ಯಾಣ ಮಂಟಪ',
    address: '8ನೇ ಅಡ್ಡರಸ್ತೆ, ಉಳ್ಳಾಲ ಮುಖ್ಯರಸ್ತೆ, ಜ್ಞಾನಜ್ಯೋತಿನಗರ, ಬೆಂಗಳೂರು - 56',
    city: 'ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ',
    mapQuery: 'Smt. Chikkamma Ramaiah Kalyana Mantapa, Gnanajyothinagar, Bengaluru',
    googleMapsUrl: 'https://maps.google.com/?q=Smt.+Chikkamma+Ramaiah+Kalyana+Mantapa+Gnanajyothinagar+Bengaluru'
  },
  hiremagaluruVenue: {
    name: 'ಹಿರೇಮಗಳೂರು ಸಂಘ ಕಲ್ಯಾಣ ಮಂಟಪ',
    address: 'ಹಿರೇಮಗಳೂರು, ಚಿಕ್ಕಮಗಳೂರು ಜಿಲ್ಲೆ',
    mapQuery: 'Hiremagaluru Sangha Kalyana Mantapa, Hiremagaluru',
    googleMapsUrl: 'https://maps.google.com/?q=Hiremagaluru+Sangha+Kalyana+Mantapa+Hiremagaluru'
  },
  countdown: {
    targetDateISO: '2026-12-13T10:40:00+05:30',
    title: 'ಮಂಗಳಕರ ಶುಭ ಮುಹೂರ್ತಕ್ಕೆ ಕ್ಷಣಗಣನೆ',
    subText: 'ನೂತನ ದಂಪತಿಗಳ ಜೀವನದ ಮಂಗಳಕರ ಕ್ಷಣಗಳಿಗೆ ಕ್ಷಣಗಣನೆ'
  },
  compliments: {
    heading: 'ತಮ್ಮ ಸುಖಾಗಮನವನ್ನು ಬಯಸುವವರು :',
    note: 'ಕುಟುಂಬದವರು ಹಾಗೂ ಬಂಧು - ಮಿತ್ರರು'
  },
  actions: {
    addToCalendar: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ',
    getDirections: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ದಾರಿ ಪಡೆಯಿರಿ',
    showerBlessings: 'ಹೂಮಳೆ ಮತ್ತು ಶುಭ ಹಾರೈಕೆಗಳು',
    shareInvitation: 'ಆಮಂತ್ರಣವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    openInvitation: 'ಆಮಂತ್ರಣ ಪತ್ರಿಕೆಯನ್ನು ತೆರೆಯಿರಿ',
    tapToOpen: 'ಆಮಂತ್ರಣ ಪತ್ರಿಕೆಯನ್ನು ತೆರೆಯಲು ಸ್ಪರ್ಶಿಸಿ',
    musicOn: 'ಮಂಗಳವಾದ್ಯ ನಾದ ಆಲಿಸಿ',
    musicOff: 'ಸಂಗೀತ ನಿಲ್ಲಿಸಿ',
    copied: 'ಲಿಂಕ್ ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!',
    receptionBlr: 'ಆರತಕ್ಷತೆ (ಬೆಂಗಳೂರು)',
    muhurtha: 'ಶುಭ ಮುಹೂರ್ತ (ಮಕರ ಲಗ್ನ)',
    receptionHml: 'ಆರತಕ್ಷತೆ (ಹಿರೇಮಗಳೂರು)'
  }
};
