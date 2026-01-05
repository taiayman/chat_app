# Chat App MVP

Live demo: [https://chat-app-two-neon-81.vercel.app](https://chat-app-two-neon-81.vercel.app)

---

## What I Built

### Core Features (Required)

**1. Google Auth**
- Click "Continue with Google" on `/login`
- Uses NextAuth v5 with Google OAuth
- User data saved to PostgreSQL via Prisma
- Session persists, so you stay logged in

**2. User List with Online/Offline Status**
- Left sidebar shows all registered users
- Each user shows: name, profile pic (from Google), last message preview
- Green dot = online, no dot = offline
- `lastSeen` field in DB tracks when user was last active

**3. Real-time Chat**
- Click any user to start chatting
- Messages saved to DB (PostgreSQL via Supabase)
- Polling every 3 seconds for new messages (did poll instead of WebSocket cuz Supabase Realtime needs extra config)
- Optimistic UI - message shows instantly before server confirms

**4. Message History**
- All chats saved in `Message` table
- `senderId`, `receiverId`, `content`, `createdAt`
- When you click a contact, fetches full history from `/api/messages`

**5. User Info Display**
- Profile pic from Google shown in header + sidebar
- Name displayed in contact list
- Fallback avatar if no pic

---

### Bonus Features

**6. Chat with AI (Gemini 2.0 Flash)**
- Click the sparkles ✨ icon in left sidebar
- Opens AI chat screen at `/ai`
- Uses Google's Gemini 2.0 Flash API
- Real responses, not mocked
- Try it: ask anything!

**7. Image Sending**
- Click paperclip → select image
- Shows preview before sending
- Converts to base64 so it persists in DB
- Both users can see the image

**8. Emoji Picker**
- Click smiley face in chat input
- Categories: smileys, animals, food, activities, travel, objects
- Click emoji → adds to message

**9. Voice Recording UI**
- Click mic icon to start recording
- Shows timer while recording
- Cancel or send buttons
- (Note: actual audio upload not implemented, just UI)

**10. Attachment Picker**
- Click paperclip for options
- Image, File, Camera, Location
- Camera/Location show "Coming Soon"

**11. Shimmer Loading**
- Contact list shows animated placeholders while loading
- Smooth skeleton UI instead of blank screen

**12. Auto-scroll**
- Chat auto-scrolls to bottom when messages load
- Also scrolls when images finish loading

**13. Logout**
- Click profile pic in sidebar → dropdown → "Log out"
- Redirects to login page
- Session cleared

---

## Tech Stack

| What | How |
|------|-----|
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Auth | NextAuth v5 + Google OAuth |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| AI | Gemini 2.0 Flash API |
| Hosting | Vercel |

---

## How to Test

1. Go to [https://chat-app-two-neon-81.vercel.app](https://chat-app-two-neon-81.vercel.app)
2. Click "Continue with Google"
3. You're in! See the contact list on left
4. Click any user to chat
5. Type a message, hit send
6. Click ✨ sparkles for AI chat
7. Try sending an image (paperclip → image)
8. Click your avatar for logout

---

## File Structure (Key Files)

```
src/
├── app/
│   ├── login/page.tsx      # Auth page
│   ├── chat/page.tsx       # Main chat
│   ├── ai/page.tsx         # AI chat
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── users/route.ts   # Get users list
│       ├── messages/route.ts # Get/send messages
│       └── ai/route.ts      # Gemini API
├── auth.ts                  # NextAuth config
├── lib/db.ts               # Prisma client
└── prisma/schema.prisma    # DB schema
```

---

## Ideas I'd Add Next

- WebSocket instead of polling (faster updates)
- Typing indicators ("John is typing...")
- Read receipts (double blue check)
- Group chats
- Message reactions
- Push notifications
- Voice messages (actual upload)
- File sharing (PDFs, docs)
- Message search
- Dark mode toggle

---

## Notes

- Used polling (3s interval) instead of WebSocket cuz Supabase Realtime needed extra setup
- Images stored as base64 in message content - works but not ideal for large files
- AI responses are real from Gemini, not mocked
- Tried to match Figma design as close as possible

---
