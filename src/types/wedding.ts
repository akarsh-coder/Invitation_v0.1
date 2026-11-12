export interface WeddingEvent {
  id: string;
  title: string;
  type: 'reception' | 'muhurtha';
  date: string;
  time: string;
  lagna?: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  startDateISO: string;
  endDateISO: string;
}

export interface EngagementPhotoItem {
  id: string;
  title: string;
  date?: string;
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
  muhurthaMoment?: string;
  receptionBengaluru?: string;
  receptionHiremagaluru?: string;
  gallery: EngagementPhotoItem[];
}

export interface WeddingContent {
  invocation: {
    ganapathi: string;
  };
  headerTagline: string;
  display: {
    groomFirstName: string;
    brideFirstName: string;
    coupleAlt: string;
    dateLine: string;
    city: string;
    monthYear: string;
  };
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
  forTheDay: {
    seating: string;
    attire: string;
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
    scrollForDetails: string;
    scrollHintAria: string;
    musicOn: string;
    musicOff: string;
    copied: string;
    receptionBlr: string;
    muhurtha: string;
    receptionHml: string;
  };
}
