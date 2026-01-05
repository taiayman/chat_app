"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SidebarNav } from "../chat/components/SidebarNav";
import { Send, Sparkles, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    time: string;
}

export default function AIChat() {
    const { data: session, status } = useSession();

    if (status === "unauthenticated") {
        redirect("/login");
    }

    const [messages, setMessages] = useState<AIMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I\'m your AI assistant. How can I help you today?',
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState("sparkles");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: AIMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: inputValue,
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        const userInput = inputValue;
        setInputValue("");
        setIsTyping(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });

            const data = await response.json();

            const aiMessage: AIMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: data.response || 'Sorry, I could not generate a response.',
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error calling AI:', error);
            const errorMessage: AIMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f3f3ee]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 bg-[#1E9A80] rounded-[20px] flex items-center justify-center animate-bounce shadow-xl">
                        <svg width="32" height="34" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 8.25V17.05H2.75C3.039 17.05 3.325 17.107 3.592 17.218C3.859 17.328 4.102 17.49 4.306 17.694C4.51 17.899 4.672 18.141 4.783 18.408C4.893 18.675 4.95 18.961 4.95 19.25V22H11.55L19.8 13.75V4.95H17.05C16.761 4.95 16.475 4.893 16.208 4.783C15.941 4.672 15.699 4.51 15.495 4.306C15.29 4.101 15.128 3.859 15.018 3.592C14.907 3.325 14.85 3.039 14.85 2.75V0H8.25L0 8.25ZM9.35 16.5H5.5V10.45L10.45 5.5H14.3V11.55L9.35 16.5Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#f3f3ee] font-sans text-zinc-900 overflow-hidden">
            {/* Left Sidebar - Same as chat */}
            <SidebarNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showProfileMenu={showProfileMenu}
                setShowProfileMenu={setShowProfileMenu}
                userImage={session?.user?.image}
            />

            {/* Main AI Chat Area */}
            <div className="flex-1 flex flex-col p-3 pb-4 pl-0 min-h-0">
                {/* Header */}
                <div className="flex items-center mb-3 shrink-0">
                    <header className="h-14 flex-1 flex items-center justify-between px-5 bg-white rounded-2xl border border-zinc-100/50">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-gradient-to-br from-[#1E9A80] to-[#15756B] rounded-xl flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm font-semibold text-zinc-900">AI Assistant</h1>
                                <p className="text-xs text-zinc-400">Always here to help</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-[#E8F5F3] text-[#1E9A80] text-xs font-medium rounded-full">
                                Online
                            </span>
                        </div>
                    </header>
                </div>

                {/* Chat Container */}
                <div className="flex-1 bg-white rounded-2xl border border-zinc-100/50 flex flex-col min-h-0 overflow-hidden">
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 px-6 py-4">
                        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    {/* Avatar */}
                                    <Avatar className="h-8 w-8 shrink-0">
                                        {msg.role === 'assistant' ? (
                                            <>
                                                <AvatarImage src="" />
                                                <AvatarFallback className="bg-gradient-to-br from-[#1E9A80] to-[#15756B] text-white">
                                                    <Sparkles className="h-4 w-4" />
                                                </AvatarFallback>
                                            </>
                                        ) : (
                                            <>
                                                <AvatarImage src={session?.user?.image || ""} />
                                                <AvatarFallback className="bg-zinc-200">
                                                    <User className="h-4 w-4 text-zinc-600" />
                                                </AvatarFallback>
                                            </>
                                        )}
                                    </Avatar>

                                    {/* Message Bubble */}
                                    <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-[#1E9A80] text-white rounded-br-sm'
                                                : 'bg-[#f3f3ee] text-zinc-800 rounded-bl-sm'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                        <span className="text-[10px] text-zinc-400 px-1">{msg.time}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarFallback className="bg-gradient-to-br from-[#1E9A80] to-[#15756B] text-white">
                                            <Sparkles className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="px-4 py-3 bg-[#f3f3ee] rounded-2xl rounded-bl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="px-6 py-4 border-t border-zinc-100">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center gap-3 h-12 bg-[#f3f3ee] rounded-full px-4">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Ask me anything..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 placeholder:text-zinc-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                    className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${inputValue.trim() && !isTyping
                                        ? 'bg-[#1E9A80] text-white cursor-pointer hover:bg-[#178a72]'
                                        : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="text-center text-[10px] text-zinc-400 mt-2">
                                AI can make mistakes. Consider checking important information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
