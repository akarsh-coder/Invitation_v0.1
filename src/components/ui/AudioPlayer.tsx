import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { musicPlayer } from '../../utils/audio';

interface AudioPlayerProps {
  className?: string;
  autoStartOnFirstInteraction?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  className = '',
  autoStartOnFirstInteraction = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (autoStartOnFirstInteraction) {
      const handleFirstClick = () => {
        if (!musicPlayer.getIsPlaying()) {
          musicPlayer.start().then((started) => {
            if (started) setIsPlaying(true);
          });
        }
        window.removeEventListener('click', handleFirstClick);
      };
      window.addEventListener('click', handleFirstClick, { once: true });
      return () => window.removeEventListener('click', handleFirstClick);
    }
  }, [autoStartOnFirstInteraction]);

  const toggleMusic = async () => {
    if (isPlaying) {
      musicPlayer.stop();
      setIsPlaying(false);
    } else {
      const started = await musicPlayer.start();
      if (started) {
        setIsPlaying(true);
      }
    }
  };

  return (
    <button
      onClick={toggleMusic}
      type="button"
      className={`group flex items-center space-x-2 bg-[#FDFBF7]/90 backdrop-blur-md border border-gold-500/50 hover:border-gold-500 px-3.5 py-1.5 rounded-full shadow-gold-subtle text-xs font-medium text-maroon-800 transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      title={isPlaying ? 'Mute Ambient Music' : 'Play Ambient Wedding Melody'}
      aria-label="Toggle ambient wedding melody"
    >
      <div className="relative text-gold-600 group-hover:text-gold-500 transition-colors">
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </div>

      <span className="hidden sm:inline font-sans text-xs">
        {isPlaying ? 'Ambient Music' : 'Music Off'}
      </span>

      {/* Animated Equalizer Waves */}
      {isPlaying && (
        <div className="flex items-end space-x-0.5 h-3 ml-1">
          <span className="w-0.5 bg-gold-600 rounded-full animate-pulse h-2" />
          <span className="w-0.5 bg-gold-500 rounded-full animate-pulse h-3 delay-75" />
          <span className="w-0.5 bg-gold-600 rounded-full animate-pulse h-1.5 delay-150" />
        </div>
      )}
    </button>
  );
};
