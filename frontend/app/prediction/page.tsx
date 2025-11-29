'use client'
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Sparkles, Clock, ArrowRight, Loader2, LogOut, Languages,AudioLines   } from 'lucide-react';
import Logo from '@/component/logo';
import { WavyBackground } from '@/components/ui/wavy-background';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function App() {
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('fr');
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);

    const router = useRouter()

    const getUserId = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("user_id");
        }
        return null;
    };

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            router.push('/login')
        }
    };

    const changeLang = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
        setSourceText(translatedText);
        setTranslatedText(sourceText);
    };

    const getModeType = () => {
        if (sourceLang === 'fr' && targetLang === 'en') return 'FnEn';
        if (sourceLang === 'en' && targetLang === 'fr') return 'EnFn';
        return null;
    };

    const loadHistory = async () => {
        const userId = getUserId();
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!userId) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:8000/Prediction/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch history");

            const data = await res.json();
            setHistory(data);
        } catch (error) {
            console.error("Error loading history:", error);
        }
    };

    const translateText = async () => {
        if (!sourceText.trim()) return;

        const modeType = getModeType();
        if (!modeType) return;

        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:8000/Prediction/${modeType}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ user_text: sourceText })
            });

            if (!res.ok) {
                throw new Error(`Server responded with ${res.status}`);
            }

            const data = await res.json();
            setTranslatedText(data || "");

            await loadHistory();

        } catch (error) {
            console.error("Translation Error:", error);
            setError("No connect with Backend");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const getLangName = (code: LangCode) => {
        const names = { en: "English", fr: "French" };
        return names[code];
    };

    const speektext = (text: string, lang:string) => {
        const uterance = new SpeechSynthesisUtterance(text)
        uterance.lang = lang
        uterance.rate = 0.9
        window.speechSynthesis.speak(uterance)
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
            <nav className="sticky top-0 z-50 w-full  backdrop-blur-md ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Section */}
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg">
                            <Image 
                                src="/images/translate (1).png" 
                                width={20} 
                                height={20} 
                                alt="Traduction IA pour e-commerce" 
                                className="w-full h-auto object-contain"
                                priority
                            />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                TalTranslate
                            </span>
                        </div>

                        {/* Actions Section */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 cursor-pointer"
                            >
                                <span>Logout</span>
                                <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 relative overflow-hidden">

                {/* Animated Waves Background */}
                {/* <div className="absolute inset-0 z-0">
                    <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path
                            fill="rgb(232, 212, 241, 0.3)"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        >
                            <animate
                                attributeName="d"
                                dur="5s"
                                repeatCount="indefinite"
                                values="
                        M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                        M0,160L48,154.7C96,149,192,139,288,133.3C384,128,480,128,576,138.7C672,149,768,171,864,165.3C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                        M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </path>
                        <path
                            fill="rgb(240, 217, 232, 0.3)"
                            d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,176C672,171,768,181,864,186.7C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        >
                            <animate
                                attributeName="d"
                                dur="6s"
                                repeatCount="indefinite"
                                values="
                        M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,176C672,171,768,181,864,186.7C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                        M0,128L48,133.3C96,139,192,149,288,154.7C384,160,480,160,576,149.3C672,139,768,117,864,117.3C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                        M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,176C672,171,768,181,864,186.7C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </path>
                        <path
                            fill="rgb(232, 228, 217, 0.3)"
                            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,192C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        >
                            <animate
                                attributeName="d"
                                dur="10s"
                                repeatCount="indefinite"
                                values="
                        M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,192C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                        M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,181.3C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                        M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,192C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </path>
                    </svg>
                </div> */}

                <main className="flex-grow flex flex-col items-center p-4 md:p-8 space-y-8">
                    
                    {/* Main Translation Area */}
                    <div className="w-full max-w-5xl relative">

                        {/* Language Header */}
                        <div className="flex justify-between items-center mb-4 px-4">
                            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Source</span>
                            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Target</span>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row relative">

                            {/* Swap Button (Floating Centered) */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                                <button
                                    onClick={changeLang}
                                    className="w-10 h-10 rounded-full bg-white border border-slate-200 text-indigo-600 shadow-lg hover:bg-indigo-50 hover:scale-110 transition-all duration-200 flex items-center justify-center"
                                    aria-label="Swap languages"
                                >
                                    <ArrowRightLeft className="w-5 h-5" />
                                </button>
                            </div>

                            {/* LEFT: Input */}
                            <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col gap-4 relative bg-white transition-colors focus-within:bg-slate-50/50">
                                <div className="flex justify-between items-center">
                                    <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100">
                                        {getLangName(sourceLang)}
                                    </div>
                                    {sourceText && (
                                        <button
                                            onClick={() => setSourceText('')}
                                            className="text-xs text-slate-400 hover:text-slate-600"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>

                                <textarea
                                    value={sourceText}
                                    onChange={(e) => setSourceText(e.target.value)}
                                    placeholder="Enter text to translate..."
                                    className="flex-1 min-h-[200px] text-xl md:text-2xl bg-transparent outline-none resize-none placeholder:text-slate-300 text-slate-700 leading-relaxed"
                                />

                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-slate-400">{sourceText.length} chars</span>
                                </div>
                            </div>

                            {/* RIGHT: Output */}
                            <div className="flex-1 p-6 md:p-8 bg-slate-50/50 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm">
                                        {getLangName(targetLang)}
                                    </div>
                                    <div>
                                        <button onClick={() => speektext(translatedText, targetLang == 'en' ? 'en-US':'fr-FR')} className='cursor-pointer'><AudioLines /></button>
                                    </div>
                                </div>

                                <div className="relative flex-1 min-h-[200px]">
                                    {isLoading ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-2 text-indigo-500">
                                                <Loader2 className="w-8 h-8 animate-spin" />
                                                <span className="text-sm font-medium">Translating...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <textarea
                                            readOnly
                                            value={translatedText}
                                            placeholder="Translation will appear here..."
                                            className="w-full h-full text-xl md:text-2xl bg-transparent outline-none resize-none placeholder:text-slate-300 text-indigo-900 leading-relaxed"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        

                        {/* Translate Button Bar */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={translateText}
                                disabled={!sourceText.trim() || isLoading}
                                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/30"
                            >
                                <span className="mr-2">Translate</span>
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center justify-center">
                                {error}
                            </div>
                        )}

                    </div>

                    {/* History Section */}
                    {history.length > 0 && (
                        <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500 relative inset-0 z-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-slate-400" />
                                <h2 className="text-lg font-bold text-slate-700 text-[#432dd7]">Recent History</h2>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {history.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-default"
                                    >
                                        <div className="flex flex-col h-full justify-between gap-3">
                                            <div>
                                                <div className="text-sm text-slate-500 mb-1 font-medium">Original</div>
                                                <p className="text-slate-800 line-clamp-2">{item.user_text}</p>
                                            </div>

                                            <div className="flex items-center text-indigo-200">
                                                <ArrowRight className="w-4 h-4 mx-auto rotate-90 md:rotate-0" />
                                            </div>

                                            <div>
                                                <div className="text-sm text-indigo-500 mb-1 font-medium">Result</div>
                                                <p className="text-indigo-900 line-clamp-2">{item.result}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>

            </div>
        </div>
    );
}