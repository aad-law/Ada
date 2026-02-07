const { Ollama } = require('ollama');

class Brain {
  constructor(personality) {
    this.ollama = new Ollama({ 
      host: 'http://localhost:11434' 
    });
    this.personality = personality;
    this.conversationHistory = [];
    this.systemPrompt = personality.getSystemPrompt();
    this.model = 'llama3.2'; // or 'llama3.1:8b' for better quality
  }

  async think(userInput) {
    this.conversationHistory.push({
      role: 'user',
      content: userInput
    });

    try {
      console.log('Ada is thinking...');
      
      const response = await this.ollama.chat({
        model: this.model,
        messages: [
          { role: 'system', content: this.systemPrompt },
          ...this.conversationHistory
        ],
        stream: false // Set to true later for streaming responses
      });

      const adaResponse = response.message.content;
      
      this.conversationHistory.push({
        role: 'assistant',
        content: adaResponse
      });

      return adaResponse;

    } catch (error) {
      console.error('Brain Error:', error.message);
      
      // Helpful error messages
      if (error.message.includes('ECONNREFUSED')) {
        return "Ollama isn't running. Start it with: ollama serve";
      }
      if (error.message.includes('not found')) {
        return `Model '${this.model}' not found. Run: ollama pull ${this.model}`;
      }
      
      return "I'm having trouble processing that right now. Could you try again?";
    }
  }

  clearMemory() {
    this.conversationHistory = [];
    console.log('Memory cleared. Starting fresh conversation.');
  }

  getConversationLength() {
    return this.conversationHistory.length;
  }

  // Method to switch models on the fly
  setModel(modelName) {
    this.model = modelName;
    console.log(`Switched to model: ${modelName}`);
  }
}

module.exports = Brain;