import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MapPin, Calendar, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  actions?: ChatAction[];
}

interface ChatAction {
  type: 'route' | 'event' | 'accommodation' | 'info';
  label: string;
  data?: any;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chat opens
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: t('chatbot.welcome'),
        isBot: true,
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.routes'),
          t('chatbot.suggestions.accommodation'),
          t('chatbot.suggestions.events'),
          t('chatbot.suggestions.weather')
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, t]);

  const addMessage = (text: string, isBot: boolean = false, suggestions?: string[], actions?: ChatAction[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      suggestions,
      actions
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    addMessage(userMessage, false);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setIsTyping(false);
      addMessage(botResponse.text, true, botResponse.suggestions, botResponse.actions);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string): { text: string; suggestions?: string[]; actions?: ChatAction[] } => {
    const message = userMessage.toLowerCase();
    
    // Route recommendations
    if (message.includes('ruta') || message.includes('route') || message.includes('senderismo') || message.includes('hiking')) {
      return {
        text: t('chatbot.responses.routes'),
        suggestions: [
          t('chatbot.suggestions.easyRoutes'),
          t('chatbot.suggestions.difficultRoutes'),
          t('chatbot.suggestions.familyRoutes')
        ],
        actions: [
          { type: 'route', label: t('chatbot.actions.viewRoutes'), data: { difficulty: 'all' } }
        ]
      };
    }
    
    // Accommodation recommendations
    if (message.includes('alojamiento') || message.includes('accommodation') || message.includes('hotel') || message.includes('dormir')) {
      return {
        text: t('chatbot.responses.accommodation'),
        suggestions: [
          t('chatbot.suggestions.ruralHotels'),
          t('chatbot.suggestions.apartments'),
          t('chatbot.suggestions.camping')
        ],
        actions: [
          { type: 'accommodation', label: t('chatbot.actions.viewAccommodation') }
        ]
      };
    }
    
    // Events and activities
    if (message.includes('evento') || message.includes('event') || message.includes('actividad') || message.includes('activity')) {
      return {
        text: t('chatbot.responses.events'),
        actions: [
          { type: 'event', label: t('chatbot.actions.viewEvents') }
        ]
      };
    }
    
    // Weather information
    if (message.includes('tiempo') || message.includes('weather') || message.includes('clima')) {
      return {
        text: t('chatbot.responses.weather'),
        suggestions: [
          t('chatbot.suggestions.weekendWeather'),
          t('chatbot.suggestions.clothingAdvice')
        ]
      };
    }
    
    // Default response
    return {
      text: t('chatbot.responses.default'),
      suggestions: [
        t('chatbot.suggestions.routes'),
        t('chatbot.suggestions.accommodation'),
        t('chatbot.suggestions.events'),
        t('chatbot.suggestions.contact')
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleActionClick = (action: ChatAction) => {
    // In a real app, this would navigate to the appropriate section
    console.log('Action clicked:', action);
    addMessage(t('chatbot.actionExecuted', { action: action.label }), true);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        aria-label={t('chatbot.toggle')}
        aria-describedby="chatbot-status"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <span id="chatbot-status" className="sr-only">
          {isOpen ? 'Chatbot abierto' : 'Chatbot cerrado'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          aria-describedby="chatbot-description"
        >
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span id="chatbot-title" className="font-medium">{t('chatbot.title')}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              aria-label={t('chatbot.close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div id="chatbot-description" className="sr-only">
            Asistente virtual para ayudarte con información turística de la Montaña Central de Asturias
          </div>

          {/* Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4"
            role="log"
            aria-live="polite"
            aria-label="Conversación del chatbot"
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                role="group"
                aria-label={message.isBot ? 'Mensaje del asistente' : 'Tu mensaje'}
              >
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.isBot 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-green-600 text-white'
                }`}>
                  <p className="text-sm" aria-label={message.isBot ? `Asistente dice: ${message.text}` : `Tú dijiste: ${message.text}`}>
                    {message.text}
                  </p>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-2 space-y-1" role="group" aria-label="Sugerencias de respuesta">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                          aria-label={`Sugerencia: ${suggestion}`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Actions */}
                  {message.actions && (
                    <div className="mt-2 space-y-1" role="group" aria-label="Acciones disponibles">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action)}
                          className="flex items-center space-x-1 text-xs bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                          aria-label={`Acción: ${action.label}`}
                        >
                          {action.type === 'route' && <MapPin className="h-3 w-3" />}
                          {action.type === 'event' && <Calendar className="h-3 w-3" />}
                          {action.type === 'info' && <Info className="h-3 w-3" />}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start" role="status" aria-label="El asistente está escribiendo">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t" role="form" aria-label="Enviar mensaje al chatbot">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Escribe tu mensaje aquí"
                aria-describedby="input-help"
              />
              <div id="input-help" className="sr-only">
                Escribe tu consulta y presiona Enter o el botón enviar
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label={t('chatbot.send')}
                aria-describedby="send-help"
              >
                <Send className="h-4 w-4" />
                <span id="send-help" className="sr-only">
                  {inputValue.trim() ? 'Enviar mensaje' : 'Escribe un mensaje para enviar'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;