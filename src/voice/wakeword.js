class WakeWordDetector {
  constructor(callback) {
    this.callback = callback;
    this.isListening = false;
  }

  start() {
    this.isListening = true;
    console.log('👂 Listening for "Hey Ada"...');
    // Implementation using Porcupine or Snowboy
  }

  stop() {
    this.isListening = false;
  }
}

module.exports = WakeWordDetector;