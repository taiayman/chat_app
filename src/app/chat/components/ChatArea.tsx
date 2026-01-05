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
  CheckCheck,
  Trash2,
  Image,
  FileText,
  Camera,
  MapPin,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string | number;
  sender: string;
  content: string;
  time: string;
  status?: string;
}

interface ChatAreaProps {
  selectedContact: {
    id: string | number;
    name: string;
    avatar: string;
    online?: boolean;
    isOnline?: boolean;
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

export const ChatArea: React.FC<ChatAreaProps & { onSendMessage: (content: string) => void }> = ({
  selectedContact,
  isLoading,
  onSendMessage,
  currentMessages,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [showChatSearch, setShowChatSearch] = React.useState(false);
  const [chatSearchQuery, setChatSearchQuery] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [emojiCategory, setEmojiCategory] = React.useState("smileys");
  const [showAttachmentPicker, setShowAttachmentPicker] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<{ name: string, type: string, size: string, preview?: string, file?: File } | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const recordingIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  // Emoji categories (memoized to prevent re-renders)
  const emojiCategories = React.useMemo(() => ({
    smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🥴"],
    gestures: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🦷", "🦴", "👀", "👁️"],
    hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥️", "💌", "💋", "🫶"],
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🐢", "🐍", "🦎", "🐙", "🦑", "🦐", "🦞", "🦀"],
    food: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🌽", "🥕", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🧀", "🥚", "🍳", "", "🧇", "🥓", "🥩", "🍗", "🍖", "🌭", "🍔", "🍟"],
    objects: ["⌚", "📱", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "💽", "💾", "💿", "📀", "🎥", "📷", "📹", "🎬", "📺", "📻", "🎙️", "⏱️", "⏰", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "💸", "💵", "", "💳", "💎", "⚖️", "🧰", "🔧", "🔨", "🛠️"],
  }), []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  // Cleanup recording interval on unmount
  React.useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    // Send voice message
    const duration = formatTime(recordingTime);
    onSendMessage(`🎤 Voice message (${duration})`);
    setIsRecording(false);
    setRecordingTime(0);
  };

  const cancelRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setIsRecording(false);
    setRecordingTime(0);
  };

  const insertEmoji = (emoji: string) => {
    setInputValue(prev => prev + emoji);
    inputRef.current?.focus();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = e.target.files?.[0];
    if (file) {
      // Close picker immediately for instant feedback
      setShowAttachmentPicker(false);

      if (type === 'image') {
        // Use URL.createObjectURL for instant preview (much faster than FileReader)
        const previewUrl = URL.createObjectURL(file);
        setSelectedFile({
          name: file.name,
          type: '📷 Photo',
          size: formatFileSize(file.size),
          preview: previewUrl,
          file: file  // Store the file for base64 conversion when sending
        });
      } else {
        setSelectedFile({
          name: file.name,
          type: '📎 File',
          size: formatFileSize(file.size)
        });
      }
    }
    // Reset input
    e.target.value = '';
  };

  const sendFileMessage = async () => {
    if (selectedFile) {
      const caption = inputValue.trim();

      // For images, convert to base64 so it persists in database
      if (selectedFile.file && selectedFile.preview) {
        // Convert file to base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          const message = caption
            ? `[IMG:${base64}]\n📝 ${caption}`
            : `[IMG:${base64}]`;
          onSendMessage(message);

          // Revoke the blob URL to free memory
          URL.revokeObjectURL(selectedFile.preview!);
        };
        reader.readAsDataURL(selectedFile.file);
      } else {
        // Non-image file
        const message = caption
          ? `${selectedFile.type}: ${selectedFile.name} (${selectedFile.size})\n📝 ${caption}`
          : `${selectedFile.type}: ${selectedFile.name} (${selectedFile.size})`;
        onSendMessage(message);
      }
      setSelectedFile(null);
      setInputValue("");
    }
  };

  const cancelFileSelection = () => {
    setSelectedFile(null);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Filter messages based on search query
  const filteredMessages = chatSearchQuery.trim()
    ? currentMessages.filter(msg =>
      msg.content.toLowerCase().includes(chatSearchQuery.toLowerCase())
    )
    : currentMessages;

  const matchCount = chatSearchQuery.trim() ? filteredMessages.length : 0;

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
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-md border-zinc-200 bg-white text-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer",
              showChatSearch && "bg-zinc-100 border-[#00A389] text-[#00A389]"
            )}
            onClick={() => {
              setShowChatSearch(!showChatSearch);
              if (showChatSearch) setChatSearchQuery("");
            }}
          >
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

      {/* Search Bar - shows when search is active */}
      {showChatSearch && (
        <div className="px-3 pb-2 shrink-0">
          <div className="flex items-center gap-2 bg-[#f3f3ee] rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search in conversation..."
              autoFocus
              value={chatSearchQuery}
              onChange={(e) => setChatSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 placeholder:text-zinc-400"
            />
            {chatSearchQuery && (
              <span className="text-xs text-zinc-500">{matchCount} found</span>
            )}
          </div>
        </div>
      )}

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

              {filteredMessages.map((msg) => {
                // Check if message contains an image (supports both blob URLs and data URLs)
                const isImage = msg.content.startsWith('[IMG:');
                const imageMatch = isImage ? msg.content.match(/\[IMG:([^\]]+)\]/) : null;
                const imageUrl = imageMatch ? imageMatch[1] : null;
                const caption = isImage ? msg.content.replace(/\[IMG:[^\]]+\]/, '').trim() : null;

                return (
                  <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                    <div className={cn("flex flex-col gap-0.5 max-w-[70%]", msg.sender === "me" ? "items-end" : "items-start")}>
                      {imageUrl ? (
                        <div className={cn(
                          "rounded-2xl overflow-hidden",
                          msg.sender === "me" ? "rounded-br-sm" : "rounded-bl-sm"
                        )}>
                          <img
                            src={imageUrl}
                            alt="Sent image"
                            className="max-w-[250px] max-h-[300px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          />
                          {caption && (
                            <div className={cn(
                              "px-3 py-2 text-sm",
                              msg.sender === "me" ? "bg-[#E8F5F3]" : "bg-white border-x border-b border-zinc-100"
                            )}>
                              {caption.replace('📝 ', '')}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                          msg.sender === "me"
                            ? "bg-[#E8F5F3] text-zinc-800 rounded-br-sm"
                            : "bg-white text-zinc-800 rounded-bl-sm border border-zinc-100"
                        )}>
                          {msg.content}
                        </div>
                      )}
                      <div className="flex items-center gap-1 px-1">
                        {msg.sender === "me" && msg.status === "read" && (
                          <CheckCheck className="h-2.5 w-2.5 text-[#00A389]" />
                        )}
                        <span className="text-[9px] text-zinc-400 font-medium">{msg.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 pt-1 pb-3 bg-white shrink-0">
        {isRecording ? (
          /* Recording UI */
          <div className="flex items-center gap-3 h-12 bg-[#f3f3ee] rounded-full px-4">
            <button
              onClick={cancelRecording}
              className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            {/* Recording indicator */}
            <div className="flex-1 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-zinc-700">{formatTime(recordingTime)}</span>
              </div>

              {/* Animated waveform */}
              <div className="flex-1 flex items-center justify-center gap-0.5">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#00A884] rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 8}px`,
                      animationDelay: `${i * 50}ms`,
                      animationDuration: '0.5s'
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={stopRecording}
              className="h-10 w-10 rounded-full bg-[#00A884] hover:bg-[#128C7E] text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        ) : (
          /* Normal input UI */
          <div className="flex-1 relative">
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowEmojiPicker(false)}
                />
                <div className="absolute bottom-14 right-0 z-50 w-[300px] bg-white rounded-xl border-2 border-[#F2F2F0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-2">
                  {/* Category tabs */}
                  <div className="flex gap-0.5 mb-2 p-1 bg-[#f3f3ee] rounded-lg">
                    {[
                      ["smileys", "😀"],
                      ["gestures", "👋"],
                      ["hearts", "❤️"],
                      ["animals", "🐶"],
                      ["food", "🍎"],
                      ["objects", "📱"]
                    ].map(([cat, icon]) => (
                      <button
                        key={cat}
                        onClick={() => setEmojiCategory(cat)}
                        className={cn(
                          "flex-1 py-1.5 text-base rounded-md cursor-pointer",
                          emojiCategory === cat
                            ? "bg-white"
                            : "hover:bg-white/50"
                        )}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>

                  {/* Emoji grid */}
                  <div className="grid grid-cols-8 gap-0.5 max-h-[180px] overflow-y-auto p-1">
                    {emojiCategories[emojiCategory as keyof typeof emojiCategories].map((emoji, i) => (
                      <button
                        key={i}
                        onClick={() => insertEmoji(emoji)}
                        className="h-8 w-8 flex items-center justify-center text-lg hover:bg-[#f3f3ee] rounded-md cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Input
              ref={inputRef}
              placeholder="Type any message..."
              className="w-full h-12 pl-4 pr-36 rounded-full border-2 border-[#F2F2F0] bg-white text-sm placeholder:text-[#8696A0]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* Action Icons and Send Button inside input */}
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <button
                onClick={startRecording}
                className="text-zinc-800 hover:text-[#00A884] transition-colors cursor-pointer"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={cn(
                  "transition-colors cursor-pointer",
                  showEmojiPicker ? "text-[#00A884]" : "text-zinc-800 hover:text-zinc-900"
                )}
              >
                <Smile className="h-4 w-4" />
              </button>
              <div className="relative flex items-center">
                <button
                  onClick={() => setShowAttachmentPicker(!showAttachmentPicker)}
                  className={cn(
                    "transition-colors cursor-pointer",
                    showAttachmentPicker ? "text-[#00A884]" : "text-zinc-800 hover:text-zinc-900"
                  )}
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                {/* Attachment Picker */}
                {showAttachmentPicker && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowAttachmentPicker(false)}
                    />
                    <div className="absolute bottom-8 right-0 z-50 w-[200px] bg-white rounded-xl border-2 border-[#F2F2F0] shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-2 overflow-hidden">
                      {/* Header */}
                      <div className="px-2 py-1.5 mb-1">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Attach</span>
                      </div>

                      {/* Photo - Active */}
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="flex items-center gap-3 w-full p-2.5 hover:bg-[#f3f3ee] rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="h-9 w-9 rounded-xl bg-[#E8F5F3] flex items-center justify-center">
                          <Image className="h-4 w-4 text-[#1E9A80]" />
                        </div>
                        <span className="text-sm font-medium text-zinc-800">Photo</span>
                      </button>

                      {/* File - Coming Soon */}
                      <div className="flex items-center gap-3 w-full p-2.5 rounded-xl opacity-40 cursor-not-allowed">
                        <div className="h-9 w-9 rounded-xl bg-[#f3f3ee] flex items-center justify-center">
                          <FileText className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-zinc-500">File</span>
                          <span className="text-[9px] text-zinc-400 ml-1.5">Soon</span>
                        </div>
                      </div>

                      {/* Camera - Coming Soon */}
                      <div className="flex items-center gap-3 w-full p-2.5 rounded-xl opacity-40 cursor-not-allowed">
                        <div className="h-9 w-9 rounded-xl bg-[#f3f3ee] flex items-center justify-center">
                          <Camera className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-zinc-500">Camera</span>
                          <span className="text-[9px] text-zinc-400 ml-1.5">Soon</span>
                        </div>
                      </div>

                      {/* Location - Coming Soon */}
                      <div className="flex items-center gap-3 w-full p-2.5 rounded-xl opacity-40 cursor-not-allowed">
                        <div className="h-9 w-9 rounded-xl bg-[#f3f3ee] flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-zinc-500">Location</span>
                          <span className="text-[9px] text-zinc-400 ml-1.5">Soon</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Button
                className="h-9 w-9 rounded-full bg-[#00A884] hover:bg-[#128C7E] text-white flex items-center justify-center p-0 cursor-pointer"
                onClick={selectedFile ? sendFileMessage : handleSend}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'image')}
            />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'file')}
            />
          </div>
        )}

        {/* Selected file preview */}
        {selectedFile && (
          <div className="mt-2 flex items-center gap-3 bg-[#f3f3ee] rounded-lg px-3 py-2">
            {selectedFile.preview ? (
              <img
                src={selectedFile.preview}
                alt="Preview"
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center">
                <FileText className="h-5 w-5 text-zinc-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-800 truncate">{selectedFile.name}</p>
              <p className="text-xs text-zinc-500">{selectedFile.type} • {selectedFile.size}</p>
            </div>
            <button
              onClick={cancelFileSelection}
              className="text-zinc-500 hover:text-zinc-700 cursor-pointer shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
