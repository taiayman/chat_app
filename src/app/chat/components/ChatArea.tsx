import React from "react";
import {
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Mic,
  Smile,
  Paperclip,
  Send,
  CheckCheck
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  status?: string;
}

interface ChatAreaProps {
  selectedContact: {
    id: number;
    name: string;
    avatar: string;
    online: boolean;
  };
  isLoading: boolean;
  currentMessages: Message[];
}

// Shimmer component with beautiful gradient animation
const ShimmerBlock = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden", className)}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

const MessageShimmer = () => (
  <div className="flex flex-col gap-4 px-3 py-4">
    {/* Today badge shimmer */}
    <div className="flex justify-center">
      <ShimmerBlock className="bg-white/80 px-2.5 py-0.5 rounded-full h-5 w-14 border border-zinc-100/50" />
    </div>

    {/* Their message shimmer - short */}
    <div className="flex justify-start">
      <div className="flex flex-col gap-1 items-start">
        <ShimmerBlock className="bg-white rounded-2xl rounded-bl-sm h-10 w-32 border border-zinc-100/50" />
        <ShimmerBlock className="bg-zinc-200/40 rounded h-2.5 w-12 ml-1" />
      </div>
    </div>

    {/* Their message shimmer - medium */}
    <div className="flex justify-start">
      <div className="flex flex-col gap-1 items-start">
        <ShimmerBlock className="bg-white rounded-2xl rounded-bl-sm h-12 w-52 border border-zinc-100/50" />
        <ShimmerBlock className="bg-zinc-200/40 rounded h-2.5 w-14 ml-1" />
      </div>
    </div>

    {/* My message shimmer */}
    <div className="flex justify-end">
      <div className="flex flex-col gap-1 items-end">
        <ShimmerBlock className="bg-[#E8F5F3] rounded-2xl rounded-br-sm h-10 w-44" />
        <div className="flex items-center gap-1 pr-1">
          <ShimmerBlock className="bg-[#00A389]/30 rounded-full h-2.5 w-2.5" />
          <ShimmerBlock className="bg-zinc-200/40 rounded h-2.5 w-12" />
        </div>
      </div>
    </div>

    {/* Their message shimmer - long */}
    <div className="flex justify-start">
      <div className="flex flex-col gap-1 items-start">
        <ShimmerBlock className="bg-white rounded-2xl rounded-bl-sm h-16 w-64 border border-zinc-100/50" />
        <ShimmerBlock className="bg-zinc-200/40 rounded h-2.5 w-14 ml-1" />
      </div>
    </div>

    {/* My message shimmer - medium */}
    <div className="flex justify-end">
      <div className="flex flex-col gap-1 items-end">
        <ShimmerBlock className="bg-[#E8F5F3] rounded-2xl rounded-br-sm h-12 w-56" />
        <div className="flex items-center gap-1 pr-1">
          <ShimmerBlock className="bg-[#00A389]/30 rounded-full h-2.5 w-2.5" />
          <ShimmerBlock className="bg-zinc-200/40 rounded h-2.5 w-12" />
        </div>
      </div>
    </div>

    {/* Their message shimmer - short */}
    <div className="flex justify-start">
      <div className="flex flex-col gap-1 items-start">
        <ShimmerBlock className="bg-white rounded-2xl rounded-bl-sm h-10 w-36 border border-zinc-100/50" />
        <ShimmerBlock className="bg-zinc-200/40 rounded h-2.5 w-12 ml-1" />
      </div>
    </div>
  </div>
);

export const ChatArea: React.FC<ChatAreaProps> = ({
  selectedContact,
  isLoading,
  currentMessages,
}) => {
  return (
    <div className="flex-1 bg-white rounded-2xl flex flex-col min-h-0 overflow-hidden">
      {/* Chat Header */}
      <div className="px-3 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 pl-1 cursor-pointer hover:bg-zinc-50 rounded-lg p-1 transition-colors">
          <Avatar className="h-9 w-9 border border-zinc-100">
            <AvatarImage src={selectedContact.avatar} />
            <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-zinc-900 text-sm">{selectedContact.name}</h2>
            <div className="flex items-center gap-1">
              <span className={cn("h-1.5 w-1.5 rounded-full", selectedContact.online ? "bg-green-500" : "bg-zinc-300")}></span>
              <span className={cn("text-[10px] font-medium", selectedContact.online ? "text-green-500" : "text-zinc-400")}>
                {selectedContact.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 pr-1">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-zinc-200 bg-white text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer">
            <Search className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-zinc-200 bg-white text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer">
            <Phone className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-zinc-200 bg-white text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer">
            <Video className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-md border-zinc-200 bg-white text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-[#f3f3ee] rounded-xl mx-2 my-2 min-h-0 overflow-hidden">
        {isLoading ? (
          <MessageShimmer />
        ) : (
          <ScrollArea className="h-full px-3 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <span className="bg-white px-2.5 py-0.5 rounded-full text-[10px] font-medium text-zinc-400 border border-zinc-100">Today</span>
              </div>

              {currentMessages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn("flex flex-col gap-0.5 max-w-[70%]", msg.sender === "me" ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                      msg.sender === "me"
                        ? "bg-[#E8F5F3] text-zinc-800 rounded-br-sm"
                        : "bg-white text-zinc-800 rounded-bl-sm border border-zinc-100"
                    )}>
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1 px-1">
                      {msg.sender === "me" && msg.status === "read" && (
                        <CheckCheck className="h-2.5 w-2.5 text-[#00A389]" />
                      )}
                      <span className="text-[9px] text-zinc-400 font-medium">{msg.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 pt-1 pb-3 bg-white shrink-0">
        <div className="flex-1 relative">
          <Input
            placeholder="Type any message..."
            className="w-full h-12 pl-4 pr-36 rounded-full border-2 border-[#F2F2F0] bg-white text-sm placeholder:text-[#8696A0]"
          />
          {/* Action Icons and Send Button inside input */}
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <button className="text-zinc-800 hover:text-zinc-900 transition-colors cursor-pointer">
              <Mic className="h-4 w-4" />
            </button>
            <button className="text-zinc-800 hover:text-zinc-900 transition-colors cursor-pointer">
              <Smile className="h-4 w-4" />
            </button>
            <button className="text-zinc-800 hover:text-zinc-900 transition-colors cursor-pointer">
              <Paperclip className="h-4 w-4" />
            </button>
            <Button className="h-9 w-9 rounded-full bg-[#00A884] hover:bg-[#128C7E] text-white flex items-center justify-center p-0 cursor-pointer">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
