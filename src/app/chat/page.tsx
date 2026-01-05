"use client";

import React, { useState } from "react";
import { initialContacts, conversations } from "./data";
import { SidebarNav } from "./components/SidebarNav";
import { ProfileMenu } from "./components/ProfileMenu";
import { Header } from "./components/Header";
import { MessageListSidebar } from "./components/MessageListSidebar";
import { ChatArea } from "./components/ChatArea";
import { ContactInfoSidebar } from "./components/ContactInfoSidebar";
import { ContextMenu } from "./components/ContextMenu";

export default function Chat() {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedContact, setSelectedContact] = useState(initialContacts[0]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessages, setCurrentMessages] = useState(conversations[1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState("");
  const [archiveId, setArchiveId] = useState<number | null>(null);
  const [unreadId, setUnreadId] = useState<number | null>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState("media");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    contactId: number;
  } | null>(null);

  const [filterUnread, setFilterUnread] = useState(false);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarFilteredContacts = contacts.filter((contact) =>
    (filterUnread ? contact.unread : true) &&
    (contact.name.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(sidebarSearchQuery.toLowerCase()))
  );

  const handleContactClick = (contact: typeof initialContacts[0]) => {
    setIsLoading(true);
    setSelectedContact(contact);
    setContextMenu(null);
    setArchiveId(null);
    setUnreadId(null);
    // Don't close contact info if open, just update content (implied by state change)

    // Simulate loading delay
    setTimeout(() => {
      setCurrentMessages(conversations[contact.id] || []);
      setIsLoading(false);
    }, 600);
  };

  const handleContextMenu = (e: React.MouseEvent, contactId: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, contactId });
    setArchiveId(null);
    setUnreadId(null);
  };

  const handleArchive = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    setArchiveId(null);
  };

  const handleUnread = (id: number) => {
    setContacts(contacts.map(c =>
      c.id === id
        ? { ...c, unread: !c.unread, status: !c.unread ? 'delivered' : 'read' }
        : c
    ));
    setUnreadId(null);
  };

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    if (selectedContact.id === id && contacts.length > 1) {
      const remaining = contacts.filter(c => c.id !== id);
      if (remaining.length > 0) setSelectedContact(remaining[0]);
    }
    setContextMenu(null);
  };

  const handleClearChat = (id: number) => {
    // In a real app, this would clear the message history
    // For now, we'll just show an empty message list if it's the selected contact
    if (selectedContact.id === id) {
      setCurrentMessages([]);
    }
    // We would also need to update the lastMessage in the contact list
    setContacts(contacts.map(c =>
      c.id === id
        ? { ...c, lastMessage: "" }
        : c
    ));
    setContextMenu(null);
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now(),
      sender: "me",
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };
    setCurrentMessages([...currentMessages, newMessage]);

    // Update last message in contact list
    setContacts(contacts.map(c =>
      c.id === selectedContact.id
        ? { ...c, lastMessage: content, time: "Just now" }
        : c
    ));
  };

  return (
    <div className="flex h-screen bg-[#f3f3ee] font-sans text-zinc-900 overflow-hidden relative text-sm">
      {/* 1. Left Navigation Sidebar - Full Height */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-3 pb-4 pl-0 min-h-0">
        {/* Profile Menu Modal */}
        <ProfileMenu
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
        />

        {/* Top App Bar */}
        <Header searchQuery={sidebarSearchQuery} setSearchQuery={setSidebarSearchQuery} />

        <div className="flex flex-1 gap-3 min-h-0">
          {/* 2. Message List Sidebar */}
          <MessageListSidebar
            contacts={contacts}
            filteredContacts={filteredContacts}
            sidebarFilteredContacts={sidebarFilteredContacts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sidebarSearchQuery={sidebarSearchQuery}
            setSidebarSearchQuery={setSidebarSearchQuery}
            selectedContact={selectedContact}
            handleContactClick={handleContactClick}
            showNewMessageModal={showNewMessageModal}
            setShowNewMessageModal={setShowNewMessageModal}
            handleContextMenu={handleContextMenu}
            archiveId={archiveId}
            handleArchive={handleArchive}
            unreadId={unreadId}
            handleUnread={handleUnread}
            filterUnread={filterUnread}
            setFilterUnread={setFilterUnread}
          />

          {/* 3. Main Chat Area */}
          <ChatArea
            selectedContact={selectedContact}
            isLoading={isLoading}
            currentMessages={currentMessages}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* 4. Contact Info Sidebar (Overlay) */}
        <ContactInfoSidebar
          showContactInfo={showContactInfo}
          setShowContactInfo={setShowContactInfo}
          selectedContact={selectedContact}
          activeInfoTab={activeInfoTab}
          setActiveInfoTab={setActiveInfoTab}
        />
      </div>

      {/* Context Menu */}
      <ContextMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        setUnreadId={setUnreadId}
        setArchiveId={setArchiveId}
        setSelectedContact={setSelectedContact}
        setShowContactInfo={setShowContactInfo}
        handleClearChat={handleClearChat}
        handleDelete={handleDelete}
        contacts={contacts}
      />
    </div>
  );
}
