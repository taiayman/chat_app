import React from "react";
import {
  Pencil,
  Gift,
  Sun,
  LogOut,
  ChevronLeft
} from "lucide-react";

interface ProfileMenuProps {
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  showProfileMenu,
  setShowProfileMenu,
}) => {
  if (!showProfileMenu) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setShowProfileMenu(false)}
      />
      {/* Menu Card */}
      <div className="absolute top-[72px] left-4 z-50 w-64 bg-white rounded-2xl border-2 border-[#f3f3ee] shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-3 font-sans">
        {/* Top Navigation Section */}
        <div className="space-y-1.5 mb-3">
          {/* Go back to dashboard */}
          <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-7 w-7 bg-[#f7f7f5] rounded-lg flex items-center justify-center">
              <ChevronLeft className="h-3.5 w-3.5 text-zinc-900" />
            </div>
            <span className="text-xs font-medium text-zinc-900">Go back to dashboard</span>
          </div>

          {/* Rename file (Active State) */}
          <div className="flex items-center gap-2.5 bg-[#f7f7f5] rounded-lg p-1.5 cursor-pointer w-full">
            <div className="h-7 w-7 bg-white rounded-md flex items-center justify-center shrink-0">
              <Pencil className="h-3 w-3 text-zinc-900" />
            </div>
            <span className="text-xs font-medium text-zinc-900">Rename file</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#D1D5DB] my-3" />

        {/* User Profile Section */}
        <div className="mb-3">
          <p className="text-xs font-bold text-zinc-900">testing2</p>
          <p className="text-[10px] text-[#9CA3AF]">testing2@gmail.com</p>
        </div>

        {/* Credits Widget */}
        <div className="bg-[#f7f7f5] rounded-xl p-3 mb-3 w-full">
          {/* Header Row */}
          <div className="flex justify-between mb-0.5">
            <span className="text-[10px] text-[#6B7280]">Credits</span>
            <span className="text-[10px] text-[#6B7280]">Renews in</span>
          </div>
          {/* Values Row */}
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-900">20 left</span>
            <span className="text-xs font-semibold text-zinc-900">6h 24m</span>
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 bg-[#E5E5E5] rounded-full mb-1.5">
            <div className="h-full w-[80%] bg-[#128C7E] rounded-full" />
          </div>
          {/* Footer Row */}
          <div className="flex justify-between">
            <span className="text-[9px] text-[#6B7280]">5 of 25 used today</span>
            <span className="text-[9px] text-[#128C7E] font-medium">+25 tomorrow</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#D1D5DB] my-3" />

        {/* Menu Options List */}
        <div className="space-y-2 mb-3">
          {/* Win free credits */}
          <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-[#f7f7f5] rounded-lg flex items-center justify-center">
              <Gift className="h-3.5 w-3.5 text-zinc-900" />
            </div>
            <span className="text-xs font-medium text-zinc-900">Win free credits</span>
          </div>

          {/* Theme Style */}
          <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 bg-[#f7f7f5] rounded-lg flex items-center justify-center">
              <Sun className="h-3.5 w-3.5 text-zinc-900" />
            </div>
            <span className="text-xs font-medium text-zinc-900">Theme Style</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#D1D5DB] my-3" />

        {/* Logout Section */}
        <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-[#f7f7f5] rounded-lg flex items-center justify-center">
            <LogOut className="h-3.5 w-3.5 text-zinc-900" />
          </div>
          <span className="text-xs font-medium text-zinc-900">Log out</span>
        </div>
      </div>
    </>
  );
};
