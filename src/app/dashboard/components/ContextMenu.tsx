import React from "react";
import {
  MessageCircle,
  Archive,
  VolumeX,
  Info,
  Download,
  Ban,
  Trash2
} from "lucide-react";

interface ContextMenuProps {
  contextMenu: {
    x: number;
    y: number;
    contactId: number;
  } | null;
  setContextMenu: (menu: { x: number; y: number; contactId: number } | null) => void;
  setUnreadId: (id: number | null) => void;
  setArchiveId: (id: number | null) => void;
  setSelectedContact: (contact: any) => void;
  setShowContactInfo: (show: boolean) => void;
  handleClearChat: (id: number) => void;
  handleDelete: (id: number) => void;
  contacts: any[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenu,
  setContextMenu,
  setUnreadId,
  setArchiveId,
  setSelectedContact,
  setShowContactInfo,
  handleClearChat,
  handleDelete,
  contacts
}) => {
  if (!contextMenu) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50"
        onClick={() => setContextMenu(null)}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu(null);
        }}
      />
      <div
        className="fixed z-[60] w-[220px] bg-white rounded-2xl border border-[#E8E5DF] shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-2 font-sans animate-in fade-in zoom-in-95 duration-100 origin-top-left"
        style={{ top: contextMenu.y, left: contextMenu.x }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <button
            className="flex items-center gap-3 p-2.5 hover:bg-[#F3F3EE] rounded-xl cursor-pointer transition-colors w-full text-left group"
            onClick={() => {
              setUnreadId(contextMenu.contactId);
              setContextMenu(null);
            }}
          >
            <MessageCircle className="h-4 w-4 text-[#111625]" />
            <span className="text-sm font-medium text-[#111625]">Mark as unread</span>
          </button>
          <button
            className="flex items-center gap-3 p-2.5 hover:bg-[#F3F3EE] rounded-xl cursor-pointer transition-colors w-full text-left group"
            onClick={() => {
              setArchiveId(contextMenu.contactId);
              setContextMenu(null);
            }}
          >
            <Archive className="h-4 w-4 text-[#111625]" />
            <span className="text-sm font-medium text-[#111625]">Archive</span>
          </button>
          <button
            className="flex items-center gap-3 p-2.5 hover:bg-[#F3F3EE] rounded-xl cursor-pointer transition-colors w-full text-left group"
            onClick={() => setContextMenu(null)}
          >
            <VolumeX className="h-4 w-4 text-[#111625]" />
            <span className="text-sm font-medium text-[#111625]">Mute</span>
          </button>
          <button
            className="flex items-center gap-3 p-2.5 hover:bg-[#F3F3EE] rounded-xl cursor-pointer transition-colors w-full text-left group"
            onClick={() => {
              // Find the contact to ensure we display the right info
              const contact = contacts.find(c => c.id === contextMenu.contactId);
              if (contact) setSelectedContact(contact);
              setShowContactInfo(true);
              setContextMenu(null);
            }}
          >
            <Info className="h-4 w-4 text-[#111625]" />
            <span className="text-sm font-medium text-[#111625]">Contact info</span>
          </button>
          <button
            className="flex items-center gap-3 p-2.5 hover:bg-[#F3F3EE] rounded-xl cursor-pointer transition-colors w-full text-left group"
            onClick={() => setContextMenu(null)}
          >
            <Download className="h-4 w-4 text-[#111625]" />
            <span className="text-sm font-medium text-[#111625]">Export chat</span>
          </button>
          <button
            className="flex items-center gap-3 p-2.5 hover:bg-[#F3F3EE] rounded-xl cursor-pointer transition-colors w-full text-left group"
            onClick={() => {
              handleClearChat(contextMenu.contactId);
            }}
          >
            <Ban className="h-4 w-4 text-[#111625]" />
            <span className="text-sm font-medium text-[#111625]">Clear chat</span>
          </button>
          <button
            className="flex items-center gap-3 p-2.5 hover:bg-[#FEF2F2] rounded-xl cursor-pointer transition-colors w-full text-left group"
            onClick={() => {
              handleDelete(contextMenu.contactId);
            }}
          >
            <Trash2 className="h-4 w-4 text-[#DF1C41]" />
            <span className="text-sm font-medium text-[#DF1C41]">Delete chat</span>
          </button>
        </div>
      </div>
    </>
  );
};
