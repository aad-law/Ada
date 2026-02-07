class AdaBrain {
  constructor() {
    this.name = "Ada";
    this.memory = new Map(); // Remember things across conversation
    this.userPreferences = {};
  }

  // YOUR LOGIC - No AI needed for these
  process(input) {
    const lowerInput = input.toLowerCase().trim();

    // Pattern matching - YOUR rules
    if (this.isGreeting(lowerInput)) {
      return this.handleGreeting();
    }

    if (this.isAboutAda(lowerInput)) {
      return this.introduceMyself();
    }

    if (this.isMathQuestion(lowerInput)) {
      return this.handleMath(input);
    }

    if (this.isTimeQuestion(lowerInput)) {
      return this.handleTime();
    }

    if (this.isDateQuestion(lowerInput)) {
      return this.handleDate();
    }

    if (this.isRememberRequest(lowerInput)) {
      return this.handleRemember(input);
    }

    if (this.isRecallRequest(lowerInput)) {
      return this.handleRecall(input);
    }

    // If no pattern matches, return null (fallback to AI)
    return null;
  }

  // YOUR PATTERNS
  isGreeting(input) {
    return /^(hi|hello|hey|greetings|good morning|good afternoon)/.test(input);
  }

  isAboutAda(input) {
    return input.includes("who are you") || 
           input.includes("what are you") ||
           input.includes("tell me about yourself");
  }

  isMathQuestion(input) {
    return /\d+\s*[\+\-\*\/]\s*\d+/.test(input) ||
           input.includes("calculate") ||
           input.includes("what's") && /\d+/.test(input);
  }

  isTimeQuestion(input) {
    return input.includes("time") || input.includes("what time");
  }

  isDateQuestion(input) {
    return input.includes("date") || input.includes("what day") || input.includes("today");
  }

  isRememberRequest(input) {
    return input.includes("remember") && !input.includes("do you remember");
  }

  isRecallRequest(input) {
    return input.includes("do you remember") || input.includes("what did i");
  }

  // YOUR RESPONSES - No AI, pure logic
  handleGreeting() {
    const greetings = [
      "Hello! Ada here. What would you like to work on?",
      "Hi! I'm Ada, ready to assist.",
      "Greetings! What computational challenge shall we tackle?",
      "Hey! Ada at your service."
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  introduceMyself() {
    return `I'm Ada, YOUR personal AI assistant. I'm named after Ada Lovelace (1815-1852), who wrote the first computer algorithm. I'm here to help with calculations, information, reminders, and whatever else you need. What sets me apart? I'm built specifically for YOU, learning your preferences and adapting to your needs.`;
  }

  handleMath(input) {
    try {
      // Extract math expression
      const mathExpression = input.match(/[\d\+\-\*\/\.\(\)\s]+/)[0];
      // Safe eval alternative (or use math.js library)
      const result = Function(`'use strict'; return (${mathExpression})`)();
      return `That equals ${result}. Need another calculation?`;
    } catch (error) {
      return "I couldn't parse that math expression. Try something like: 15 * 23";
    }
  }

  handleTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    return `It's currently ${timeString}.`;
  }

  handleDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    return `Today is ${dateString}.`;
  }

  handleRemember(input) {
    // Extract what to remember
    const toRemember = input.replace(/remember that|remember|please remember/gi, '').trim();
    const key = `memory_${Date.now()}`;
    this.memory.set(key, {
      content: toRemember,
      timestamp: new Date()
    });
    return `Got it! I'll remember: "${toRemember}"`;
  }

  handleRecall(input) {
    if (this.memory.size === 0) {
      return "I don't have anything stored in memory yet.";
    }
    
    let response = "Here's what I remember:\n";
    for (const [key, value] of this.memory) {
      response += `- ${value.content}\n`;
    }
    return response;
  }

  
}



module.exports = AdaBrain;