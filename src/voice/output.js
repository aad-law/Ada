const say = require('say');

class VoiceOutput {
  constructor() {
    this.enabled = false;
    this.voice = null; // null = system default
    this.speed = 1.0;
  }

  speak(text, callback) {
    if (!this.enabled) {
      if (callback) callback();
      return;
    }

    say.speak(text, this.voice, this.speed, callback);
  }

  enable() {
    this.enabled = true;
    console.log('🔊 Voice output enabled');
  }

  disable() {
    this.enabled = false;
    console.log('🔇 Voice output disabled');
  }

  stop() {
    say.stop();
  }

  // Get available voices
  getVoices() {
    return new Promise((resolve, reject) => {
      say.getInstalledVoices((err, voices) => {
        if (err) reject(err);
        else resolve(voices);
      });
    });
  }

  setVoice(voiceName) {
    this.voice = voiceName;
    console.log(`Voice set to: ${voiceName}`);
  }

  setSpeed(speed) {
    this.speed = speed;
    console.log(`Speed set to: ${speed}`);
  }
}

module.exports = VoiceOutput;