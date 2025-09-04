import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Sparkles, Gem } from 'lucide-react';

const SoulDestinyTarot = () => {
  const [question, setQuestion] = useState('');
  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [theme, setTheme] = useState(0);
  const [cardReading, setCardReading] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  // Sunbreeze theme variations
  const themes = [
    { bg: 'from-yellow-200 via-orange-200 to-red-200', accent: 'orange' },
    { bg: 'from-blue-200 via-cyan-200 to-teal-200', accent: 'cyan' },
    { bg: 'from-pink-200 via-purple-200 to-indigo-200', accent: 'purple' },
    { bg: 'from-green-200 via-emerald-200 to-teal-200', accent: 'emerald' },
    { bg: 'from-rose-200 via-pink-200 to-orange-200', accent: 'rose' }
  ];

  const currentTheme = themes[theme];

  // Tarot card names
  const tarotCards = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
    "Judgement", "The World", "Ace of Wands", "Two of Wands", "Three of Wands",
    "Four of Wands", "Five of Wands", "Six of Wands", "Seven of Wands", "Eight of Wands",
    "Nine of Wands", "Ten of Wands", "Page of Wands", "Knight of Wands", "Queen of Wands",
    "King of Wands", "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups",
    "Five of Cups", "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups",
    "Ten of Cups", "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
    "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
    "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
    "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords", "Ace of Pentacles",
    "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles", "Six of Pentacles",
    "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles", "Page of Pentacles",
    "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
  ];

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Set random theme on first load
  useEffect(() => {
    setTheme(Math.floor(Math.random() * themes.length));
    setShuffledCards(shuffleArray(tarotCards));
  }, []);

  // Comprehensive tarot card meanings database with enhanced meanings
  const cardMeanings = {
    "The Fool": {
      meaning: "New beginnings, spontaneity, and taking a leap of faith. This card suggests you're at the start of an exciting journey with unlimited potential.",
      guidance: "Trust your instincts and embrace the unknown. Sometimes the best adventures begin when we step outside our comfort zone with an open heart."
    },
    "The Magician": {
      meaning: "Personal power, manifestation, and having all the tools you need. You possess the ability to turn your dreams into reality.",
      guidance: "Focus your energy and take action. You have everything within you to achieve your goals - now is the time to make it happen."
    },
    "The High Priestess": {
      meaning: "Intuition, inner wisdom, and trusting your subconscious mind. Hidden knowledge and spiritual insight are available to you.",
      guidance: "Listen to your inner voice and pay attention to your dreams and intuition. The answers you seek lie within your deeper knowing."
    },
    "The Empress": {
      meaning: "Creativity, abundance, and nurturing energy. This card represents fertility, growth, and the power of creation in all its forms.",
      guidance: "Embrace your creative side and nurture what matters to you. Allow yourself to receive abundance and share your gifts with the world."
    },
    "The Emperor": {
      meaning: "Authority, structure, and taking control of your life. This card represents leadership, stability, and the power to create order.",
      guidance: "Take charge of your situation with confidence. Create structure and boundaries that support your goals and well-being."
    },
    "The Hierophant": {
      meaning: "Tradition, spiritual guidance, and seeking wisdom from established sources. This card suggests learning from teachers or mentors.",
      guidance: "Consider seeking advice from someone with experience. Sometimes the old ways contain wisdom that can guide you forward."
    },
    "The Lovers": {
      meaning: "Love, relationships, and important choices. This card represents harmony, connection, and decisions that affect your heart.",
      guidance: "Follow your heart while using your head. Important relationships and choices require both love and wisdom to navigate successfully."
    },
    "The Chariot": {
      meaning: "Determination, willpower, and moving forward with confidence. You have the strength to overcome obstacles and achieve victory.",
      guidance: "Stay focused on your goals and maintain your determination. You have the power to steer your life in the direction you want."
    },
    "Strength": {
      meaning: "Inner strength, courage, and gentle power. This card represents overcoming challenges through patience and compassion.",
      guidance: "Approach challenges with both strength and kindness. Your gentle persistence will overcome what force cannot."
    },
    "The Hermit": {
      meaning: "Soul searching, inner guidance, and seeking truth. This card suggests a time for introspection and spiritual seeking.",
      guidance: "Take time for quiet reflection and meditation. The answers you seek will come through inner contemplation and patience."
    },
    "Wheel of Fortune": {
      meaning: "Cycles of change, destiny, and turning points. This card represents the natural ups and downs of life and new opportunities.",
      guidance: "Embrace change as a natural part of life. What seems like an ending may actually be a new beginning in disguise."
    },
    "Justice": {
      meaning: "Balance, fairness, and truth. This card represents the need for honest assessment and making decisions based on what's right.",
      guidance: "Seek truth and fairness in all your dealings. Consider all sides of the situation before making important decisions."
    },
    "The Hanged Man": {
      meaning: "Patience, surrender, and seeing things from a new perspective. Sometimes we need to let go to move forward.",
      guidance: "Practice patience and try viewing your situation from a different angle. Sometimes the best action is to wait and reflect."
    },
    "Death": {
      meaning: "Transformation, endings, and new beginnings. This card represents necessary change and the cycle of renewal.",
      guidance: "Embrace transformation and let go of what no longer serves you. Every ending creates space for something new and better."
    },
    "Temperance": {
      meaning: "Balance, moderation, and harmony. This card suggests finding the middle path and blending different aspects of your life.",
      guidance: "Seek balance and avoid extremes. The best solutions often come from combining different approaches with patience."
    },
    "The Devil": {
      meaning: "Temptation, bondage, and breaking free from limitations. This card represents recognizing what holds you back.",
      guidance: "Examine what habits or beliefs are limiting you. You have the power to break free from anything that doesn't serve your highest good."
    },
    "The Tower": {
      meaning: "Sudden change, revelation, and breaking down old structures. This card represents necessary destruction before rebuilding.",
      guidance: "Trust that sudden changes, though challenging, are clearing the way for something better. Build your new foundation on solid ground."
    },
    "The Star": {
      meaning: "Hope, inspiration, and spiritual guidance. This card represents healing, renewal, and connection to your higher purpose.",
      guidance: "Keep hope alive and trust in your dreams. You are being guided toward healing and the fulfillment of your highest aspirations."
    },
    "The Moon": {
      meaning: "Intuition, illusions, and navigating uncertainty. This card suggests things may not be as they seem on the surface.",
      guidance: "Trust your intuition and look beyond surface appearances. Take time to understand the deeper truth of your situation."
    },
    "The Sun": {
      meaning: "Joy, success, and positive energy. This card represents happiness, vitality, and the fulfillment of your goals.",
      guidance: "Embrace optimism and celebrate your achievements. Your positive energy attracts more good things into your life."
    },
    "Judgement": {
      meaning: "Rebirth, calling, and spiritual awakening. This card represents a time of evaluation and stepping into your true purpose.",
      guidance: "Listen to your inner calling and be willing to make necessary changes. You are being called to a higher purpose."
    },
    "The World": {
      meaning: "Completion, accomplishment, and fulfillment. This card represents the successful end of a cycle and integration of lessons learned.",
      guidance: "Celebrate your achievements and prepare for new adventures. You have completed an important phase of your journey."
    }
  };

  // Generate generic suit meanings for Minor Arcana with enhanced descriptions
  const generateSuitMeaning = (cardName) => {
    if (cardName.includes('Wands')) {
      return {
        meaning: "This card relates to creativity, passion, and taking action. It suggests energy and enthusiasm for pursuing your goals with determination and fire.",
        guidance: "Channel your creative energy into meaningful action. Your passion and determination will lead you to success. Trust your creative instincts."
      };
    } else if (cardName.includes('Cups')) {
      return {
        meaning: "This card relates to emotions, relationships, and intuition. It suggests matters of the heart and spiritual connection with deep emotional significance.",
        guidance: "Trust your feelings and nurture your relationships. Your emotional intelligence will guide you to the right path. Honor your heart's wisdom."
      };
    } else if (cardName.includes('Swords')) {
      return {
        meaning: "This card relates to thoughts, communication, and mental clarity. It suggests the power of clear thinking and honest communication in challenging times.",
        guidance: "Use your intellect and communicate clearly. Sometimes the truth, though challenging, is exactly what's needed. Think before you act."
      };
    } else if (cardName.includes('Pentacles')) {
      return {
        meaning: "This card relates to material matters, resources, and practical concerns. It suggests focusing on tangible goals and building lasting foundations.",
        guidance: "Take a practical approach and focus on building solid foundations. Your hard work will create lasting abundance. Be patient with material progress."
      };
    }
    return cardMeanings["The Fool"]; // Default fallback
  };

  // Enhanced reading generation with Claude API integration
  const generateReading = async (cardName, userQuestion) => {
    setIsLoading(true);
    
    try {
      // Get basic card meaning for context
      const cardData = cardMeanings[cardName] || generateSuitMeaning(cardName);
      
      // Try Claude API first for personalized reading
      const prompt = `You are Astrologer Chanakk Gupta, a professional tarot reader providing authentic spiritual guidance through the Soul Destiny Tarot app. 

READING REQUEST:
- Card Drawn: "${cardName}"
- User's Question: "${userQuestion}"
- Traditional Card Meaning: ${cardData.meaning}

Please provide a personalized tarot reading that:
1. References the traditional meaning of ${cardName}
2. Connects the card's energy to the user's specific question
3. Offers practical, actionable spiritual guidance
4. Maintains a warm, professional tone befitting your expertise
5. Provides hope and empowerment

Respond in the following JSON format:
{
  "cardMeaning": "Personalized interpretation of ${cardName} in relation to their question (2-3 sentences)",
  "guidance": "Specific spiritual guidance and practical advice based on this card and their question (2-3 sentences)"
}

Keep the language accessible, supportive, and insightful. Avoid overly mystical language while maintaining spiritual depth.

Your entire response MUST be a single, valid JSON object. DO NOT include any text outside of the JSON structure, including backticks.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.content[0].text;
      
      // Clean up response - remove any markdown formatting
      responseText = responseText.replace(/```json\s?/g, "").replace(/```\s?/g, "").trim();
      
      const claudeReading = JSON.parse(responseText);
      setIsLoading(false);
      return claudeReading;
      
    } catch (error) {
      console.error('Claude API error, using enhanced fallback:', error);
      
      // Enhanced fallback with personalized context
      setTimeout(() => setIsLoading(false), 1500); // Simulate loading for better UX
      
      const cardData = cardMeanings[cardName] || generateSuitMeaning(cardName);
      
      // Create more personalized fallback based on question context
      let personalizedMeaning = cardData.meaning;
      let personalizedGuidance = cardData.guidance;
      
      // Add question-specific context if question contains certain keywords
      if (userQuestion.toLowerCase().includes('love') || userQuestion.toLowerCase().includes('relationship')) {
        personalizedMeaning += " In matters of the heart, this card suggests emotional growth and deeper understanding.";
        personalizedGuidance += " Pay special attention to how your emotions guide you in relationships.";
      } else if (userQuestion.toLowerCase().includes('work') || userQuestion.toLowerCase().includes('career') || userQuestion.toLowerCase().includes('job')) {
        personalizedMeaning += " In your professional life, this energy indicates important developments and opportunities for growth.";
        personalizedGuidance += " Focus on how this insight can advance your career and professional relationships.";
      } else if (userQuestion.toLowerCase().includes('money') || userQuestion.toLowerCase().includes('financial')) {
        personalizedMeaning += " Regarding financial matters, this card points to practical decisions and material stability.";
        personalizedGuidance += " Consider how this wisdom applies to your financial planning and resource management.";
      }
      
      return {
        cardMeaning: personalizedMeaning,
        guidance: personalizedGuidance
      };
    }
  };

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      // Shuffle cards when question is submitted
      setShuffledCards(shuffleArray(tarotCards));
      setShowCards(true);
    }
  };

  const handleCardClick = async (cardIndex) => {
    const cardName = shuffledCards[cardIndex];
    setSelectedCard({ name: cardName, index: cardIndex });
    
    // Generate reading with Claude API
    const reading = await generateReading(cardName, question);
    setCardReading(reading);
  };

  const resetReading = () => {
    setQuestion('');
    setShowCards(false);
    setSelectedCard(null);
    setCardReading(null);
    setIsLoading(false);
    setTheme(Math.floor(Math.random() * themes.length));
    setShuffledCards(shuffleArray(tarotCards));
  };

  const getCardEmoji = (cardName) => {
    const emojiMap = {
      "The Fool": "🃏", "The Magician": "🎩", "The High Priestess": "🔮", "The Empress": "👑", "The Emperor": "⚔️",
      "The Hierophant": "🏛️", "The Lovers": "💕", "The Chariot": "🏇", "Strength": "🦁", "The Hermit": "🏮",
      "Wheel of Fortune": "🎡", "Justice": "⚖️", "The Hanged Man": "🙃", "Death": "🦋", "Temperance": "🧘",
      "The Devil": "😈", "The Tower": "🗼", "The Star": "⭐", "The Moon": "🌙", "The Sun": "☀️",
      "Judgement": "📯", "The World": "🌍"
    };
    
    if (emojiMap[cardName]) return emojiMap[cardName];
    if (cardName.includes('Wands')) return '🔥';
    if (cardName.includes('Cups')) return '💧';
    if (cardName.includes('Swords')) return '⚔️';
    if (cardName.includes('Pentacles')) return '💰';
    return '✨';
  };

  const StarField = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          <Star className="text-amber-600 opacity-70" size={Math.random() * 6 + 3} />
        </div>
      ))}
    </div>
  );

  // Create card rows - mobile responsive (fewer cards per row on mobile)
  const createCardRows = () => {
    const rows = [];
    const cardsPerRow = window.innerWidth < 640 ? 6 : 13; // 6 cards per row on mobile, 13 on desktop
    const totalRows = Math.ceil(shuffledCards.length / cardsPerRow);
    
    for (let i = 0; i < totalRows; i++) {
      const startIndex = i * cardsPerRow;
      const endIndex = startIndex + cardsPerRow;
      const rowCards = shuffledCards.slice(startIndex, endIndex);
      rows.push(rowCards);
    }
    return rows;
  };

  if (selectedCard && (cardReading || isLoading)) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} text-gray-800 relative overflow-hidden`}>
        <StarField />
        
        {/* Fixed Header - Mobile Optimized */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg">
          <div className="text-center py-3 px-4">
            <div className="flex items-center justify-center gap-2">
              <Gem className="text-amber-600" size={20} />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                SOUL DESTINY TAROT
              </h1>
              <Gem className="text-amber-600" size={20} />
            </div>
            <p className="text-xs text-gray-600 mt-1">by ASTROLOGER CHANAKK GUPTA</p>
          </div>
        </div>

        {/* Card Reading Content - Mobile Optimized */}
        <div className="pt-20 pb-28 px-3 sm:px-4 max-w-4xl mx-auto relative z-10">
          {isLoading ? (
            <div className="text-center mt-8 sm:mt-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-amber-600 mb-4"></div>
              <p className="text-lg sm:text-xl text-amber-700">Channeling divine wisdom...</p>
            </div>
          ) : (
            <>
              {/* Card Display - Mobile Optimized */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-block bg-gradient-to-br from-white to-amber-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl border-4 border-amber-400 max-w-xs sm:max-w-sm mx-auto">
                  <div className="text-3xl sm:text-4xl md:text-6xl mb-3 sm:mb-4">{getCardEmoji(selectedCard.name)}</div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-800 mb-2 px-2">{selectedCard.name}</h2>
                </div>
              </div>

              {/* Your Question - Mobile Optimized */}
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-amber-300 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-amber-700 mb-2 sm:mb-3">Your Question:</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 italic leading-relaxed">"{question}"</p>
              </div>

              {/* Card Meaning - Mobile Optimized */}
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-300 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-700 mb-2 sm:mb-3">Card Meaning:</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{cardReading.cardMeaning}</p>
              </div>

              {/* Guidance - Mobile Optimized */}
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-rose-300 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-rose-700 mb-2 sm:mb-3">Your Guidance:</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{cardReading.guidance}</p>
              </div>

              {/* New Reading Button - Mobile Optimized */}
              <div className="text-center">
                <button
                  onClick={resetReading}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transform active:scale-95 transition-all duration-200 text-sm sm:text-base"
                >
                  New Reading ✨
                </button>
              </div>
            </>
          )}
        </div>

        {/* Fixed Contact Footer - Mobile Optimized */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm text-center py-2 sm:py-3 px-2 sm:px-4 shadow-lg">
          <div className="text-center">
            <p className="font-semibold text-xs sm:text-sm text-amber-700">ASTROLOGER CHANAKK GUPTA</p>
            <div className="text-xs sm:text-sm text-gray-600">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span>📞 +91 75738 77033</span>
                <span className="hidden sm:inline">|</span>
                <span>📧 info.souldestiny@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} text-gray-800 relative overflow-hidden`}>
      <StarField />
      
      {/* Fixed Header - Mobile Optimized */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg">
        <div className="text-center py-3 px-4">
          <div className="flex items-center justify-center gap-2">
            <Gem className="text-amber-600" size={20} />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              SOUL DESTINY TAROT
            </h1>
            <Gem className="text-amber-600" size={20} />
          </div>
          <p className="text-xs text-gray-600 mt-1">by ASTROLOGER CHANAKK GUPTA</p>
        </div>
      </div>

      <div className="pt-20 pb-28 px-3 sm:px-4 max-w-full mx-auto relative z-10">
        {!showCards ? (
          /* Question Input Section - Mobile Optimized */
          <div className="text-center max-w-2xl mx-auto mt-4 sm:mt-8">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 shadow-2xl border border-amber-300">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-amber-700">Ask Your Question</h2>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What guidance do you seek today?"
                className="w-full p-3 sm:p-4 text-sm sm:text-base md:text-lg rounded-lg bg-white bg-opacity-70 backdrop-blur-sm border border-amber-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                rows="4"
              />
              <button
                onClick={handleQuestionSubmit}
                disabled={!question.trim()}
                className="mt-4 sm:mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg transform active:scale-95 transition-all duration-200 text-sm sm:text-base"
              >
                Reveal Cards ✨
              </button>
            </div>
          </div>
        ) : (
          /* Cards Selection Section - Mobile Optimized */
          <div className="mt-4 sm:mt-8">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-700 mb-2 sm:mb-4">Choose Your Card</h2>
              <p className="text-sm sm:text-base text-gray-700 px-4">Trust your intuition and select the card that calls to you</p>
            </div>
            
            {/* Card Grid - Mobile Responsive Layout */}
            <div className="space-y-2 sm:space-y-1 max-w-full mx-auto overflow-x-auto">
              {createCardRows().map((row, rowIndex) => {
                const cardsPerRow = window.innerWidth < 640 ? 6 : 13;
                return (
                  <div key={rowIndex} className="flex gap-1 sm:gap-1 justify-center min-w-fit px-2 sm:px-0">
                    {row.map((card, cardIndex) => {
                      const globalIndex = rowIndex * cardsPerRow + cardIndex;
                      return (
                        <div
                          key={globalIndex}
                          className={`w-9 h-12 sm:w-11 sm:h-15 md:w-12 md:h-16 cursor-pointer transform transition-all duration-200 ${
                            hoveredCard === globalIndex ? 'scale-110 z-10' : 'active:scale-95'
                          }`}
                          onMouseEnter={() => setHoveredCard(globalIndex)}
                          onMouseLeave={() => setHoveredCard(null)}
                          onTouchStart={() => setHoveredCard(globalIndex)}
                          onTouchEnd={() => setHoveredCard(null)}
                          onClick={() => handleCardClick(globalIndex)}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 rounded border-2 border-amber-400 shadow-lg flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-transparent to-transparent opacity-20"></div>
                            <div className="text-amber-700">
                              <Star size={8} className="mx-auto mb-1" />
                              <div className="text-[8px] text-center">✨</div>
                            </div>
                            {hoveredCard === globalIndex && (
                              <div className="absolute inset-0 bg-amber-400 bg-opacity-30 rounded animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Contact Footer - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm text-center py-2 sm:py-3 px-2 sm:px-4 shadow-lg">
        <div className="text-center">
          <p className="font-semibold text-xs sm:text-sm text-amber-700">ASTROLOGER CHANAKK GUPTA</p>
          <div className="text-xs sm:text-sm text-gray-600">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <span>📞 +91 75738 77033</span>
              <span className="hidden sm:inline">|</span>
              <span>📧 info.souldestiny@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulDestinyTarot;
