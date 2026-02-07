const recorder = require('node-record-lpcm16');
const fs = require('fs');

class VoiceInput {
  constructor() {
    this.isRecording = false;
    this.recordingStream = null;
    this.audioFile = './temp_audio.wav';
  }

  startRecording() {
    return new Promise((resolve, reject) => {
      console.log('🎤 Recording... (speak now, press Ctrl+C when done)');
      
      this.isRecording = true;
      const file = fs.createWriteStream(this.audioFile, { encoding: 'binary' });

      this.recordingStream = recorder.record({
        sampleRate: 16000,
        channels: 1,
        audioType: 'wav',
        threshold: 0.5,
        silence: '3.0', // Stop after 3 seconds of silence
        verbose: false
      });

      this.recordingStream.stream()
        .pipe(file)
        .on('finish', () => {
          console.log('✅ Recording finished');
          this.isRecording = false;
          resolve(this.audioFile);
        })
        .on('error', (err) => {
          console.error('❌ Recording error:', err);
          reject(err);
        });
    });
  }

  stopRecording() {
    if (this.recordingStream) {
      this.recordingStream.stop();
      this.isRecording = false;
      console.log('🛑 Recording stopped');
    }
  }

  // This will be implemented based on which transcription service you choose
  async transcribe(audioFile) {
    // Placeholder - we'll implement this next
    return null;
  }
}

module.exports = VoiceInput;