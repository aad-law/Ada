const readline = require('readline');
const Personality = require('./src/personality');
const AIBrain = require('./src/brain');
const AdaBrain = require('./src/adaBrain');
const VoiceOutput = require('./src/voice/output');

class Ada {
  constructor() {
    this.personality = new Personality();
    this.adaBrain = new AdaBrain();
    this.aiBrain = new AIBrain(this.personality);
    this.voice = new VoiceOutput();
    this.isRunning = false;
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    console.clear();
    console.log('╔════════════════════════════════════════╗');
    console.log('║   ADA - YOUR Personal AI Assistant     ║');
    console.log('║   Named after Ada Lovelace             ║');
    console.log('╚════════════════════════════════════════╝\n');
    
    const greeting = this.personality.getGreeting();
    console.log(greeting);
    this.voice.speak(greeting); // ADA SPEAKS!
    
    console.log('\nCommands: exit, clear, stats, mode, voice, mute\n');
    
    this.isRunning = true;
    this.listen();
  }

  listen() {
    this.rl.question('You: ', async (input) => {
      if (!this.isRunning) return;

      const userInput = input.trim();

      // Voice control commands
      if (userInput.toLowerCase() === 'voice') {
        this.voice.enable();
        this.listen();
        return;
      }

      if (userInput.toLowerCase() === 'mute') {
        this.voice.disable();
        this.listen();
        return;
      }

      if (userInput.toLowerCase() === 'voices') {
        const voices = await this.voice.getVoices();
        console.log('\nAvailable voices:', voices);
        this.listen();
        return;
      }

      if (userInput.toLowerCase().startsWith('setvoice:')) {
        const voiceName = userInput.split(':')[1].trim();
        this.voice.setVoice(voiceName);
        this.listen();
        return;
      }

      if (userInput.toLowerCase() === 'exit') {
        this.stop();
        return;
      }

      if (userInput.toLowerCase() === 'clear') {
        this.aiBrain.clearMemory();
        this.adaBrain.memory.clear();
        console.log('All memory cleared.\n');
        this.listen();
        return;
      }

      if (userInput.toLowerCase() === 'mode') {
        console.log('\n📊 Current capabilities:');
        console.log('✅ Greetings (YOUR logic)');
        console.log('✅ Math calculations (YOUR logic)');
        console.log('✅ Time/Date (YOUR logic)');
        console.log('✅ Memory (YOUR logic)');
        console.log('🔊 Voice output (enabled:', this.voice.enabled + ')');
        console.log('🤖 Complex questions (AI fallback)\n');
        this.listen();
        return;
      }

      if (!userInput) {
        this.listen();
        return;
      }

      try {
        let response = this.adaBrain.process(userInput);
        
        if (response) {
          console.log(`\n🧠 [Ada's Logic]\nAda: ${response}\n`);
          this.voice.speak(response); // ADA SPEAKS HER RESPONSE
        } else {
          console.log('🤖 [AI Fallback] Ada is thinking...');
          response = await this.aiBrain.think(userInput);
          console.log(`\nAda: ${response}\n`);
          this.voice.speak(response); // ADA SPEAKS AI RESPONSE
        }
        
      } catch (error) {
        console.error('Error:', error.message);
      }

      this.listen();
    });
  }

  stop() {
    const goodbye = this.personality.getGoodbye();
    console.log(`\n${goodbye}`);
    this.voice.speak(goodbye, () => {
      this.isRunning = false;
      this.rl.close();
      process.exit(0);
    });
  }
}

const ada = new Ada();
ada.start();

process.on('SIGINT', () => {
  ada.stop();
});