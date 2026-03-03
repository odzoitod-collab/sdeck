
import React, { useState } from 'react';

const AiAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: "You are a customer support agent for CDEK Safe Deal (СДЭК Безопасная Сделка). You help BUYERS who are paying for items and delivery. Explain that money is held (frozen) until they inspect the package at the pickup point. If they refuse the item, the money for the item is returned. Answer questions about delivery speeds, pickup point working hours, and security of payment. Be professional, reassuring, and answer in Russian. Keep answers under 150 words.",
        },
      });
      setResponse(result.text);
    } catch (err) {
      console.error('AI Assistant error:', err);
      setResponse("Извините, сейчас я не могу ответить. Пожалуйста, попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-[#8DC63F]/5 px-5 py-3 border-b border-gray-100 flex items-center space-x-2">
        <div className="w-6 h-6 bg-[#8DC63F] text-white rounded-full flex items-center justify-center scale-90">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h3 className="font-bold text-xs text-[#25282B] uppercase tracking-tighter">СДЭК Помощник</h3>
      </div>

      <div className="p-5">
        {response ? (
          <div className="animate-fadeIn">
            <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 leading-relaxed border border-gray-100 italic">
              {response}
            </div>
            <button 
                onClick={() => { setResponse(null); setQuery(''); }}
                className="mt-3 text-[10px] font-bold text-[#8DC63F] uppercase hover:underline"
            >
                Новый вопрос
            </button>
          </div>
        ) : (
            <form onSubmit={handleAsk} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="А если товар бракованный?"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-[#8DC63F] outline-none text-xs transition-all"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8DC63F] disabled:opacity-30"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-[#8DC63F]/30 border-t-[#8DC63F] rounded-full animate-spin"></div>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    )}
                </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
