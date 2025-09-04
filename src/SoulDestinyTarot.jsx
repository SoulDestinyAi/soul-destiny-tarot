import React, { useState } from 'react';
import { Shuffle, Heart, Star, DollarSign, Briefcase, Sparkles } from 'lucide-react';

const SoulDestinyTarot = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [reading, setReading] = useState('');
  const [readingType, setReadingType] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showReading, setShowReading] = useState(false);

  // Complete 78-card tarot deck with meanings
  const tarotCards = [
    // Major Arcana
    { id: 0, name: "The Fool", suit: "Major Arcana", meaning: "new beginnings, innocence, adventure, taking a leap of faith" },
    { id: 1, name: "The Magician", suit: "Major Arcana", meaning: "manifestation, willpower, creation, having the tools needed" },
    { id: 2, name: "The High Priestess", suit: "Major Arcana", meaning: "intuition, mystery, inner wisdom, spiritual insight" },
    { id: 3, name: "The Empress", suit: "Major Arcana", meaning: "fertility, nurturing, abundance, creative expression" },
    { id: 4, name: "The Emperor", suit: "Major Arcana", meaning: "authority, structure, leadership, fatherly guidance" },
    { id: 5, name: "The Hierophant", suit: "Major Arcana", meaning: "tradition, spiritual guidance, conformity, education" },
    { id: 6, name: "The Lovers", suit: "Major Arcana", meaning: "love, harmony, relationships, important choices" },
    { id: 7, name: "The Chariot", suit: "Major Arcana", meaning: "determination, control, victory, moving forward" },
    { id: 8, name: "Strength", suit: "Major Arcana", meaning: "inner strength, courage, patience, gentle power" },
    { id: 9, name: "The Hermit", suit: "Major Arcana", meaning: "soul searching, inner guidance, solitude, seeking truth" },
    { id: 10, name: "Wheel of Fortune", suit: "Major Arcana", meaning: "change, cycles, destiny, good fortune" },
    { id: 11, name: "Justice", suit: "Major Arcana", meaning: "fairness, truth, cause and effect, law" },
    { id: 12, name: "The Hanged Man", suit: "Major Arcana", meaning: "suspension, letting go, sacrifice, new perspective" },
    { id: 13, name: "Death", suit: "Major Arcana", meaning: "transformation, endings, change, renewal" },
    { id: 14, name: "Temperance", suit: "Major Arcana", meaning: "balance, moderation, patience, harmony" },
    { id: 15, name: "The Devil", suit: "Major Arcana", meaning: "bondage, materialism, ignorance, breaking free" },
    { id: 16, name: "The Tower", suit: "Major Arcana", meaning: "sudden change, upheaval, awakening, liberation" },
    { id: 17, name: "The Star", suit: "Major Arcana", meaning: "hope, inspiration, healing, renewal" },
    { id: 18, name: "The Moon", suit: "Major Arcana", meaning: "illusion, fear, anxiety, intuition, dreams" },
    { id: 19, name: "The Sun", suit: "Major Arcana", meaning: "joy, success, vitality, enlightenment" },
    { id: 20, name: "Judgement", suit: "Major Arcana", meaning: "rebirth, awakening, forgiveness, evaluation" },
    { id: 21, name: "The World", suit: "Major Arcana", meaning: "completion, accomplishment, fulfillment, wholeness" },

    // Cups (Emotions/Love)
    { id: 22, name: "Ace of Cups", suit: "Cups", meaning: "new love, emotional awakening, creativity, intuition" },
    { id: 23, name: "Two of Cups", suit: "Cups", meaning: "partnership, mutual attraction, unity, love" },
    { id: 24, name: "Three of Cups", suit: "Cups", meaning: "celebration, friendship, creativity, community" },
    { id: 25, name: "Four of Cups", suit: "Cups", meaning: "apathy, contemplation, missed opportunities" },
    { id: 26, name: "Five of Cups", suit: "Cups", meaning: "loss, grief, disappointment, mourning" },
    { id: 27, name: "Six of Cups", suit: "Cups", meaning: "nostalgia, childhood, innocence, generosity" },
    { id: 28, name: "Seven of Cups", suit: "Cups", meaning: "choices, wishful thinking, illusion, fantasy" },
    { id: 29, name: "Eight of Cups", suit: "Cups", meaning: "abandonment, withdrawal, seeking higher purpose" },
    { id: 30, name: "Nine of Cups", suit: "Cups", meaning: "contentment, satisfaction, emotional fulfillment" },
    { id: 31, name: "Ten of Cups", suit: "Cups", meaning: "happiness, harmony, emotional fulfillment" },
    { id: 32, name: "Page of Cups", suit: "Cups", meaning: "creative opportunities, intuitive messages, curiosity" },
    { id: 33, name: "Knight of Cups", suit: "Cups", meaning: "romance, charm, being in love, following the heart" },
    { id: 34, name: "Queen of Cups", suit: "Cups", meaning: "emotional nurturing, compassion, calm, comfort" },
    { id: 35, name: "King of Cups", suit: "Cups", meaning: "emotional balance, compassion, diplomacy" },

    // Wands (Career/Passion)
    { id: 36, name: "Ace of Wands", suit: "Wands", meaning: "inspiration, creative spark, new opportunities" },
    { id: 37, name: "Two of Wands", suit: "Wands", meaning: "planning, making decisions, leaving comfort zone" },
    { id: 38, name: "Three of Wands", suit: "Wands", meaning: "expansion, foresight, overseas opportunities" },
    { id: 39, name: "Four of Wands", suit: "Wands", meaning: "celebration, harmony, home, marriage" },
    { id: 40, name: "Five of Wands", suit: "Wands", meaning: "conflict, disagreements, competition, tension" },
    { id: 41, name: "Six of Wands", suit: "Wands", meaning: "victory, public recognition, progress, self-confidence" },
    { id: 42, name: "Seven of Wands", suit: "Wands", meaning: "challenge, perseverance, maintaining control" },
    { id: 43, name: "Eight of Wands", suit: "Wands", meaning: "speed, rapid action, movement, quick decisions" },
    { id: 44, name: "Nine of Wands", suit: "Wands", meaning: "resilience, persistence, last stand, boundaries" },
    { id: 45, name: "Ten of Wands", suit: "Wands", meaning: "burden, extra responsibility, hard work, completion" },
    { id: 46, name: "Page of Wands", suit: "Wands", meaning: "inspiration, ideas, discovery, limitless potential" },
    { id: 47, name: "Knight of Wands", suit: "Wands", meaning: "energy, passion, adventure, impulsiveness" },
    { id: 48, name: "Queen of Wands", suit: "Wands", meaning: "courage, confidence, independence, social butterfly" },
    { id: 49, name: "King of Wands", suit: "Wands", meaning: "leadership, vision, honor, determination" },

    // Pentacles (Money/Material)
    { id: 50, name: "Ace of Pentacles", suit: "Pentacles", meaning: "new financial opportunity, manifestation, abundance" },
    { id: 51, name: "Two of Pentacles", suit: "Pentacles", meaning: "multiple priorities, time management, adaptability" },
    { id: 52, name: "Three of Pentacles", suit: "Pentacles", meaning: "teamwork, collaboration, learning, implementation" },
    { id: 53, name: "Four of Pentacles", suit: "Pentacles", meaning: "saving money, security, conservatism, scarcity" },
    { id: 54, name: "Five of Pentacles", suit: "Pentacles", meaning: "financial loss, poverty, lack mindset, isolation" },
    { id: 55, name: "Six of Pentacles", suit: "Pentacles", meaning: "generosity, charity, sharing wealth, community" },
    { id: 56, name: "Seven of Pentacles", suit: "Pentacles", meaning: "assessment, hard work, perseverance, investment" },
    { id: 57, name: "Eight of Pentacles", suit: "Pentacles", meaning: "apprenticeship, repetitive tasks, mastery, skill development" },
    { id: 58, name: "Nine of Pentacles", suit: "Pentacles", meaning: "abundance, luxury, self-reliance, financial independence" },
    { id: 59, name: "Ten of Pentacles", suit: "Pentacles", meaning: "wealth, financial security, family, long-term success" },
    { id: 60, name: "Page of Pentacles", suit: "Pentacles", meaning: "learning, studying, new ideas, financial opportunities" },
    { id: 61, name: "Knight of Pentacles", suit: "Pentacles", meaning: "hard work, productivity, routine, conservatism" },
    { id: 62, name: "Queen of Pentacles", suit: "Pentacles", meaning: "practical, homely, motherly, down-to-earth" },
    { id: 63, name: "King of Pentacles", suit: "Pentacles", meaning: "financial success, leadership, security, generosity" },

    // Swords (Mind/Challenges)
    { id: 64, name: "Ace of Swords", suit: "Swords", meaning: "breakthroughs, new ideas, mental clarity, communication" },
    { id: 65, name: "Two of Swords", suit: "Swords", meaning: "difficult decisions, weighing options, indecision" },
    { id: 66, name: "Three of Swords", suit: "Swords", meaning: "heartbreak, emotional pain, sorrow, grief" },
    { id: 67, name: "Four of Swords", suit: "Swords", meaning: "rest, relaxation, meditation, contemplation" },
    { id: 68, name: "Five of Swords", suit: "Swords", meaning: "conflict, disagreements, competition, defeat" },
    { id: 69, name: "Six of Swords", suit: "Swords", meaning: "transition, change, rite of passage, releasing baggage" },
    { id: 70, name: "Seven of Swords", suit: "Swords", meaning: "betrayal, deception, getting away with something" },
    { id: 71, name: "Eight of Swords", suit: "Swords", meaning: "negative thinking, restricted freedom, imprisonment" },
    { id: 72, name: "Nine of Swords", suit: "Swords", meaning: "anxiety, worry, fear, depression, nightmares" },
    { id: 73, name: "Ten of Swords", suit: "Swords", meaning: "painful endings, deep wounds, betrayal, loss" },
    { id: 74, name: "Page of Swords", suit: "Swords", meaning: "new ideas, curiosity, thirst for knowledge, communication" },
    { id: 75, name: "Knight of Swords", suit: "Swords", meaning: "ambitious, action-oriented, driven to succeed" },
    { id: 76, name: "Queen of Swords", suit: "Swords", meaning: "independent, unbiased judgment, clear boundaries" },
    { id: 77, name: "King of Swords", suit: "Swords", meaning: "mental clarity, intellectual power, authority, truth" }
  ];

  // Reading types
  const readingTypes = {
    general: { name: "General Life", icon: Star, color: "from-purple-400 to-pink-400" },
    love: { name: "Love & Romance", icon: Heart, color: "from-pink-400 to-red-400" },
    career: { name: "Career & Success", icon: Briefcase, color: "from-blue-400 to-green-400" },
    money: { name: "Money & Finance", icon: DollarSign, color: "from-green-400 to-yellow-400" }
  };

  // Shuffle deck and select cards
  const shuffleDeck = () => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3); // Always draw 3 cards
  };

  // Enhanced reading generation with Claude API
  const generateReading = async (cards, questionType) => {
    setIsLoading(true);
    
    try {
      // Prepare card information for Claude
      const cardDetails = cards.map((card, index) => {
        const positions = {
          general: ["Past/Foundation", "Present/Current Energy", "Future/Outcome"],
          love: ["Your Heart", "Love Energy", "Relationship Path"],
          career: ["Current Position", "Opportunities/Challenges", "Career Outcome"],
          money: ["Current Financial State", "Money Flow Energy", "Financial Future"]
        };
        
        return {
          position: positions[questionType][index],
          card: card.name,
          suit: card.suit,
          meaning: card.meaning
        };
      });

      // Create detailed prompt for Claude
      const prompt = `You are Astrologer Chanakk Gupta, a professional tarot reader providing authentic spiritual guidance through the Soul Destiny Tarot app.

READING REQUEST:
- Reading Type: ${questionType.charAt(0).toUpperCase() + questionType.slice(1)} Reading
- Cards Drawn: 3 cards in spread

CARDS AND POSITIONS:
${cardDetails.map((card, i) => 
  `${i + 1}. Position: ${card.position}
     Card: ${card.card} (${card.suit})
     Traditional Meaning: ${card.meaning}`
).join('\n\n')}

Please provide a personalized, authentic tarot reading that:
1. Acknowledges each card's traditional meaning and position significance
2. Weaves the three cards together into a cohesive spiritual message
3. Provides specific, actionable guidance based on the card combination
4. Uses warm, professional spiritual language befitting your expertise
5. Offers hope, empowerment, and practical wisdom
6. Maintains the mystical yet grounded approach of a professional astrologer

Format as a flowing, conversational reading (not bullet points), approximately 250-300 words. Begin with a brief spiritual greeting, interpret each card in its position context, then synthesize the overall message with practical guidance and encouragement.

Remember: You are known for combining ancient wisdom with practical modern guidance, helping people navigate their soul's destiny with clarity and compassion.`;

      // Call Claude API
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const claudeReading = data.content[0].text;
      
      setReading(claudeReading);
      
    } catch (error) {
      console.error("Claude API error:", error);
      
      // Enhanced fallback reading
      const enhancedReading = generateEnhancedReading(cards, questionType);
      setReading(enhancedReading);
    } finally {
      setIsLoading(false);
      setShowReading(true);
    }
  };

  // Enhanced fallback function
  const generateEnhancedReading = (cards, questionType) => {
    const readingIntros = {
      general: "🔮 The cosmic energies reveal your life's path through these sacred cards...",
      love: "💖 The universe speaks of matters of the heart through divine wisdom...",
      career: "⭐ Your professional journey unfolds through celestial guidance...",
      money: "💰 The material realm and abundance energies illuminate your path..."
    };

    const positions = {
      general: ["Past/Foundation", "Present Energy", "Future Outcome"],
      love: ["Your Heart", "Love Energy", "Relationship Path"],
      career: ["Current Position", "Opportunities/Challenges", "Career Outcome"],
      money: ["Current Financial State", "Money Flow Energy", "Financial Future"]
    };

    let reading = `${readingIntros[questionType]}\n\n`;
    
    cards.forEach((card, index) => {
      reading += `**${positions[questionType][index]}: ${card.name}**\n`;
      reading += `${card.meaning.charAt(0).toUpperCase() + card.meaning.slice(1)}. `;
      reading += `This card illuminates the energy of ${positions[questionType][index].toLowerCase()}, guiding you toward greater understanding.\n\n`;
    });

    reading += `**Divine Guidance:**\n`;
    reading += `The sacred trinity of cards reveals a profound journey. ${cards[0].name} establishes your foundation, showing that ${cards[0].meaning.split(',')[0]} has shaped your path. `;
    reading += `${cards[1].name} illuminates your present moment, where ${cards[1].meaning.split(',')[0]} is your current focus. `;
    reading += `Finally, ${cards[2].name} promises that ${cards[2].meaning.split(',')[0]} awaits in your future.\n\n`;
    
    reading += `Trust in the cosmic timing of your journey. The universe conspires to support your highest good, and these cards are a reminder that you possess the inner wisdom to navigate any challenge with grace and strength.\n\n`;
    reading += `✨ **Blessings and divine light upon your path** ✨\n`;
    reading += `*- Astrologer Chanakk Gupta*`;

    return reading;
  };

  // Draw cards function
  const drawCards = () => {
    if (isLoading) return;
    
    const newCards = shuffleDeck();
    setSelectedCards(newCards);
    generateReading(newCards, readingType);
  };

  // Start new reading
  const startNewReading = () => {
    setSelectedCards([]);
    setReading('');
    setShowReading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            🔮 Soul Destiny Tarot
          </h1>
          <p className="text-2xl text-purple-200 mb-2">by Astrologer Chanakk Gupta</p>
          <p className="text-purple-300">Authentic Spiritual Guidance Through Ancient Wisdom</p>
        </div>

        {!showReading ? (
          <div className="max-w-4xl mx-auto">
            {/* Reading Type Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Sacred Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(readingTypes).map(([key, type]) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setReadingType(key)}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        readingType === key
                          ? 'border-yellow-400 bg-gradient-to-r shadow-lg shadow-yellow-400/25'
                          : 'border-purple-400 hover:border-pink-400 bg-white/5'
                      } ${type.color} ${readingType === key ? 'from-yellow-400/20 to-yellow-600/20' : ''}`}
                    >
                      <Icon className="w-12 h-12 mx-auto mb-3" />
                      <div className="text-lg font-bold">{type.name}</div>
                      <div className="text-sm text-purple-300 mt-2">
                        {key === 'general' && 'Past • Present • Future'}
                        {key === 'love' && 'Heart • Energy • Path'}
                        {key === 'career' && 'Position • Challenge • Outcome'}
                        {key === 'money' && 'Current • Flow • Future'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Draw Cards Section */}
            <div className="text-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/50">
                <h3 className="text-xl font-semibold mb-4">
                  Ready for Your {readingTypes[readingType].name} Reading?
                </h3>
                <p className="text-purple-200 mb-6">
                  Focus your intention and let the universe guide you to the cards meant for your highest good.
                </p>
                
                <button
                  onClick={drawCards}
                  disabled={isLoading}
                  className={`px-8 py-4 rounded-full text-xl font-bold transition-all transform ${
                    isLoading 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 shadow-lg'
                  }`}
                >
                  <Shuffle className="inline mr-3" size={24} />
                  {isLoading ? 'Channeling Divine Wisdom...' : 'Draw Your Sacred Cards'}
                </button>
              </div>
            </div>

            {/* Selected Cards Preview */}
            {selectedCards.length > 0 && !showReading && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">Your Sacred Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedCards.map((card, index) => {
                    const positions = {
                      general: ["Past/Foundation", "Present Energy", "Future Outcome"],
                      love: ["Your Heart", "Love Energy", "Relationship Path"],
                      career: ["Current Position", "Opportunities", "Career Outcome"],
                      money: ["Current State", "Energy Flow", "Financial Future"]
                    };
                    
                    return (
                      <div key={card.id} className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-6 rounded-xl border border-purple-400/50">
                        <div className="text-center">
                          <div className="text-sm font-medium text-purple-300 mb-2">
                            {positions[readingType][index]}
                          </div>
                          <div className="text-xl font-bold text-yellow-400 mb-2">{card.name}</div>
                          <div className="text-sm text-purple-200">{card.suit}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Reading Display */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/50 mb-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4 text-center">
                  Your {readingTypes[readingType].name} Reading
                </h2>
                
                {/* Cards Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {selectedCards.map((card, index) => {
                    const positions = {
                      general: ["Past/Foundation", "Present Energy", "Future Outcome"],
                      love: ["Your Heart", "Love Energy", "Relationship Path"],
                      career: ["Current Position", "Opportunities", "Career Outcome"],
                      money: ["Current State", "Energy Flow", "Financial Future"]
                    };
                    
                    return (
                      <div key={card.id} className="bg-gradient-to-br from-purple-600/30 to-pink-600/20 p-6 rounded-xl border border-purple-400/50">
                        <div className="text-center">
                          <div className="text-sm font-medium text-purple-300 mb-2">
                            {positions[readingType][index]}
                          </div>
                          <div className="text-xl font-bold text-yellow-400 mb-2">{card.name}</div>
                          <div className="text-sm text-purple-200 mb-3">{card.suit}</div>
                          <div className="text-xs text-purple-300 italic">
                            {card.meaning}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Reading Text */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-purple-100 leading-relaxed whitespace-pre-wrap">
                  {reading}
                </div>
              </div>
            </div>

            {/* New Reading Button */}
            <div className="text-center">
              <button
                onClick={startNewReading}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
              >
                <Sparkles className="inline mr-3" size={24} />
                Draw New Cards
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-purple-300">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg mb-2">✨ Guided by Ancient Wisdom & Cosmic Energy ✨</p>
            <p className="text-sm">
              Professional spiritual guidance through the mystical art of tarot reading
            </p>
            <p className="text-sm mt-4 text-purple-400">
              🌟 For personal consultations, connect with Astrologer Chanakk Gupta 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulDestinyTarot;
