"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SidebarNav } from "./components/SidebarNav";
import { ProfileMenu } from "./components/ProfileMenu";
import { Header } from "./components/Header";
import { MessageListSidebar } from "./components/MessageListSidebar";
import { ChatArea } from "./components/ChatArea";
import { ContactInfoSidebar } from "./components/ContactInfoSidebar";
import { ContextMenu } from "./components/ContextMenu";

interface Contact {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isOnline: boolean;
  lastSeen: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  unreadCount: number;
  // UI compatibility fields
  unread: boolean;
  time: string;
  status: string;
  avatar: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'me' | 'them';
  time: string;
  status: string;
}

export default function Chat() {
  const { data: session, status } = useSession();

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    redirect("/login");
  }

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState("");
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [unreadId, setUnreadId] = useState<string | null>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState("media");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    contactId: string;
  } | null>(null);
  const [filterUnread, setFilterUnread] = useState(false);
  const isSendingRef = useRef(false);

  // Fetch contacts on mount
  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const data = await res.json();
          // Transform API data to UI format
          const transformedContacts: Contact[] = data.map((user: any) => ({
            id: user.id,
            name: user.name || user.email,
            email: user.email,
            image: user.image,
            isOnline: user.isOnline,
            lastSeen: user.lastSeen,
            lastMessage: user.lastMessage,
            lastMessageTime: user.lastMessageTime,
            unreadCount: user.unreadCount,
            // UI compatibility
            unread: user.unreadCount > 0,
            time: user.lastMessageTime
              ? new Date(user.lastMessageTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
              : '',
            status: user.unreadCount > 0 ? 'delivered' : 'read',
            avatar: user.image || '/default-avatar.png'
          }));
          setContacts(transformedContacts);
          if (transformedContacts.length > 0 && !selectedContact) {
            setSelectedContact(transformedContacts[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchContacts();
    }
  }, [status, selectedContact]);

  // Fetch messages when contact is selected
  useEffect(() => {
    async function fetchMessages() {
      if (!selectedContact) return;

      setIsLoading(true);
      try {
        const res = await fetch(`/api/messages?userId=${selectedContact.id}`);
        if (res.ok) {
          const data = await res.json();
          setCurrentMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMessages();

    // Poll for new messages every 3 seconds
    const pollInterval = setInterval(async () => {
      if (!selectedContact || isSendingRef.current) return;
      try {
        const res = await fetch(`/api/messages?userId=${selectedContact.id}`);
        if (res.ok) {
          const data = await res.json();
          // Only update if not currently sending
          if (!isSendingRef.current) {
            setCurrentMessages(data);
          }
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [selectedContact?.id]);

  // Poll for contact updates (new messages, online status) every 10 seconds
  useEffect(() => {
    if (status !== "authenticated") return;

    const pollContacts = async () => {
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const data = await res.json();
          const transformedContacts: Contact[] = data.map((user: any) => ({
            id: user.id,
            name: user.name || user.email,
            email: user.email,
            image: user.image,
            isOnline: user.isOnline,
            lastSeen: user.lastSeen,
            lastMessage: user.lastMessage,
            lastMessageTime: user.lastMessageTime,
            unreadCount: user.unreadCount,
            unread: user.unreadCount > 0,
            time: user.lastMessageTime
              ? new Date(user.lastMessageTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
              : '',
            status: user.unreadCount > 0 ? 'delivered' : 'read',
            avatar: user.image || '/default-avatar.png'
          }));
          setContacts(transformedContacts);
        }
      } catch (error) {
        console.error('Error polling contacts:', error);
      }
    };

    const pollInterval = setInterval(pollContacts, 10000);
    return () => clearInterval(pollInterval);
  }, [status]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarFilteredContacts = contacts.filter((contact) =>
    (filterUnread ? contact.unread : true) &&
    (contact.name.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) ||
      (contact.lastMessage?.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) ?? false))
  );

  const handleContactClick = async (contact: Contact) => {
    setIsLoading(true);
    setSelectedContact(contact);
    setContextMenu(null);
    setArchiveId(null);
    setUnreadId(null);

    // Mark messages as read on contact click
    setContacts(prev => prev.map(c =>
      c.id === contact.id
        ? { ...c, unread: false, unreadCount: 0 }
        : c
    ));
  };

  const handleContextMenu = (e: React.MouseEvent, contactId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, contactId });
    setArchiveId(null);
    setUnreadId(null);
  };

  const handleArchive = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    setArchiveId(null);
  };

  const handleUnread = (id: string) => {
    setContacts(contacts.map(c =>
      c.id === id
        ? { ...c, unread: !c.unread, status: !c.unread ? 'delivered' : 'read' }
        : c
    ));
    setUnreadId(null);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    if (selectedContact?.id === id && contacts.length > 1) {
      const remaining = contacts.filter(c => c.id !== id);
      if (remaining.length > 0) setSelectedContact(remaining[0]);
    }
    setContextMenu(null);
  };

  const handleClearChat = (id: string) => {
    if (selectedContact?.id === id) {
      setCurrentMessages([]);
    }
    setContacts(contacts.map(c =>
      c.id === id
        ? { ...c, lastMessage: "" }
        : c
    ));
    setContextMenu(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedContact) return;

    // Prevent polling from overwriting during send
    isSendingRef.current = true;

    // Optimistic update
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      sender: "me",
      content,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: "sent"
    };
    setCurrentMessages(prev => [...prev, tempMessage]);

    // Update last message in contact list
    setContacts(contacts.map(c =>
      c.id === selectedContact.id
        ? { ...c, lastMessage: content, time: "Just now" }
        : c
    ));

    // Send to API
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedContact.id,
          content
        })
      });

      if (res.ok) {
        const savedMessage = await res.json();
        // Replace temp message with saved one
        setCurrentMessages(prev =>
          prev.map(m => m.id === tempMessage.id ? savedMessage : m)
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      // Re-enable polling after send completes
      isSendingRef.current = false;
    }
  };

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f3f3ee]">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f3f3ee] font-sans text-zinc-900 overflow-hidden relative text-sm">
      {/* 1. Left Navigation Sidebar - Full Height */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
        userImage={session?.user?.image}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-3 pb-4 pl-0 min-h-0">
        {/* Profile Menu Modal */}
        <ProfileMenu
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
        />

        {/* Top App Bar */}
        <Header
          searchQuery={sidebarSearchQuery}
          setSearchQuery={setSidebarSearchQuery}
          userImage={session?.user?.image}
        />

        <div className="flex flex-1 gap-3 min-h-0">
          {/* 2. Message List Sidebar */}
          <MessageListSidebar
            contacts={contacts as any}
            filteredContacts={filteredContacts as any}
            sidebarFilteredContacts={sidebarFilteredContacts as any}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sidebarSearchQuery={sidebarSearchQuery}
            setSidebarSearchQuery={setSidebarSearchQuery}
            selectedContact={selectedContact as any}
            handleContactClick={handleContactClick as any}
            showNewMessageModal={showNewMessageModal}
            setShowNewMessageModal={setShowNewMessageModal}
            handleContextMenu={handleContextMenu as any}
            archiveId={archiveId as any}
            handleArchive={handleArchive as any}
            unreadId={unreadId as any}
            handleUnread={handleUnread as any}
            filterUnread={filterUnread}
            setFilterUnread={setFilterUnread}
            isLoading={isLoading && contacts.length === 0}
          />

          {/* 3. Main Chat Area */}
          {selectedContact && (
            <ChatArea
              selectedContact={selectedContact as any}
              isLoading={isLoading}
              currentMessages={currentMessages}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>

        {/* 4. Contact Info Sidebar (Overlay) */}
        <ContactInfoSidebar
          showContactInfo={showContactInfo}
          setShowContactInfo={setShowContactInfo}
          selectedContact={selectedContact as any}
          activeInfoTab={activeInfoTab}
          setActiveInfoTab={setActiveInfoTab}
        />
      </div>

      {/* Context Menu */}
      <ContextMenu
        contextMenu={contextMenu as any}
        setContextMenu={setContextMenu as any}
        setUnreadId={setUnreadId as any}
        setArchiveId={setArchiveId as any}
        setSelectedContact={setSelectedContact as any}
        setShowContactInfo={setShowContactInfo}
        handleClearChat={handleClearChat as any}
        handleDelete={handleDelete as any}
        contacts={contacts as any}
      />
    </div>
  );
}
