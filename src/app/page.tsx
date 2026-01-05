import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { Inter, Newsreader } from "next/font/google"; // Using Newsreader for the serif look
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Font configurations
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serifFont = Newsreader({ 
  subsets: ["latin"], 
  style: "normal",
  weight: ["300", "400"], // Lighter weights for the elegant headline
  variable: "--font-serif" 
});

export default function ClaudeLanding() {
  return (
    <div className={`min-h-screen bg-[#141413] text-[#F4F4F0] selection:bg-[#D96C45] selection:text-white ${inter.variable} ${serifFont.variable} font-sans overflow-hidden flex flex-col`}>
      
      {/* --- Navbar --- */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="text-[#D96C45]">
            <SparkleIcon className="w-6 h-6 fill-current" />
          </div>
          <span className={`text-2xl font-serif tracking-tight ${serifFont.className}`}>Claude</span>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9da2a6]">
          {["Meet Claude", "Platform", "Solutions", "Pricing", "Learn"].map((item) => (
            <div key={item} className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors group">
              {item}
              <ChevronDown className="w-3 h-3 opacity-70 group-hover:translate-y-0.5 transition-transform" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="hidden md:flex text-white hover:bg-neutral-800 hover:text-white border border-neutral-700 rounded-lg px-4"
          >
            Contact sales
          </Button>
          <Button 
            className="bg-[#F4F4F0] text-black hover:bg-white rounded-lg px-5 font-medium transition-all"
          >
            Try Claude
          </Button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
        
        {/* Left Column: Form & Text */}
        <div className="flex flex-col items-center lg:items-center justify-center w-full max-w-md mx-auto lg:max-w-lg space-y-10">
          
          {/* Headings */}
          <div className="text-center space-y-4">
            <h1 className={`text-6xl md:text-7xl leading-[0.9] text-[#F4F4F0] ${serifFont.className}`}>
              Impossible? <br />
              Possible.
            </h1>
            <p className="text-xl md:text-2xl text-[#9da2a6] font-normal">
              The AI for problem solvers
            </p>
          </div>

          {/* Auth Card */}
          <div className="w-full bg-[#1A1A19] border border-[#2C2C2C] rounded-[24px] p-6 md:p-8 shadow-2xl">
            <div className="space-y-4">
              {/* Google Button */}
              <Button 
                variant="outline" 
                className="w-full h-12 bg-[#222221] border-[#383838] text-white hover:bg-[#2C2C2C] hover:text-white justify-center gap-3 rounded-lg text-[15px] font-medium transition-all"
              >
                <GoogleIcon />
                Continue with Google
              </Button>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center py-2">
                <Separator className="absolute w-full bg-[#383838]" />
                <span className="relative bg-[#1A1A19] px-2 text-xs text-[#6e7074] uppercase font-medium">
                  OR
                </span>
              </div>

              {/* Email Input */}
              <div className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="h-12 bg-[#222221] border-[#383838] text-white placeholder:text-[#6e7074] focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#555] rounded-lg text-base"
                />
                <Button 
                  className="w-full h-12 bg-[#F4F4F0] text-black hover:bg-white rounded-lg text-[15px] font-semibold tracking-tight transition-all"
                >
                  Continue with email
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-center text-xs text-[#6e7074] mt-4">
                By continuing, you acknowledge Anthropic's <a href="#" className="underline hover:text-[#9da2a6]">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual/Image */}
        <div className="relative w-full h-[600px] lg:h-[85vh] bg-[#C65D3B] rounded-[32px] overflow-hidden flex items-end justify-center group">
            {/* 
               NOTE: Since I cannot provide the exact image asset of the man, 
               I am recreating the background color and placing a placeholder 
               block that simulates the layout. Replace <div className="..."/> 
               with <Image src="..." /> for the real image.
            */}
            
            {/* Background Decorations (Code Snippets) */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[#e0896f] font-mono text-xl md:text-2xl space-y-8 select-none opacity-80 rotate-[-5deg]">
                 <p>{`" ) ! { } > - < / - . . { ( { : .`}</p>
                 <p className="ml-12">{`- < \ - - > ; " + - : .`}</p>
                 <p className="ml-24">{`{ } - \ - . { -`}</p>
            </div>

            {/* Subject Image Placeholder */}
            {/* In a real project, use: <Image src="/man-on-steps.jpg" fill className="object-cover" alt="Man on steps" /> */}
            <div className="relative w-full h-full flex items-end justify-center">
                {/* Simulated wooden steps/man composition using a gradient or colored block if no image */}
                <div className="relative z-10 w-full max-w-md">
                   {/* This represents the man sitting on stairs */}
                   <img 
                     src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=2069&auto=format&fit=crop"
                     alt="Man sitting"
                     className="object-cover object-bottom w-full h-[500px] lg:h-[700px] mask-image-gradient"
                     style={{
                        maskImage: 'linear-gradient(to top, black 80%, transparent 100%)'
                     }}
                   />
                   
                   {/* Wooden Steps Approximation (CSS Only) */}
                   <div className="absolute bottom-0 w-full flex flex-col items-center">
                        <div className="w-[120%] h-12 bg-[#A05A2C] -rotate-1 skew-x-12 translate-y-4 shadow-xl"></div>
                        <div className="w-[110%] h-12 bg-[#8C4B22] -rotate-1 skew-x-12 translate-y-2 shadow-xl"></div>
                        <div className="w-[100%] h-16 bg-[#753D1B] -rotate-1 skew-x-12 shadow-2xl"></div>
                   </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}

// --- Icons Components ---

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Custom asterisk/sparkle for the logo
function SparkleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
        </svg>
    )
}