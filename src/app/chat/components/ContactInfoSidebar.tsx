import React from "react";
import {
  X,
  Phone,
  Video,
  Link2,
  FileText
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ContactInfoSidebarProps {
  showContactInfo: boolean;
  setShowContactInfo: (show: boolean) => void;
  selectedContact: {
    id: number;
    name: string;
    avatar: string;
  };
  activeInfoTab: string;
  setActiveInfoTab: (tab: string) => void;
}

export const ContactInfoSidebar: React.FC<ContactInfoSidebarProps> = ({
  showContactInfo,
  setShowContactInfo,
  selectedContact,
  activeInfoTab,
  setActiveInfoTab,
}) => {
  if (!showContactInfo) return null;

  return (
    <div className="absolute top-0 right-0 bottom-0 w-[400px] z-30 p-3 pl-0">
      <div className="h-full w-full bg-white rounded-2xl flex flex-col overflow-hidden border border-zinc-100/50 shadow-xl animate-in slide-in-from-right duration-300">
        <div className="p-5 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-zinc-900">Contact Info</h2>
          <button
            onClick={() => setShowContactInfo(false)}
            className="text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-5 pb-5">
            {/* Profile */}
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-20 w-20 mb-3 border-4 border-[#f3f3ee]">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback className="text-2xl">{selectedContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold text-zinc-900 mb-0.5">{selectedContact.name}</h3>
              <p className="text-sm text-zinc-400">
                {selectedContact.name.toLowerCase().replace(" ", "")}@chatui.com
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button variant="outline" className="flex-1 h-9 rounded-xl border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 gap-2 cursor-pointer">
                <Phone className="h-3.5 w-3.5" />
                <span className="text-sm">Audio</span>
              </Button>
              <Button variant="outline" className="flex-1 h-9 rounded-xl border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 gap-2 cursor-pointer">
                <Video className="h-3.5 w-3.5" />
                <span className="text-sm">Video</span>
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex mb-6">
              <div className="bg-[#f3f3ee] p-1 rounded-2xl inline-flex">
                {["Media", "Link", "Docs"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveInfoTab(tab.toLowerCase())}
                    className={cn(
                      "px-3 py-2 text-xs font-medium rounded-xl transition-all min-w-[50px] cursor-pointer",
                      activeInfoTab === tab.toLowerCase()
                        ? "bg-white text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-600"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Grid */}
            {activeInfoTab === "media" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div>
                  <div className="bg-[#F8F8F5] rounded-lg px-3 h-8 flex items-center w-full mb-3">
                    <span className="text-xs font-semibold text-[#596881]">May</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={`may-${i}`} className="aspect-square rounded-lg overflow-hidden bg-zinc-100">
                        <img
                          src={`https://picsum.photos/200/200?random=${i}`}
                          alt="Media"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-[#F8F8F5] rounded-lg px-3 h-8 flex items-center w-full mb-3">
                    <span className="text-xs font-semibold text-[#596881]">April</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 6, 7].map((i) => (
                      <div key={`apr-${i}`} className="aspect-square rounded-lg overflow-hidden bg-zinc-100">
                        <img
                          src={`https://picsum.photos/200/200?random=${i}`}
                          alt="Media"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-[#F8F8F5] rounded-lg px-3 h-8 flex items-center w-full mb-3">
                    <span className="text-xs font-semibold text-[#596881]">March</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[8, 9, 10, 11].map((i) => (
                      <div key={`mar-${i}`} className="aspect-square rounded-lg overflow-hidden bg-zinc-100">
                        <img
                          src={`https://picsum.photos/200/200?random=${i}`}
                          alt="Media"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Links Tab */}
            {activeInfoTab === "link" && (
              <div className="space-y-3 animate-in fade-in duration-300">
                {[1, 2, 3].map((i) => (
                  <div key={`link-${i}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer group">
                    <div className="h-10 w-10 bg-[#f3f3ee] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#e5e5e0] transition-colors">
                      <Link2 className="h-5 w-5 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">Design Resources {i}</p>
                      <p className="text-xs text-zinc-400 truncate">www.figma.com/file/...</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Docs Tab */}
            {activeInfoTab === "docs" && (
              <div className="space-y-3 animate-in fade-in duration-300">
                {[1, 2, 3].map((i) => (
                  <div key={`doc-${i}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer group">
                    <div className="h-10 w-10 bg-[#f3f3ee] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#e5e5e0] transition-colors">
                      <FileText className="h-5 w-5 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">Project_Specs_v{i}.pdf</p>
                      <p className="text-xs text-zinc-400 truncate">2.4 MB • 12 May 2023</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
