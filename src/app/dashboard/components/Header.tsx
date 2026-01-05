import React from "react";
import {
  MessageCircle,
  Search,
  Bell,
  Settings,
  ChevronDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  return (
    <div className="flex items-center mb-3 shrink-0">
      {/* Unified Header */}
      <header className="h-14 flex-1 flex items-center justify-between px-5 bg-white rounded-2xl border border-zinc-100/50">
        {/* Left - Message Button */}
        <div className="flex items-center gap-2 cursor-pointer">
          <MessageCircle className="h-4 w-4 text-zinc-900" />
          <span className="text-sm font-semibold text-zinc-900">Message</span>
        </div>

        {/* Right - Search and Actions */}
        <div className="flex items-center gap-3 flex-1 justify-end max-w-xl">
          {/* Search Input */}
          <div className="relative w-80">
            <div className="flex items-center justify-between h-9 w-full bg-white border-2 border-[#F2F2F0] rounded-[14px] pl-3 pr-1">
              {/* Left: Icon and Input */}
              <div className="flex items-center gap-2.5 flex-1">
                <Search className="h-4 w-4 text-[#94A3B8] shrink-0" />
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 placeholder:text-[#94A3B8]"
                />
              </div>
              {/* Right: Keyboard Shortcut Badge */}
              <div className="flex items-center gap-1 bg-[#f3f3ee] rounded-lg px-2 py-[5px]">
                <span className="text-xs font-semibold text-zinc-900">⌘</span>
                <span className="text-xs font-semibold text-zinc-900">+</span>
                <span className="text-xs font-semibold text-zinc-900">K</span>
              </div>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-zinc-200 bg-white text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50">
              <Bell className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-zinc-200 bg-white text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="h-6 w-px bg-[#f3f3ee]" />

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-lg cursor-pointer hover:bg-zinc-50 transition-colors group">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          </div>
        </div>
      </header>
    </div>
  );
};
