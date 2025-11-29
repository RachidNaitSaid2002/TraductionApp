'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Triangle, Eye, EyeOff, Check } from 'lucide-react';
import Image from 'next/image';


export default function LoginPage() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')
    
    const router = useRouter()  // Next.js router

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({ email, password })

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, hashed_password: password })
            })

            const data = await response.json()
            console.log(data)

            if (data.access_token) {
                localStorage.setItem("token", data.access_token)
                localStorage.setItem("user_id", data.user_id)

                router.push('/prediction')
            } else {
                setMessage(data.message)
                console.log(message)
            }
        } catch (err) {
            console.error('Error logging in:', err)
            setMessage("Something went wrong")
        }
    }


    return (
        <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 relative overflow-hidden">

            {/* Animated Waves Background */}
            <div className="absolute inset-0 z-0">
                <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="rgb(232, 212, 241)"
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
                        fill="rgb(240, 217, 232)"
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
                        fill="rgb(232, 228, 217)"
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
            </div>

            {/* Form */}
            <div className="w-full max-w-[1200px]  bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Left Side - Login Form */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                    <div className="relative w-full h-full bg-[#8B5CF6] overflow-hidden flex flex-col justify-between p-8 md:p-12">
                        {/* Background Gradients and Shapes */}

                        {/* Top Left Orange Glow */}
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FCD34D] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>

                        {/* Bottom Right Purple Glow */}
                        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#7C3AED] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                        {/* SVG Wave Shape to match the design */}
                        <div className="absolute inset-0 z-0">
                            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Abstract fluid shapes to mimic the reference image */}
                                <path d="M0 0 H100 V100 H0 Z" fill="url(#grad1)" />
                                <path d="M0 0 C 40 10, 60 50, 30 100 L 0 100 Z" fill="rgba(255,255,255,0.1)" />
                                <path d="M100 0 C 60 20, 40 60, 100 100 Z" fill="url(#grad2)" opacity="0.6" />
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#f3dcb8', stopOpacity: 1 }} />
                                        <stop offset="50%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                    </linearGradient>
                                    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#fcd34d', stopOpacity: 0.4 }} />
                                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Custom wave overlay to get that specific 'cut' look */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#fdba74]/30 via-[#8b5cf6]/20 to-[#7c3aed]/80 pointer-events-none"></div>

                            {/* The hard edge wave SVG */}
                            <svg className="absolute top-0 right-0 h-full w-full pointer-events-none" viewBox="0 0 500 800" preserveAspectRatio="none">
                                <path
                                    d="M500,0 L500,800 L200,800 C350,600 450,400 150,200 C50,150 50,50 0,0 Z"
                                    fill="url(#overlayGrad)"
                                    opacity="0.1"
                                />
                                <defs>
                                    <linearGradient id="overlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 0.2 }} />
                                        <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 0 }} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-white mb-1">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                    <Image
                                        src="/images/translate (1).png"
                                        width={40}
                                        height={50}
                                        alt="Traduction IA pour e-commerce"
                                        className="w-full h-auto object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto mb-20 md:mb-5">
                            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-sm">
                                Content de<br />te revoir!
                            </h1>
                        </div>

                        {/* Decorative blurred circle overlay for texture */}
                        <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex relative items-center justify-center bg-white">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
                            <p className="text-gray-400 text-sm">Bienvenue ! Veuillez vous connecter à votre compte.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Username Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400" htmlFor="username">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="email"
                                        placeholder="username@gmail.com"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative group">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="•••••••••"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <span className='text-red'>{message}</span>

                            <br />
                            <br />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold py-3.5 rounded-lg shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] hover:-translate-y-[1px] transition-all duration-200 active:scale-[0.98]"
                            >
                                Login
                            </button>

                            {/* Footer */}
                            <div className="text-center mt-8">
                                <p className="text-sm text-gray-400">
                                    Nouvel utilisateur
                                    <Link href="/signup" className="text-[#8B5CF6] font-medium hover:text-[#7C3AED] hover:underline transition-all">
                                        Signup
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}