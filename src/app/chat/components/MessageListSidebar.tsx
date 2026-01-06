import React from "react";
import {
  Pencil,
  Search,
  Filter,
  CheckCheck,
  Archive,
  MessageCircle,
  Settings,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Contact {
  id: number | string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online?: boolean;
  isOnline?: boolean;
  status: string;
}

interface MessageListSidebarProps {
  contacts: Contact[];
  filteredContacts: Contact[];
  sidebarFilteredContacts: Contact[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sidebarSearchQuery: string;
  setSidebarSearchQuery: (query: string) => void;
  selectedContact: Contact | null;
  handleContactClick: (contact: Contact) => void;
  showNewMessageModal: boolean;
  setShowNewMessageModal: (show: boolean) => void;
  handleContextMenu: (e: React.MouseEvent, contactId: number | string) => void;
  archiveId: number | string | null;
  handleArchive: (id: number | string) => void;
  unreadId: number | string | null;
  handleUnread: (id: number | string) => void;
  filterUnread: boolean;
  setFilterUnread: (filter: boolean) => void;
  isLoading?: boolean;
  userImage?: string | null;
}

// Shimmer component
const ShimmerBlock = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden bg-zinc-100", className)}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

// Contact card shimmer
const ContactShimmer = () => (
  <div className="flex items-center gap-3 p-3 rounded-xl">
    <ShimmerBlock className="h-11 w-11 rounded-full shrink-0" />
    <div className="flex-1 space-y-2">
      <ShimmerBlock className="h-3.5 w-24 rounded" />
      <ShimmerBlock className="h-3 w-36 rounded" />
    </div>
    <ShimmerBlock className="h-3 w-10 rounded" />
  </div>
);

export const MessageListSidebar: React.FC<MessageListSidebarProps> = ({
  contacts,
  filteredContacts,
  sidebarFilteredContacts,
  searchQuery,
  setSearchQuery,
  sidebarSearchQuery,
  setSidebarSearchQuery,
  selectedContact,
  handleContactClick,
  showNewMessageModal,
  setShowNewMessageModal,
  handleContextMenu,
  archiveId,
  handleArchive,
  unreadId,
  handleUnread,
  filterUnread,
  setFilterUnread,
  isLoading = false,
  userImage,
}) => {
  return (
    <div className="w-full md:w-[320px] bg-white md:rounded-2xl flex flex-col overflow-hidden h-full">
      {/* Mobile Header */}
      <div className="md:hidden px-4 pt-4 pb-2 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-zinc-100">
              <AvatarImage src={userImage || undefined} />
              <AvatarFallback>Me</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold text-zinc-900">Chats</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-zinc-600"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-zinc-600"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block p-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-zinc-800">All Message</h1>
          <div className="relative">
            <Button
              className={cn(
                "bg-[#00A389] hover:bg-[#008f78] text-white rounded-lg px-3 py-1.5 h-8 gap-1.5 text-xs transition-colors cursor-pointer",
                showNewMessageModal && "bg-[#008f78]"
              )}
              onClick={() => setShowNewMessageModal(!showNewMessageModal)}
            >
              <Pencil className="h-3.5 w-3.5" />
              New Message
            </Button>

            {showNewMessageModal && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setShowNewMessageModal(false)}
                />
                <div className="absolute top-full right-0 mt-2 z-50 w-[280px] bg-white rounded-2xl border-2 border-[#f3f3ee] shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-3 font-sans animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <div className="text-lg font-bold text-zinc-900 mb-3 px-1">New Message</div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between h-9 w-full bg-white border-2 border-[#F2F2F0] rounded-[14px] pl-3 pr-2">
                      <div className="flex items-center gap-2.5 flex-1">
                        <Search className="h-4 w-4 text-[#94A3B8] shrink-0" />
                        <input
                          type="text"
                          placeholder="Search people..."
                          autoFocus
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 placeholder:text-[#94A3B8]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5 max-h-[350px] overflow-y-auto pr-1 -mr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <div className="text-[10px] font-semibold text-zinc-400 mb-1 px-2 uppercase tracking-wider">Suggested</div>
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-[#f3f3ee] transition-colors group"
                          onClick={() => {
                            handleContactClick(contact);
                            setShowNewMessageModal(false);
                            setSearchQuery("");
                          }}
                        >
                          <Avatar className="h-8 w-8 border border-zinc-100">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-zinc-900 text-sm">{contact.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-xs text-zinc-400">
                        No contacts found
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar - Both mobile and desktop */}
      <div className="px-4 md:px-4 pb-2 md:pb-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-[#f3f3ee] md:bg-white border-0 md:border-2 md:border-[#F2F2F0] rounded-xl md:rounded-lg h-10 md:h-9 text-sm md:text-xs focus-visible:ring-0 focus-visible:border-[#00A389] transition-colors"
              value={sidebarSearchQuery}
              onChange={(e) => setSidebarSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-10 w-10 md:h-9 md:w-9 rounded-xl md:rounded-lg border-0 md:border-2 md:border-[#F2F2F0] bg-[#f3f3ee] md:bg-white text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 md:hover:bg-zinc-50 cursor-pointer",
              filterUnread && "bg-[#E8F5F3] md:bg-zinc-100 border-[#00A389] text-[#00A389]"
            )}
            onClick={() => setFilterUnread(!filterUnread)}
          >
            <Filter className="h-4 w-4 md:h-3.5 md:w-3.5" />
          </Button>

          {/* Mobile New Message Button */}
          <Button
            className="md:hidden h-10 w-10 rounded-xl bg-[#1E9A80] hover:bg-[#188f75] text-white p-0"
            onClick={() => setShowNewMessageModal(!showNewMessageModal)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile New Message Modal */}
      {showNewMessageModal && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => setShowNewMessageModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Button>
              <h2 className="text-lg font-bold">New Message</h2>
            </div>
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  placeholder="Search people..."
                  autoFocus
                  className="pl-10 bg-[#f3f3ee] border-0 rounded-xl h-11 text-sm focus-visible:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-1 px-4">
              <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Suggested</div>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#f3f3ee] active:bg-[#e8e8e3] transition-colors"
                    onClick={() => {
                      handleContactClick(contact);
                      setShowNewMessageModal(false);
                      setSearchQuery("");
                    }}
                  >
                    <Avatar className="h-11 w-11 border border-zinc-100">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-zinc-900">{contact.name}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-zinc-400">
                  No contacts found
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 px-3 md:px-3">
        <div className="flex flex-col gap-1 md:gap-0.5 pb-20 md:pb-3">
          {isLoading ? (
            // Shimmer loading state
            <>
              <ContactShimmer />
              <ContactShimmer />
              <ContactShimmer />
              <ContactShimmer />
              <ContactShimmer />
            </>
          ) : sidebarFilteredContacts.length === 0 ? (
            <div className="text-center py-8 text-sm text-zinc-400">
              No conversations yet
            </div>
          ) : (
            sidebarFilteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="relative rounded-xl md:rounded-xl w-full md:w-[98%] md:mx-auto"
              >
                {/* Unread Button Background (Left) */}
                <div className="absolute top-0 left-0 bottom-0 w-[64px] flex items-center justify-center z-0">
                  <button
                    className="h-full w-[60px] bg-[#1E9A80] rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-[#188f75] transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnread(contact.id);
                    }}
                  >
                    <MessageCircle className="h-4 w-4 text-white" />
                    <span className="text-[9px] font-medium text-white">Unread</span>
                  </button>
                </div>

                {/* Archive Button Background */}
                <div className="absolute top-0 right-0 bottom-0 w-[64px] flex items-center justify-center z-0">
                  <button
                    className="h-full w-[60px] bg-[#1E9A80] rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-[#188f75] transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArchive(contact.id);
                    }}
                  >
                    <Archive className="h-4 w-4 text-white" />
                    <span className="text-[9px] font-medium text-white">Archive</span>
                  </button>
                </div>

                <div
                  onClick={() => handleContactClick(contact)}
                  onContextMenu={(e) => handleContextMenu(e, contact.id)}
                  className={cn(
                    "group flex items-center gap-3 md:gap-2.5 py-3 md:py-2.5 px-2 md:px-1.5 rounded-xl cursor-pointer transition-all duration-200 ease-in-out relative z-10 bg-white active:bg-[#f3f3ee]",
                    selectedContact?.id === contact.id ? "bg-[#f3f3ee]" : "hover:bg-[#f3f3ee]",
                    archiveId === contact.id ? "w-[calc(100%-68px)] bg-[#f3f3ee]" : "",
                    unreadId === contact.id ? "w-[calc(100%-68px)] ml-auto bg-[#f3f3ee]" : "",
                    archiveId !== contact.id && unreadId !== contact.id && "w-full"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12 md:h-10 md:w-10 border border-zinc-100">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {(contact.online || contact.isOnline) && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 md:h-2.5 md:w-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={cn("text-[15px] md:text-sm", contact.unread ? "font-bold text-zinc-900" : "font-semibold text-zinc-900")}>
                        {contact.name}
                      </span>
                      <span className={cn("text-xs md:text-[10px]", contact.unread ? "text-[#1E9A80] font-medium" : "text-zinc-400")}>
                        {contact.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between min-w-0">
                      <p className={cn("text-sm md:text-xs truncate pr-2 flex-1 w-0", contact.unread ? "text-zinc-900 font-medium" : "text-zinc-500")}>
                        {contact.lastMessage}
                      </p>
                      {contact.unread ? (
                        <div className="h-5 min-w-5 md:h-4 md:min-w-4 px-1.5 md:px-1 rounded-full bg-[#1E9A80] flex items-center justify-center shrink-0">
                          <span className="text-[10px] md:text-[9px] font-bold text-white">1</span>
                        </div>
                      ) : contact.status === "read" ? (
                        <CheckCheck className="h-4 w-4 md:h-3 md:w-3 text-zinc-400 shrink-0" />
                      ) : contact.status === "delivered" ? (
                        <CheckCheck className="h-4 w-4 md:h-3 md:w-3 text-zinc-300 shrink-0" />
                      ) : null}
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
