const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg('input.mp4')
  .output('output.mp4')
  .withVideoCodec('libx264')
  .on('end', () => console.log('Erfolg!'))
  .on('error', (err) => console.error('Fehler:', err))
  .run();
