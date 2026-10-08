import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, X, Send, Mic, MicOff, Volume2, Phone, MessageSquare, 
  Sparkles, ShieldCheck, ArrowRight, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { aiService, SaathiMessage } from '../../services/aiService';

export const SaathiAIAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const [messages, setMessages] = useState<SaathiMessage[]>([
    {
      sender: 'assistant',
      text: 'राम-राम भाई साहब! 🙏 मैं हूँ आपका **सारथी AI**।\n\nHauliMate पर रजिस्ट्रेशन, हमारे **यूनिफ़ॉर्मड ड्राइवर्स**, वेतन या ट्रांसपोर्टर सुविधाओं के बारे में जो चाहें पूछें।\n\nतत्काल सहायता:\n• WhatsApp: **7018709616**\n• Call Support: **8527977238**',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('वॉयस इनपुट आपके ब्राउज़र में उपलब्ध नहीं है। कृपया टाइप करें।');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      // Prefer Hindi voice if available
      const voices = window.speechSynthesis.getVoices();
      const hiVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('en-IN'));
      if (hiVoice) utterance.voice = hiVoice;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    setInputText('');
    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      const aiResponse = await aiService.askHighwaySaathi(textToSend);
      setMessages((prev) => [...prev, aiResponse]);
      speakText(aiResponse.text);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'माफ़ कीजिए, सर्वर से संपर्क नहीं हो पाया। कृपया हमारे हेल्पलाइन नंबर **8527977238** पर कॉल करें या WhatsApp **7018709616** पर मैसेज करें।',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    '🦺 वर्दी (Uniform) के क्या फायदे हैं?',
    '📝 ड्राइवर रजिस्ट्रेशन कैसे करें?',
    '💰 ड्राइवर वेतन और भत्ते क्या हैं?',
    '🚚 ट्रांसपोर्टर को रिप्लेसमेंट कैसे मिलता है?',
    '💬 व्हाट्सएप सहायता (7018709616)',
    '📞 कॉल सपोर्ट (8527977238)',
  ];

  const handleActionClick = (action: NonNullable<SaathiMessage['suggestedAction']>) => {
    if (action.actionType === 'navigate') {
      navigate(action.target);
      setIsOpen(false);
    } else if (action.actionType === 'whatsapp' || action.actionType === 'call') {
      window.open(action.target, '_blank');
    }
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom Right */}
      {!isOpen && (
        <aside aria-label="Saathi AI Highway Assistant" className="fixed bottom-5 right-5 z-40 flex items-center group">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-linear-to-r from-[#1B3A6B] to-[#12284C] text-white shadow-2xl border-2 border-[#F5C400] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="सारथी AI - 24/7 Highway Copilot"
          >
            <div className="relative">
              <img
                src="/assets/images/driver_uniformed.jpg"
                alt="Saathi AI Avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#F5C400]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>

            <div className="text-left pr-1">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-sm font-extrabold font-baloo text-[#F5C400]">सारथी AI</span>
                <span className="text-[10px] bg-[#F4741F] text-white px-1.5 py-0.2 rounded font-bold">24x7</span>
              </div>
              <div className="text-[11px] text-gray-200 font-semibold font-mukta mt-0.5">
                आसान सहायता व रजिस्ट्रेशन
              </div>
            </div>

            <Sparkles className="w-4 h-4 text-[#F5C400] animate-bounce" />
          </button>
        </aside>
      )}

      {/* Interactive Saathi AI Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-h-[85vh] flex flex-col bg-[#FBF6EC] rounded-2xl shadow-2xl border-2 border-[#1B3A6B] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-[#1B3A6B] text-white p-3.5 flex items-center justify-between border-b-2 border-[#F5C400]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/assets/images/driver_uniformed.jpg"
                  alt="Saathi Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#F5C400]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1B3A6B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold font-baloo text-[#F5C400] leading-none">
                    सारथी AI (Saathi Assistant)
                  </h3>
                  <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-gray-200 font-medium font-mukta mt-0.5">
                  आसान रजिस्ट्रेशन और हाईवे मार्गदर्शन
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors ${
                  speechEnabled ? 'text-[#F5C400]' : 'text-gray-400'
                }`}
                title={speechEnabled ? 'Voice Reading On' : 'Voice Reading Muted'}
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Helpline Ribbon */}
          <div className="bg-[#F5C400] text-[#14171C] px-3 py-1.5 flex items-center justify-between text-xs font-bold border-b border-[#14171C]/10">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1B3A6B]" />
              <span>सीधा संपर्क:</span>
            </span>
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/917018709616" 
                target="_blank" 
                rel="noreferrer"
                className="hover:underline flex items-center gap-1 text-[#1E7F4F]"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WA: 7018709616</span>
              </a>
              <span className="text-black/30">|</span>
              <a 
                href="tel:+918527977238" 
                className="hover:underline flex items-center gap-1 text-[#1B3A6B]"
              >
                <Phone className="w-3 h-3" />
                <span>Call: 8527977238</span>
              </a>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 max-h-[46vh] bg-[#FBF6EC]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#F4741F] text-white rounded-tr-xs font-medium'
                      : 'bg-white text-[#14171C] border border-[#1B3A6B]/20 shadow-xs rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Suggested Action Pill */}
                {msg.suggestedAction && (
                  <button
                    onClick={() => handleActionClick(msg.suggestedAction!)}
                    className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B3A6B] text-[#F5C400] text-xs font-bold shadow-md hover:bg-[#12284C] transition-all cursor-pointer active:scale-95 border border-[#F5C400]"
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3A6B] p-2 bg-white/70 rounded-xl w-fit">
                <span className="w-2 h-2 rounded-full bg-[#F4741F] animate-ping" />
                <span>सारथी AI सोच रहा है...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 py-2 bg-white/80 border-t border-[#1B3A6B]/10 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-xs px-2.5 py-1 rounded-full bg-[#FBF6EC] border border-[#1B3A6B]/30 hover:bg-[#1B3A6B] hover:text-[#F5C400] text-[#1B3A6B] font-semibold transition-all cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#1B3A6B]/15">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="बोलें या टाइप करें (उदा. रजिस्ट्रेशन कैसे होगा?)"
                disabled={isLoading}
                className="flex-1 bg-[#FBF6EC] text-[#14171C] text-sm px-3.5 py-2.5 rounded-xl border border-[#1B3A6B]/30 focus:outline-none focus:ring-2 focus:ring-[#F4741F]"
              />

              {/* Voice Input Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[#FBF6EC] text-[#1B3A6B] border border-[#1B3A6B]/30 hover:bg-[#1B3A6B]/10'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Voice Input (बोलकर पूछें)'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 rounded-xl bg-[#F4741F] text-white hover:bg-[#E05F0C] disabled:opacity-50 transition-all cursor-pointer shadow-md"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
