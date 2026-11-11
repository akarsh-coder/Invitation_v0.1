import { create } from 'zustand';
import { weddingContent as initialContent } from '../data/weddingContent';
import type { WeddingContent } from '../types/wedding';

interface WeddingStore {
  content: WeddingContent;
}

export const useWeddingStore = create<WeddingStore>(() => ({
  content: initialContent,
}));

/** Static invitation copy — use in components instead of prop drilling. */
export const useWeddingContent = () => useWeddingStore((state) => state.content);
