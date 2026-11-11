import { create } from 'zustand';

interface InvitationStore {
  hasOpenedInvitation: boolean;
  openInvitation: () => void;
}

export const useInvitationStore = create<InvitationStore>((set) => ({
  hasOpenedInvitation: false,
  openInvitation: () => set({ hasOpenedInvitation: true }),
}));
