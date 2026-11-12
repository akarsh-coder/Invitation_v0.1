import type { WeddingContent, WeddingEvent, WeddingPhotos } from '../types/wedding';

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'reception-bengaluru',
    title: 'Reception (Bengaluru)',
    type: 'reception',
    date: 'Saturday, 12th December 2026',
    time: '7:30 PM onwards',
    venueName: 'Smt. Chikkamma Ramaiah Kalyana Mantapa',
    venueAddress: '8th Cross, Ullal Main Road, Jnana Jyothi Nagar, Bengaluru - 56',
    mapUrl: 'https://maps.google.com/?q=Smt.+Chikkamma+Ramaiah+Kalyana+Mantapa+Jnana Jyothi Nagar+Bengaluru',
    startDateISO: '2026-12-12T19:30:00+05:30',
    endDateISO: '2026-12-12T22:30:00+05:30',
  },
  {
    id: 'muhurtha-bengaluru',
    title: 'Muhurtha',
    type: 'muhurtha',
    date: 'Sunday, 13th December 2026',
    time: '10:40 AM to 10:50 AM',
    lagna: 'Makara Lagna',
    venueName: 'Smt. Chikkamma Ramaiah Kalyana Mantapa',
    venueAddress: '8th Cross, Ullal Main Road, Jnana Jyothi Nagar, Bengaluru - 56',
    mapUrl: 'https://maps.google.com/?q=Smt.+Chikkamma+Ramaiah+Kalyana+Mantapa+Jnana Jyothi Nagar+Bengaluru',
    startDateISO: '2026-12-13T10:40:00+05:30',
    endDateISO: '2026-12-13T13:30:00+05:30',
  },
  {
    id: 'reception-hiremagaluru',
    title: 'Reception (Hiremagaluru)',
    type: 'reception',
    date: 'Wednesday, 16th December 2026',
    time: '11:00 AM onwards',
    venueName: 'Hiremagaluru Sangha Kalyana Mantapa',
    venueAddress: 'Hiremagaluru, Chikkamagaluru District, Karnataka',
    mapUrl: 'https://maps.google.com/?q=Hiremagaluru+Sangha+Kalyana+Mantapa+Hiremagaluru',
    startDateISO: '2026-12-16T11:00:00+05:30',
    endDateISO: '2026-12-16T15:00:00+05:30',
  },
];

export const defaultWeddingPhotos: WeddingPhotos = {
  heroCouple: '/images/web/hero.webp',
  heroCoupleDummy: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',

  groomPortrait: '/images/web/groom.webp',
  groomPortraitDummy: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',

  bridePortrait: '/images/web/bride.webp',
  bridePortraitDummy: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',

  muhurthaMoment: '/images/web/muhurtha-knot.webp',
  receptionBengaluru: '/images/web/reception-bengaluru.webp',
  receptionHiremagaluru: '/images/web/reception-hiremagaluru.webp',

  gallery: [
    {
      id: 'photo-1',
      title: 'The Engagement Moment',
      date: 'Cherished Beginning',
      url: '/images/web/engagement-1.webp',
      dummyUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'photo-2',
      title: 'A Shared Smile',
      date: 'Unfiltered Joy',
      url: '/images/web/engagement-2.webp',
      dummyUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'photo-3',
      title: 'The Sacred Promise',
      date: 'Hearts United',
      url: '/images/web/engagement-3.webp',
      dummyUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'photo-4',
      title: 'Together Towards Tomorrow',
      date: 'Forever & Always',
      url: '/images/web/hero.webp',
      dummyUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    },
  ],
};

export const weddingContent: WeddingContent = {
  invocation: {
    ganapathi: '|| Sri Mahaganapathaye Namaha ||',
  },
  headerTagline: 'WE ARE GETTING MARRIED',
  display: {
    groomFirstName: 'Akarsh',
    brideFirstName: 'Manasa',
    coupleAlt: 'Akarsh and Manasa',
    dateLine: '12 & 13 December 2026',
    city: 'Bengaluru',
    monthYear: 'December 2026',
  },
  hosts: {
    invitationLead: 'Together with their families',
    groomFamily: {
      parents: 'Smt. Savithri & Sri Ravishankar K.S.',
      origin: 'Hiremagaluru',
    },
    brideFamily: {
      parents: 'Smt. Sulochana S. & Sri Ramamurthy K.A.',
      origin: 'Bengaluru',
    },
  },
  invitationText:
    'Cordially invite you to grace the wedding celebration of their children and bestow your blessings on the new beginning',
  groom: {
    prefix: 'Chi. Ry.',
    name: 'AKARSH K.R.',
    parents: 'Son of Smt. Savithri & Sri Ravishankar K.S., Hiremagaluru',
  },
  bride: {
    prefix: 'Chi. Sou.',
    name: 'MANASA R.',
    parents: 'Daughter of Smt. Sulochana S. & Sri Ramamurthy K.A., Bengaluru',
  },
  musicUrl: '/music/background.mp3',
  photos: defaultWeddingPhotos,
  events: weddingEvents,
  mainVenue: {
    name: 'Smt. Chikkamma Ramaiah Kalyana Mantapa',
    address: '8th Cross, Ullal Main Road, Jnana Jyothi Nagar, Bengaluru - 56',
    city: 'Bengaluru, Karnataka',
    mapQuery: 'Smt. Chikkamma Ramaiah Kalyana Mantapa, Jnana Jyothi Nagar, Bengaluru',
    googleMapsUrl: 'https://maps.google.com/?q=Smt.+Chikkamma+Ramaiah+Kalyana+Mantapa+Jnana Jyothi Nagar+Bengaluru',
  },
  hiremagaluruVenue: {
    name: 'Hiremagaluru Sangha Kalyana Mantapa',
    address: 'Hiremagaluru, Chikkamagaluru District, Karnataka',
    mapQuery: 'Hiremagaluru Sangha Kalyana Mantapa, Hiremagaluru',
    googleMapsUrl: 'https://maps.google.com/?q=Hiremagaluru+Sangha+Kalyana+Mantapa+Hiremagaluru',
  },
  countdown: {
    targetDateISO: '2026-12-13T10:40:00+05:30',
    title: 'Countdown to the Muhurtha',
    subText: 'Counting the moments until our auspicious beginning',
  },
  forTheDay: {
    seating: 'Kindly be seated a little before the 10:40 AM muhurtha.',
    attire: 'Traditional attire.',
  },
  compliments: {
    heading: 'With Best Compliments From:',
    note: 'Relatives & Friends',
  },
  actions: {
    addToCalendar: 'Add to Calendar',
    getDirections: 'Get Directions on Google Maps',
    showerBlessings: 'Shower Petals & Blessings',
    shareInvitation: 'Share Invitation',
    openInvitation: 'Open Invitation',
    tapToOpen: 'Tap the seal.',
    scrollForDetails: 'Scroll for more',
    scrollHintAria: 'Scroll down for more invitation details',
    musicOn: 'Play Ambient Melody',
    musicOff: 'Mute Music',
    copied: 'Link copied to clipboard!',
    receptionBlr: 'Reception (Bengaluru)',
    muhurtha: 'Muhurtha (Makara Lagna)',
    receptionHml: 'Reception (Hiremagaluru)',
  },
};
