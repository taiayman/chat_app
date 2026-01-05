import React from "react";
import {
  Pencil,
  Search,
  Filter,
  CheckCheck,
  Archive,
  MessageCircle,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
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
  selectedContact: Contact;
  handleContactClick: (contact: Contact) => void;
  showNewMessageModal: boolean;
  setShowNewMessageModal: (show: boolean) => void;
  handleContextMenu: (e: React.MouseEvent, contactId: number) => void;
  archiveId: number | null;
  handleArchive: (id: number) => void;
  unreadId: number | null;
  handleUnread: (id: number) => void;
}

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
}) => {
  return (
    <div className="w-[360px] bg-white rounded-2xl flex flex-col overflow-hidden">
      <div className="p-4 pb-2">
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

        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <Input
              placeholder="Search in message"
              className="pl-8 bg-white border-2 border-[#F2F2F0] rounded-lg h-9 text-xs focus-visible:ring-0 focus-visible:border-[#00A389] transition-colors"
              value={sidebarSearchQuery}
              onChange={(e) => setSidebarSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-2 border-[#F2F2F0] bg-white text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 cursor-pointer">
            <Filter className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 pl-2 pr-3">
        <div className="flex flex-col gap-0.5 pb-3">
          {sidebarFilteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="relative overflow-hidden rounded-xl"
            >
              {/* Unread Button Background (Left) */}
              <div
                className={cn(
                  "absolute top-0 left-0 bottom-0 w-[64px] flex items-center justify-center z-0 transition-opacity duration-200",
                  unreadId === contact.id ? "opacity-100" : "opacity-0"
                )}
              >
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

              <div
                onClick={() => handleContactClick(contact)}
                onContextMenu={(e) => handleContextMenu(e, contact.id)}
                className={cn(
                  "group flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all duration-200 ease-in-out relative z-10",
                  selectedContact.id === contact.id ? "bg-[#f3f3ee]" : "hover:bg-[#f3f3ee]",
                  archiveId === contact.id ? "w-[calc(100%-68px)] bg-[#f3f3ee]" : "w-[92%] mx-auto",
                  unreadId === contact.id ? "translate-x-[68px] w-[calc(100%-68px)] bg-[#f3f3ee]" : "translate-x-0"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-10 w-10 border border-zinc-100">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={cn("text-sm", contact.unread ? "font-bold text-zinc-900" : "font-semibold text-zinc-900")}>
                      {contact.name}
                    </span>
                    <span className={cn("text-[10px]", contact.unread ? "text-[#1E9A80] font-medium" : "text-zinc-400")}>
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={cn("text-xs truncate pr-2", contact.unread ? "text-zinc-900 font-medium" : "text-zinc-500")}>
                      {contact.lastMessage}
                    </p>
                    {contact.unread ? (
                      <div className="h-4 min-w-4 px-1 rounded-full bg-[#1E9A80] flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">1</span>
                      </div>
                    ) : contact.status === "read" ? (
                      <CheckCheck className="h-3 w-3 text-zinc-400" />
                    ) : contact.status === "delivered" ? (
                      <CheckCheck className="h-3 w-3 text-zinc-300" />
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Archive Button Background */}
              <div
                className={cn(
                  "absolute top-0 right-0 bottom-0 w-[64px] flex items-center justify-center z-0 transition-opacity duration-200",
                  archiveId === contact.id ? "opacity-100" : "opacity-0"
                )}
              >
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
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
