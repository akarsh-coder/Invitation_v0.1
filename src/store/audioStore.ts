import { create } from 'zustand';
import { musicPlayer } from '../utils/audio';

interface AudioStore {
  isPlaying: boolean;
  syncFromPlayer: () => void;
  toggle: () => Promise<boolean>;
}

let unsubscribePlayer: (() => void) | null = null;

export const useAudioStore = create<AudioStore>((set) => ({
  isPlaying: musicPlayer.getIsPlaying(),
  syncFromPlayer: () => {
    if (unsubscribePlayer) return;
    unsubscribePlayer = musicPlayer.subscribe((isPlaying) => set({ isPlaying }));
  },
  toggle: async () => {
    const next = await musicPlayer.toggle();
    set({ isPlaying: next });
    return next;
  },
}));

export function initAudioStore(): void {
  useAudioStore.getState().syncFromPlayer();
}
