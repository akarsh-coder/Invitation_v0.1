# HOW TO ADD YOUR OWN WEDDING MUSIC
==================================

1. Copy your audio file (e.g. background.mp3, nadaswaram.mp3, wedding-song.mp3) into this folder:
   Invitation_v0.1/public/music/

   Example:
   Invitation_v0.1/public/music/background.mp3

2. In src/data/weddingContent.ts:
   Ensure `musicUrl` points to your audio file:
   musicUrl: '/music/background.mp3'

Supported formats: .mp3, .m4a, .wav, .ogg

NOTE: If no file is added or if the file cannot be loaded, the application will automatically fall back to the built-in ambient flute synthesizer so the audio button always works smoothly!
