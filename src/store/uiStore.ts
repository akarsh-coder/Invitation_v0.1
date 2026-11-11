import { create } from 'zustand';

export type VenueId = 'bengaluru' | 'hiremagaluru';

interface GalleryLightbox {
  image: string | null;
  caption: string;
}

interface UiStore {
  selectedVenue: VenueId;
  setSelectedVenue: (venue: VenueId) => void;

  galleryLightbox: GalleryLightbox;
  openGalleryLightbox: (image: string, caption: string) => void;
  closeGalleryLightbox: () => void;

  blessingCount: number;
  hasShowered: boolean;
  incrementBlessingShower: () => void;
  clearBlessingShowerAck: () => void;

  shareCopied: boolean;
  setShareCopied: (copied: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  selectedVenue: 'bengaluru',
  setSelectedVenue: (venue) => set({ selectedVenue: venue }),

  galleryLightbox: { image: null, caption: '' },
  openGalleryLightbox: (image, caption) =>
    set({ galleryLightbox: { image, caption } }),
  closeGalleryLightbox: () =>
    set({ galleryLightbox: { image: null, caption: '' } }),

  blessingCount: 108,
  hasShowered: false,
  incrementBlessingShower: () =>
    set((state) => ({
      blessingCount: state.blessingCount + 1,
      hasShowered: true,
    })),
  clearBlessingShowerAck: () => set({ hasShowered: false }),

  shareCopied: false,
  setShareCopied: (copied) => set({ shareCopied: copied }),
}));
