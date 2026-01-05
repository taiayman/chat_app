"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Inter, Newsreader } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

// Font configurations
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serifFont = Newsreader({
    subsets: ["latin"],
    style: "italic",
    weight: ["300", "400", "500"],
    variable: "--font-serif"
});

export default function LoginPage() {
    const [index, setIndex] = useState(0);
    const titles = [
        "World",
        "Again",
        "Genius",
        "Legend",
        "Partner",
        "Creator",
        "Innovator",
        "Visionary",
        "Builder",
        "Mastermind",
        "Wizard",
        "Pioneer",
        "Maestro",
        "Rockstar"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % titles.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`min-h-screen bg-[#f3f3ee] text-zinc-900 selection:bg-[#1E9A80] selection:text-white ${inter.variable} ${serifFont.variable} font-sans overflow-hidden flex flex-col`}>

            {/* --- Navbar --- */}
            <nav className="flex items-center justify-between px-6 py-2 md:px-12 z-20">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="h-10 w-10 bg-[#1E9A80] rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 8.25V17.05H2.75C3.039 17.05 3.325 17.107 3.592 17.218C3.859 17.328 4.102 17.49 4.306 17.694C4.51 17.899 4.672 18.141 4.783 18.408C4.893 18.675 4.95 18.961 4.95 19.25V22H11.55L19.8 13.75V4.95H17.05C16.761 4.95 16.475 4.893 16.208 4.783C15.941 4.672 15.699 4.51 15.495 4.306C15.29 4.101 15.128 3.859 15.018 3.592C14.907 3.325 14.85 3.039 14.85 2.75V0H8.25L0 8.25ZM9.35 16.5H5.5V10.45L10.45 5.5H14.3V11.55L9.35 16.5Z" fill="white" />
                        </svg>
                    </div>
                    <span className={`text-2xl font-serif tracking-tight font-medium translate-y-[3px] ${serifFont.className}`}>Chat App</span>
                </div>



                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <Link href="/chat">
                        <Button
                            variant="ghost"
                            className="hidden md:flex text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 rounded-xl px-5"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link href="/chat">
                        <Button
                            className="bg-[#111625] text-white hover:bg-zinc-800 rounded-xl px-6 font-medium transition-all shadow-lg shadow-zinc-200"
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* --- Main Content --- */}
            <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:px-10 lg:pb-6 lg:pt-2 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 items-stretch relative z-10 h-full">

                {/* Left Column: Form & Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center w-full max-w-xl mx-auto space-y-8 lg:pl-24"
                >

                    {/* Headings */}
                    <div className="space-y-4">
                        <h1 className={`text-5xl md:text-7xl leading-[1.1] text-[#111625] ${serifFont.className} flex flex-nowrap items-center gap-x-3 whitespace-nowrap`}>
                            Hello
                            <div className="relative inline-block">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={titles[index]}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="absolute top-0 left-0 text-[#1E9A80]"
                                    >
                                        {titles[index]}.
                                    </motion.span>
                                </AnimatePresence>
                                <span className="invisible">{titles[index]}.</span>
                            </div>
                        </h1>
                        <p className="text-lg text-zinc-500 font-normal max-w-sm">
                            Enter your details to access your workspace and continue where you left off.
                        </p>
                    </div>

                    {/* Auth Card */}
                    <div className="w-full max-w-[380px] bg-transparent border-2 border-zinc-200 rounded-[28px] px-5 py-7">
                        <div className="space-y-4">
                            {/* Google Button */}
                            <Button
                                onClick={() => signIn('google', { callbackUrl: '/chat' })}
                                variant="outline"
                                className="w-full h-10 bg-white border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 justify-center gap-3 rounded-xl text-sm font-medium shadow-none cursor-pointer"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </Button>

                            {/* OR Divider */}
                            <div className="relative flex items-center justify-center py-1">
                                <Separator className="absolute w-full bg-zinc-200 h-0.5" />
                                <span className="relative bg-[#f3f3ee] px-2 text-[10px] text-zinc-400 uppercase font-medium tracking-wider">
                                    Or continue with email
                                </span>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <Input
                                        type="email"
                                        placeholder="name@work-email.com"
                                        className="h-10 bg-white border-2 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-[#1E9A80] focus-visible:border-[#1E9A80] rounded-xl text-sm shadow-none transition-all"
                                    />
                                </div>
                                <Link href="/chat" className="block w-full">
                                    <Button
                                        className="w-full h-10 bg-[#1E9A80] hover:bg-[#188f75] text-white rounded-xl text-sm font-medium tracking-wide shadow-none hover:shadow-none"
                                    >
                                        Continue with Email
                                    </Button>
                                </Link>
                            </div>

                            {/* Disclaimer */}
                            <p className="text-center text-[10px] text-zinc-400 mt-2">
                                By clicking continue, you agree to our <a href="#" className="underline decoration-zinc-300 hover:text-[#1E9A80] hover:decoration-[#1E9A80] transition-colors">Terms of Service</a> and <a href="#" className="underline decoration-zinc-300 hover:text-[#1E9A80] hover:decoration-[#1E9A80] transition-colors">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Visual/Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full h-full rounded-[48px] overflow-hidden hidden lg:block bg-[#111625]"
                >
                    <Image
                        src="/images/auth_image.jpeg?v=1"
                        alt="Authentication visual"
                        fill
                        className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                        priority
                    />
                </motion.div>

            </main>
        </div>
    );
}

// --- Icons Components ---
// GoogleIcon component is no longer needed as the SVG is inlined.
