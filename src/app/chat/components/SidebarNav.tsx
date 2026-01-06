import { signOut } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  MessageCircle,
  Compass,
  Sparkles,
  User,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  userImage?: string | null;
  isMobile?: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  showProfileMenu,
  setShowProfileMenu,
  userImage,
  isMobile = false,
}) => {
  const router = useRouter();

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === "sparkles") {
      router.push("/ai");
    } else if (tab === "chat") {
      router.push("/chat");
    }
  };

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <div className="bg-white border-t border-zinc-100 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <nav className="flex items-center justify-around">
          <button
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              activeTab === "home" ? "text-[#1E9A80]" : "text-zinc-400"
            )}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>

          <button
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              activeTab === "chat" ? "text-[#1E9A80]" : "text-zinc-400"
            )}
            onClick={() => handleNavigation("chat")}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[10px] font-medium">Chats</span>
          </button>

          <button
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              activeTab === "compass" ? "text-[#1E9A80]" : "text-zinc-400"
            )}
            onClick={() => setActiveTab("compass")}
          >
            <Compass className="h-5 w-5" />
            <span className="text-[10px] font-medium">Discover</span>
          </button>

          <button
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              activeTab === "sparkles" ? "text-[#1E9A80]" : "text-zinc-400"
            )}
            onClick={() => handleNavigation("sparkles")}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-medium">AI</span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all">
                <Avatar className="h-6 w-6 border border-zinc-200">
                  <AvatarImage src={userImage || undefined} />
                  <AvatarFallback>
                    <User className="h-3 w-3 text-zinc-400" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-[10px] font-medium text-zinc-400">Profile</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="w-64 p-2 rounded-2xl border-none mb-2">
              <div className="p-3 bg-zinc-50 rounded-xl mx-2 my-1">
                <div className="text-sm font-semibold mb-1">My Account</div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium">Credits</span>
                  <span className="text-zinc-400">Renews in</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-bold">20 left</span>
                  <span className="text-xs font-medium text-zinc-800">6h 24m</span>
                </div>
                <Progress value={80} className="h-1.5 bg-zinc-200" />
              </div>
              <Separator className="my-1 bg-zinc-100" />
              <div className="px-2 py-1.5">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-zinc-600 font-medium hover:bg-zinc-50 rounded-xl px-2 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="h-4 w-4" /> Log out
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    );
  }

  // Desktop Vertical Sidebar
  return (
    <div className="flex flex-col items-center justify-between pt-5 pb-6 w-[76px] shrink-0">
      {/* Top Section: Logo + Nav */}
      <div className="flex flex-col items-center gap-8">
        {/* App Logo */}
        <div
          className="h-11 w-11 bg-[#1E9A80] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 8.25V17.05H2.75C3.039 17.05 3.325 17.107 3.592 17.218C3.859 17.328 4.102 17.49 4.306 17.694C4.51 17.899 4.672 18.141 4.783 18.408C4.893 18.675 4.95 18.961 4.95 19.25V22H11.55L19.8 13.75V4.95H17.05C16.761 4.95 16.475 4.893 16.208 4.783C15.941 4.672 15.699 4.51 15.495 4.306C15.29 4.101 15.128 3.859 15.018 3.592C14.907 3.325 14.85 3.039 14.85 2.75V0H8.25L0 8.25ZM9.35 16.5H5.5V10.45L10.45 5.5H14.3V11.55L9.35 16.5Z" fill="white" />
          </svg>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col items-center gap-3">
          <button
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-all cursor-pointer",
              activeTab === "home" ? "bg-white" : "hover:bg-white/50"
            )}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-4 w-4 text-[#151515]" />
          </button>

          <button
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-all relative cursor-pointer",
              activeTab === "chat" ? "bg-white" : "hover:bg-white/50"
            )}
            onClick={() => handleNavigation("chat")}
          >
            <MessageCircle className="h-4 w-4 text-[#151515]" />
          </button>

          <button
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-all cursor-pointer",
              activeTab === "compass" ? "bg-white" : "hover:bg-white/50"
            )}
            onClick={() => setActiveTab("compass")}
          >
            <Compass className="h-4 w-4 text-[#151515]" />
          </button>
        </nav>
      </div>

      {/* Bottom Section: Settings + Avatar */}
      <div className="flex flex-col items-center gap-3">
        <button
          className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center transition-all cursor-pointer",
            activeTab === "sparkles" ? "bg-white" : "hover:bg-white/50"
          )}
          onClick={() => handleNavigation("sparkles")}
        >
          <Sparkles className="h-4 w-4 text-[#151515]" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userImage || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-64 p-2 rounded-2xl border-none ml-2">
            <div className="p-3 bg-zinc-50 rounded-xl mx-2 my-1">
              <div className="text-sm font-semibold mb-1">My Account</div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium">Credits</span>
                <span className="text-zinc-400">Renews in</span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-lg font-bold">20 left</span>
                <span className="text-xs font-medium text-zinc-800">6h 24m</span>
              </div>
              <Progress value={80} className="h-1.5 bg-zinc-200" />
              <div className="flex justify-between text-[10px] mt-2 text-zinc-400">
                <span>5 of 25 used today</span>
                <span className="text-[#00A389] font-medium">+25 tomorrow</span>
              </div>
            </div>
            <Separator className="my-1 bg-zinc-100" />
            <div className="px-2 py-1.5">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-zinc-600 font-medium hover:bg-zinc-50 rounded-xl px-2 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
