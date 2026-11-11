import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioStore } from '../../store/audioStore';

interface AudioPlayerProps {
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ className = '' }) => {
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const toggle = useAudioStore((state) => state.toggle);

  const label = isPlaying ? 'Music on' : 'Music off';

  return (
    <button
      onClick={() => {
        toggle().catch(() => {});
      }}
      type="button"
      className={`flex items-center gap-2 bg-[#FDFBF7]/90 backdrop-blur-md border border-gold-500/50 hover:border-gold-500 px-3.5 py-1.5 rounded-full shadow-gold-subtle text-xs font-medium text-maroon-800 transition-colors ${className}`}
      aria-pressed={isPlaying}
      aria-label="Wedding music"
    >
      <span className="text-gold-600">
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </span>

      <span className="hidden sm:inline font-sans text-xs">{label}</span>

      {isPlaying && (
        <span className="flex items-end gap-0.5 h-3" aria-hidden="true">
          <span className="w-0.5 bg-gold-600 rounded-full animate-pulse h-2" />
          <span className="w-0.5 bg-gold-500 rounded-full animate-pulse h-3 delay-75" />
          <span className="w-0.5 bg-gold-600 rounded-full animate-pulse h-1.5 delay-150" />
        </span>
      )}
    </button>
  );
};
