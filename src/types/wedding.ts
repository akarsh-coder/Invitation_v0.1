export type Language = 'en' | 'kn';

export interface WeddingEvent {
  id: string;
  title: string;
  titleKannada: string;
  type: 'reception' | 'muhurtha';
  date: string;
  dateKannada: string;
  time: string;
  timeKannada: string;
  lagna?: string;
  lagnaKannada?: string;
  venueName: string;
  venueNameKannada: string;
  venueAddress: string;
  venueAddressKannada: string;
  mapUrl: string;
  startDateISO: string;
  endDateISO: string;
}

export interface EngagementPhotoItem {
  id: string;
  titleEn: string;
  titleKn: string;
  dateEn?: string;
  dateKn?: string;
  url?: string;
  dummyUrl: string;
}

export interface WeddingPhotos {
  heroCouple?: string;
  heroCoupleDummy: string;
  groomPortrait?: string;
  groomPortraitDummy: string;
  bridePortrait?: string;
  bridePortraitDummy: string;
  gallery: EngagementPhotoItem[];
}

export interface WeddingContent {
  invocation: {
    ganapathi: string;
  };
  headerTagline: string;
  hosts: {
    groomFamily: {
      parents: string;
      origin: string;
    };
    brideFamily: {
      parents: string;
      origin: string;
    };
    invitationLead: string;
  };
  invitationText: string;
  groom: {
    prefix: string;
    name: string;
    parents: string;
  };
  bride: {
    prefix: string;
    name: string;
    parents: string;
  };
  musicUrl?: string;
  photos: WeddingPhotos;
  events: WeddingEvent[];
  mainVenue: {
    name: string;
    address: string;
    city: string;
    mapQuery: string;
    googleMapsUrl: string;
  };
  hiremagaluruVenue: {
    name: string;
    address: string;
    mapQuery: string;
    googleMapsUrl: string;
  };
  countdown: {
    targetDateISO: string;
    title: string;
    subText: string;
  };
  compliments: {
    heading: string;
    note: string;
  };
  actions: {
    addToCalendar: string;
    getDirections: string;
    showerBlessings: string;
    shareInvitation: string;
    openInvitation: string;
    tapToOpen: string;
    musicOn: string;
    musicOff: string;
    copied: string;
    receptionBlr: string;
    muhurtha: string;
    receptionHml: string;
  };
}
