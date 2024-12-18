const fs = require('fs');
const { exec } = require('child_process');

// Eingabe- und Ausgabepfade
const inputFile = './input_video.mp4';
const outputFile = './output_video.mp4';

if (!fs.existsSync(inputFile)) {
  console.error('Eingabevideo nicht gefunden:', inputFile);
  process.exit(1);
}

console.log('Eingabevideo gefunden:', inputFile);

// Zufällige Werte für die Anpassungen generieren
const rotateAngle = (Math.random() * 4 - 2).toFixed(2); // Drehung zwischen -2 und 2 Grad
const brightness = (Math.random() * 0.3 - 0.15).toFixed(2); // Helligkeit zwischen -0.15 und 0.15
const contrast = (Math.random() * 0.4 + 0.8).toFixed(2); // Kontrast zwischen 0.8 und 1.2
const zoom = (Math.random() * 0.1 + 1).toFixed(2); // Zoom zwischen 1.0 und 1.1
const cropX = Math.floor(Math.random() * 20); // Zufälliges Crop X
const cropY = Math.floor(Math.random() * 20); // Zufälliges Crop Y
const hueShift = (Math.random() * 60 - 30).toFixed(2); // Farbverschiebung
const noise = Math.random() > 0.5 ? ',noise=alls=20:allf=t+u' : ''; // Optionales visuelles Rauschen
const speed = (Math.random() * (1.1 - 0.9) + 0.9).toFixed(2); // Geschwindigkeit 0.9x bis 1.1x

// Audio-Effekte
const pitchShift = Math.random() > 0.5 ? 'asetrate=44100*1.05,aresample=44100' : '';
const audioFilter = [pitchShift, `atempo=${speed}`].filter(Boolean).join(',');

// FFMPEG-Befehl
const ffmpegCommand = `ffmpeg -i ${inputFile} -y ` +
  `-vf "rotate=${rotateAngle}*PI/180,eq=brightness=${brightness}:contrast=${contrast},` +
  `zoompan=z='min(zoom+0.001,${zoom})':d=1:x=${cropX}:y=${cropY},hue=h=${hueShift}${noise}" ` +
  `-af "${audioFilter}" ${outputFile}`;

// FFMPEG ausführen
console.log('Verarbeitung gestartet:', ffmpegCommand);

exec(ffmpegCommand, (error, stdout, stderr) => {
  if (error) {
    console.error('Fehler bei der Verarbeitung des Videos:', error);
    return;
  }
  console.log('Verarbeitung abgeschlossen. Ausgabedatei:', outputFile);
});
