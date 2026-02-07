const Parser = require('rss-parser');

class NewsCommand {
  constructor() {
    this.parser = new Parser();
    this.sources = {
      tech: 'https://news.ycombinator.com/rss',
      world: 'http://feeds.bbci.co.uk/news/world/rss.xml',
      science: 'https://www.reddit.com/r/science/.rss'
    };
  }

  async getNews(category = 'tech', limit = 3) {
    try {
      const feed = await this.parser.parseURL(this.sources[category] || this.sources.tech);
      const headlines = feed.items.slice(0, limit).map((item, index) => 
        `${index + 1}. ${item.title}`
      ).join('\n');
      
      return `Here are the top ${limit} ${category} headlines:\n${headlines}`;
    } catch (error) {
      return "I couldn't fetch the news right now. Please try again.";
    }
  }
}

module.exports = NewsCommand;