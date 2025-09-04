import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Star, Moon, Sun, Sparkles, Gem, RefreshCw } from 'lucide-react';

const SoulDestinyTarot = () => {
  const [question, setQuestion] = useState('');
  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [theme, setTheme] = useState(0);
  const [cardReading, setCardReading] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Theme variations
  const themes = useMemo(() => [
    { bg: 'from-yellow-200 via-orange-200 to-red-200', accent: 'orange' },
    { bg: 'from-blue-200 via-cyan-200 to-teal-200', accent: 'cyan' },
    { bg: 'from-pink-200 via-purple-200 to-indigo-200', accent: 'purple' },
    { bg: 'from-green-200 via-emerald-200 to-teal-200', accent: 'emerald' },
    { bg: 'from-rose-200 via-pink-200 to-orange-200', accent: 'rose' }
  ], []);

  const currentTheme = themes[theme];

  // Complete tarot deck (78 cards)
  const tarotCards = useMemo(() => [
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
  ], []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize app
  useEffect(() => {
    setTheme(Math.floor(Math.random() * themes.length));
    setShuffledCards(shuffleArray(tarotCards));
  }, [themes.length, shuffleArray, tarotCards]);

  // Predefined tarot card readings
  const predefinedReadings = useMemo(() => ({
    "The Fool": {
      cardMeaning: "The Fool represents new beginnings, spontaneity, and taking a leap of faith. This card suggests you're at the start of an important journey in your life.",
      guidance: "Trust your instincts and embrace new opportunities with an open heart. Sometimes the best path forward requires courage to step into the unknown."
    },
    "The Magician": {
      cardMeaning: "The Magician symbolizes manifestation, resourcefulness, and having the power to create your reality. You have all the tools you need to succeed.",
      guidance: "Focus your energy and intentions. Use your skills and resources wisely to turn your dreams into reality. The power to change your situation lies within you."
    },
    "The High Priestess": {
      cardMeaning: "The High Priestess represents intuition, inner wisdom, and the subconscious mind. She encourages you to trust your inner voice and look beyond the surface.",
      guidance: "Listen to your intuition and pay attention to your dreams and inner feelings. The answers you seek are within you, waiting to be discovered through quiet reflection."
    },
    "The Empress": {
      cardMeaning: "The Empress represents fertility, abundance, and nurturing energy. She signifies growth, creativity, and the manifestation of your desires.",
      guidance: "Embrace your creative side and trust in the natural flow of life. Nurture your projects and relationships with love and patience for abundant results."
    },
    "The Emperor": {
      cardMeaning: "The Emperor represents authority, structure, and leadership. This card suggests taking control of your situation through discipline and strategic thinking.",
      guidance: "Take charge of your circumstances with confidence. Create order in your life and make decisions based on logic and experience rather than emotion."
    },
    "The Lovers": {
      cardMeaning: "The Lovers represent relationships, choices, and harmony. This card often indicates an important decision regarding love or partnerships.",
      guidance: "Listen to your heart when making important choices. Seek balance and harmony in your relationships, and remember that the best decisions align with your values."
    },
    "The Chariot": {
      cardMeaning: "The Chariot represents determination, willpower, and triumph through self-discipline. You have the strength to overcome obstacles and achieve your goals.",
      guidance: "Stay focused on your objectives and maintain your determination. Success comes through balancing opposing forces and maintaining control over your direction."
    },
    "Strength": {
      cardMeaning: "Strength represents inner courage, patience, and gentle power. This card suggests that true strength comes from compassion and self-control rather than force.",
      guidance: "Approach challenges with patience and kindness. Your inner strength and gentle persistence will overcome obstacles more effectively than aggressive action."
    },
    "The Hermit": {
      cardMeaning: "The Hermit represents introspection, seeking inner wisdom, and spiritual guidance. This card suggests a time for self-reflection and inner searching.",
      guidance: "Take time for solitude and self-reflection. The guidance you seek comes from within. Trust your inner wisdom and don't be afraid to seek deeper truths."
    },
    "Wheel of Fortune": {
      cardMeaning: "The Wheel of Fortune represents cycles, destiny, and turning points. This card indicates that change is coming and new opportunities are on the horizon.",
      guidance: "Embrace the changes coming into your life. What goes down must come up - trust that the wheel is turning in your favor and be ready to seize new opportunities."
    },
    "Justice": {
      cardMeaning: "Justice represents fairness, truth, and karmic balance. This card suggests that fairness will prevail and truth will be revealed in your situation.",
      guidance: "Make decisions based on fairness and truth. What you give out will come back to you, so act with integrity and expect just outcomes."
    },
    "The Hanged Man": {
      cardMeaning: "The Hanged Man represents surrender, new perspective, and letting go. Sometimes the best action is to pause and see things from a different angle.",
      guidance: "Release your need to control every outcome. Sometimes surrender leads to breakthrough. Look at your situation from a completely new perspective."
    },
    "Death": {
      cardMeaning: "Death represents transformation, endings, and new beginnings. This card rarely means physical death but rather the end of one phase and the beginning of another.",
      guidance: "Embrace the transformation happening in your life. Let go of what no longer serves you to make room for new growth and opportunities."
    },
    "Temperance": {
      cardMeaning: "Temperance represents balance, moderation, and harmony. This card suggests finding the middle path and combining different elements in your life.",
      guidance: "Seek balance in all areas of your life. Avoid extremes and find the middle ground. Patience and moderation will lead to lasting success and peace."
    },
    "The Devil": {
      cardMeaning: "The Devil represents bondage, temptation, and material attachments. This card suggests you may be trapped by your own limiting beliefs or unhealthy patterns.",
      guidance: "Examine what's keeping you bound to unhealthy patterns. You have more power to break free than you realize. Choose liberation over comfort zones."
    },
    "The Tower": {
      cardMeaning: "The Tower represents sudden change, revelation, and awakening. Though disruptive, this card brings necessary change that leads to greater truth.",
      guidance: "Embrace the sudden changes in your life as opportunities for growth. What's falling away wasn't meant to last. Build anew on a stronger foundation."
    },
    "The Star": {
      cardMeaning: "The Star brings hope, inspiration, and spiritual guidance. It suggests that you're being guided toward your highest good and that better times are ahead.",
      guidance: "Stay optimistic and trust in the universe's plan for you. Your hopes and dreams are valid, and with patience and faith, they will manifest in divine timing."
    },
    "The Moon": {
      cardMeaning: "The Moon represents illusion, intuition, and the subconscious. This card suggests that not everything is as it appears, and you should trust your inner knowing.",
      guidance: "Trust your intuition over appearances. Pay attention to your dreams and subconscious messages. What's hidden will soon be revealed."
    },
    "The Sun": {
      cardMeaning: "The Sun represents joy, success, and enlightenment. It's one of the most positive cards, indicating happiness and achievement in your endeavors.",
      guidance: "Embrace the positive energy around you and share your light with others. Success and happiness are within reach - celebrate your achievements and stay confident."
    },
    "Judgement": {
      cardMeaning: "Judgement represents rebirth, inner calling, and spiritual awakening. This card suggests you're being called to a higher purpose or new level of understanding.",
      guidance: "Listen to your inner calling and don't ignore the signs pointing toward your life purpose. It's time for spiritual growth and following your true path."
    },
    "The World": {
      cardMeaning: "The World represents completion, accomplishment, and cosmic consciousness. This card indicates successful completion of a major life cycle or goal.",
      guidance: "Celebrate your achievements and recognize how far you've come. You've completed an important phase - now prepare for the next exciting chapter of your journey."
    },
    // Wands suit readings
    "Ace of Wands": {
      cardMeaning: "The Ace of Wands represents new creative beginnings, inspiration, and potential. A spark of creative energy is entering your life.",
      guidance: "Seize the creative opportunity presenting itself. This is the perfect time to start a new project or pursue a passion that excites you."
    },
    "Two of Wands": {
      cardMeaning: "The Two of Wands represents planning, making decisions, and looking toward the future. You're at a crossroads considering your next move.",
      guidance: "Take time to plan your next steps carefully. Consider all your options before making important decisions about your future path."
    },
    "Three of Wands": {
      cardMeaning: "The Three of Wands represents expansion, foresight, and looking ahead. Your plans are beginning to show results and expansion is possible.",
      guidance: "Keep your vision focused on the bigger picture. Your efforts are paying off, and it's time to think about expanding your horizons."
    },
    // Cups suit readings  
    "Ace of Cups": {
      cardMeaning: "The Ace of Cups represents new emotional beginnings, love, and spiritual fulfillment. A new wave of positive emotion is entering your life.",
      guidance: "Open your heart to new emotional experiences. Whether in love, friendship, or spirituality, be receptive to the gifts coming your way."
    },
    "Two of Cups": {
      cardMeaning: "The Two of Cups represents partnership, connection, and mutual attraction. This card often indicates a meaningful relationship or collaboration.",
      guidance: "Focus on building meaningful connections with others. Whether romantic or platonic, relationships based on mutual respect will flourish now."
    },
    // Swords suit readings
    "Ace of Swords": {
      cardMeaning: "The Ace of Swords represents mental clarity, new ideas, and breakthrough moments. A new way of thinking is emerging.",
      guidance: "Trust the new insights and ideas coming to you. Clear thinking and honest communication will help you cut through confusion and find truth."
    },
    "Two of Swords": {
      cardMeaning: "The Two of Swords represents indecision, being at a crossroads, and needing to make a difficult choice between two options.",
      guidance: "Take time to gather information before making your decision. Sometimes the best choice requires careful consideration of all factors involved."
    },
    // Pentacles suit readings
    "Ace of Pentacles": {
      cardMeaning: "The Ace of Pentacles represents new material opportunities, prosperity, and manifestation in the physical world. A new opportunity for abundance appears.",
      guidance: "Take advantage of the practical opportunities presenting themselves. This is an excellent time to start new ventures or invest in your future security."
    },
    "Ten of Pentacles": {
      cardMeaning: "The Ten of Pentacles represents wealth, family legacy, and long-term security. This card indicates lasting abundance and family harmony.",
      guidance: "Focus on building something that will last for generations. Your efforts toward long-term security and family wellbeing will be rewarded."
    },
    "default": {
      cardMeaning: "This card brings special energy to your question. It suggests looking at your situation from a new perspective and trusting your inner wisdom.",
      guidance: "Take time to reflect on what truly matters to you. The answer you seek is within you, waiting to be discovered through patience and self-trust."
    }
  }), []);

  // Generate card reading
  const generateReading = useCallback(async (cardName, userQuestion) => {
    setIsLoading(true);
    
    try {
      // Simulate realistic loading time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use predefined readings
      const reading = predefinedReadings[cardName] || predefinedReadings.default;
      setIsLoading(false);
      return reading;
    } catch (error) {
      console.error('Error generating reading:', error);
      setIsLoading(false);
      return predefinedReadings.default;
    }
  }, [predefinedReadings]);

  const handleQuestionSubmit = useCallback(() => {
    if (question.trim()) {
      setShuffledCards(shuffleArray(tarotCards));
      setShowCards(true);
    }
  }, [question, shuffleArray, tarotCards]);

  const handleCardClick = useCallback(async (cardIndex) => {
    const cardName = shuffledCards[cardIndex];
    setSelectedCard({ name: cardName, index: cardIndex });
    
    const reading = await generateReading(cardName, question);
    setCardReading(reading);
  }, [shuffledCards, generateReading, question]);

  const resetReading = useCallback(() => {
    setQuestion('');
    setShowCards(false);
    setSelectedCard(null);
    setCardReading(null);
    setIsLoading(false);
    setTheme(Math.floor(Math.random() * themes.length));
    setShuffledCards(shuffleArray(tarotCards));
  }, [themes.length, shuffleArray, tarotCards]);

  const getCardEmoji = useCallback((cardName) => {
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
  }, []);

  const StarField = React.memo(() => (
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
  ));

  // Create responsive card grid
  const createCardRows = useCallback(() => {
    const rows = [];
    const cardsPerRow = windowWidth < 640 ? 6 : 13;
    const totalRows = Math.ceil(shuffledCards.length / cardsPerRow);
    
    for (let i = 0; i < totalRows; i++) {
      const startIndex = i * cardsPerRow;
      const endIndex = startIndex + cardsPerRow;
      const rowCards = shuffledCards.slice(startIndex, endIndex);
      rows.push(rowCards);
    }
    return rows;
  }, [shuffledCards, windowWidth]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !showCards && question.trim()) {
        handleQuestionSubmit();
      }
      if (event.key === 'Escape' && (showCards || selectedCard)) {
        resetReading();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCards, question, selectedCard, handleQuestionSubmit, resetReading]);

  // Card reading view
  if (selectedCard && (cardReading || isLoading)) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} text-gray-800 relative overflow-hidden`}>
        <StarField />
        
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg">
          <div className="text-center py-3 px-4">
            <div className="flex items-center justify-center gap-2">
              <Gem className="text-amber-600" size={20} />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
                SOUL DESTINY TAROT
              </h1>
              <Gem className="text-amber-600" size={20} />
            </div>
            <p className="text-xs text-gray-600 mt-1">by ASTROLOGER CHANAKK GUPTA</p>
          </div>
        </div>

        <div className="pt-20 pb-28 px-3 sm:px-4 max-w-4xl mx-auto relative z-10">
          {isLoading ? (
            <div className="text-center mt-8 sm:mt-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-amber-600 mb-4"></div>
              <p className="text-lg sm:text-xl text-amber-700">Reading your card...</p>
            </div>
          ) : (
            <>
              {/* Selected Card Display */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-block bg-gradient-to-br from-white to-amber-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl border-4 border-amber-400 max-w-xs sm:max-w-sm mx-auto card-glow">
                  <div className="text-3xl sm:text-4xl md:text-6xl mb-3 sm:mb-4 animate-float">{getCardEmoji(selectedCard.name)}</div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-800 mb-2 px-2">{selectedCard.name}</h2>
                </div>
              </div>

              {/* Question */}
              <div className="glass-effect rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-amber-300 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-amber-700 mb-2 sm:mb-3 flex items-center gap-2">
                  <Sparkles size={20} />
                  Your Question:
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 italic leading-relaxed">"{question}"</p>
              </div>

              {/* Card Meaning */}
              <div className="glass-effect rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-300 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-700 mb-2 sm:mb-3 flex items-center gap-2">
                  <Moon size={20} />
                  Card Meaning:
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{cardReading.cardMeaning}</p>
              </div>

              {/* Guidance */}
              <div className="glass-effect rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-rose-300 shadow-lg">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-rose-700 mb-2 sm:mb-3 flex items-center gap-2">
                  <Sun size={20} />
                  Your Guidance:
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{cardReading.guidance}</p>
              </div>

              {/* New Reading Button */}
              <div className="text-center">
                <button
                  onClick={resetReading}
                  className="button-primary flex items-center gap-2 mx-auto"
                  aria-label="Start a new tarot reading"
                >
                  <RefreshCw size={18} />
                  New Reading ✨
                </button>
              </div>
            </>
          )}
        </div>

        {/* Contact Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm text-center py-2 sm:py-3 px-2 sm:px-4 shadow-lg">
          <div className="text-center">
            <p className="font-semibold text-xs sm:text-sm text-amber-700">ASTROLOGER CHANAKK GUPTA</p>
            <div className="text-xs sm:text-sm text-gray-600">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <a href="tel:+917573877033" className="hover:text-amber-600 transition-colors">📞 +91 75738 77033</a>
                <span className="hidden sm:inline">|</span>
                <a href="mailto:info.souldestiny@gmail.com" className="hover:text-amber-600 transition-colors">📧 info.souldestiny@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main app view
  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} text-gray-800 relative overflow-hidden`}>
      <StarField />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg">
        <div className="text-center py-3 px-4">
          <div className="flex items-center justify-center gap-2">
            <Gem className="text-amber-600" size={20} />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">
              SOUL DESTINY TAROT
            </h1>
            <Gem className="text-amber-600" size={20} />
          </div>
          <p className="text-xs text-gray-600 mt-1">by ASTROLOGER CHANAKK GUPTA</p>
        </div>
      </div>

      <div className="pt-20 pb-28 px-3 sm:px-4 max-w-full mx-auto relative z-10">
        {!showCards ? (
          /* Question Input */
          <div className="text-center max-w-2xl mx-auto mt-4 sm:mt-8">
            <div className="glass-effect rounded-lg p-4 sm:p-6 md:p-8 shadow-2xl border border-amber-300">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-amber-700 flex items-center justify-center gap-2">
                <Sparkles size={24} />
                Ask Your Question
                <Sparkles size={24} />
              </h2>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && question.trim()) {
                    e.preventDefault();
                    handleQuestionSubmit();
                  }
                }}
                placeholder="What guidance do you seek today?"
                className="w-full p-3 sm:p-4 text-sm sm:text-base md:text-lg rounded-lg bg-white bg-opacity-70 backdrop-blur-sm border border-amber-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none transition-all duration-200"
                rows="4"
                maxLength="500"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {question.length}/500
              </div>
              <button
                onClick={handleQuestionSubmit}
                disabled={!question.trim()}
                className="mt-4 sm:mt-6 button-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                aria-label="Reveal tarot cards for reading"
              >
                <Star size={18} />
                Reveal Cards ✨
              </button>
            </div>
          </div>
        ) : (
          /* Card Selection */
          <div className="mt-4 sm:mt-8">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-700 mb-2 sm:mb-4 flex items-center justify-center gap-2">
                <Moon size={24} />
                Choose Your Card
                <Moon size={24} />
              </h2>
              <p className="text-sm sm:text-base text-gray-700 px-4">Trust your intuition and select the card that calls to you</p>
            </div>
            
            {/* Card Grid */}
            <div className="space-y-2 sm:space-y-1 max-w-full mx-auto overflow-x-auto">
              {createCardRows().map((row, rowIndex) => {
                const cardsPerRow = windowWidth < 640 ? 6 : 13;
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
                          role="button"
                          tabIndex={0}
                          aria-label={`Select tarot card ${globalIndex + 1}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleCardClick(globalIndex);
                            }
                          }}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 rounded border-2 border-amber-400 shadow-lg flex items-center justify-center relative overflow-hidden hover:shadow-glow">
                           <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-transparent to-transparent opacity-20"></div>
                           <div className="text-amber-700 relative z-10">
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
           
           {/* Back Button */}
           <div className="text-center mt-6">
             <button
               onClick={() => setShowCards(false)}
               className="text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-2 mx-auto"
               aria-label="Go back to question input"
             >
               ← Back to Question
             </button>
           </div>
         </div>
       )}
     </div>

     {/* Contact Footer */}
     <div className="fixed bottom-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm text-center py-2 sm:py-3 px-2 sm:px-4 shadow-lg">
       <div className="text-center">
         <p className="font-semibold text-xs sm:text-sm text-amber-700">ASTROLOGER CHANAKK GUPTA</p>
         <div className="text-xs sm:text-sm text-gray-600">
           <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
             <a href="tel:+917573877033" className="hover:text-amber-600 transition-colors">📞 +91 75738 77033</a>
             <span className="hidden sm:inline">|</span>
             <a href="mailto:info.souldestiny@gmail.com" className="hover:text-amber-600 transition-colors">📧 info.souldestiny@gmail.com</a>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default SoulDestinyTarot;