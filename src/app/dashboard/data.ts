export const initialContacts = [
  {
    id: 1,
    name: "Adrian Kurt",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    lastMessage: "Thanks for the explanation!",
    time: "3 mins ago",
    unread: false,
    online: true,
    status: "read"
  },
  {
    id: 2,
    name: "Yomi Immanuel",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    lastMessage: "Let's do a quick call after lunch, I'll explai...",
    time: "12 mins ago",
    unread: false,
    online: false,
    status: "delivered"
  },
  {
    id: 3,
    name: "Bianca Nubia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "anytime! my pleasure~",
    time: "32 mins ago",
    unread: false,
    online: false,
    status: "read"
  },
  {
    id: 4,
    name: "Zender Lowre",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    lastMessage: "Okay cool, that make sense 👍",
    time: "1 hour ago",
    unread: false,
    online: false,
    status: "read"
  },
  {
    id: 5,
    name: "Palmer Dian",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    lastMessage: "Thanks, Jonas! That helps 😆",
    time: "5 hour ago",
    unread: false,
    online: false,
    status: "read"
  },
  {
    id: 6,
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    lastMessage: "Have you watch the new season of Damnation?",
    time: "12 hour ago",
    unread: false,
    online: false,
    status: "read"
  },
  {
    id: 7,
    name: "Sam Kohler",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Can we reschedule?",
    time: "1 day ago",
    unread: false,
    online: false,
    status: "read"
  },
];

export const conversations: Record<number, Array<{id: number; sender: string; content: string; time: string; status?: string}>> = {
  1: [
    { id: 1, sender: "them", content: "Hey there!", time: "9:00 AM" },
    { id: 2, sender: "them", content: "Can you explain how the new feature works?", time: "9:01 AM" },
    { id: 3, sender: "me", content: "Sure! It's pretty simple actually.", time: "9:15 AM", status: "read" },
    { id: 4, sender: "me", content: "You just need to click the button and it will automatically sync.", time: "9:16 AM", status: "read" },
    { id: 5, sender: "them", content: "Thanks for the explanation!", time: "9:20 AM" },
  ],
  2: [
    { id: 1, sender: "them", content: "Morning! Are you free today?", time: "11:00 AM" },
    { id: 2, sender: "me", content: "Hey! Yes, what's up?", time: "11:05 AM", status: "read" },
    { id: 3, sender: "them", content: "Let's do a quick call after lunch, I'll explain the project details", time: "11:10 AM" },
  ],
  3: [
    { id: 1, sender: "me", content: "Thanks for helping with the presentation!", time: "2:00 PM", status: "read" },
    { id: 2, sender: "them", content: "anytime! my pleasure~", time: "2:05 PM" },
  ],
  4: [
    { id: 1, sender: "them", content: "Did you see the new design specs?", time: "10:00 AM" },
    { id: 2, sender: "me", content: "Yes, I think we should use the second option", time: "10:30 AM", status: "read" },
    { id: 3, sender: "them", content: "Okay cool, that make sense 👍", time: "10:35 AM" },
  ],
  5: [
    { id: 1, sender: "them", content: "How do I reset my password?", time: "3:00 PM" },
    { id: 2, sender: "me", content: "Go to settings > security > reset password", time: "3:15 PM", status: "read" },
    { id: 3, sender: "them", content: "Thanks, Jonas! That helps 😆", time: "3:20 PM" },
  ],
  6: [
    { id: 1, sender: "them", content: "Have you watch the new season of Damnation?", time: "8:00 PM" },
    { id: 2, sender: "me", content: "Not yet! Is it good?", time: "8:30 PM", status: "read" },
  ],
  7: [
    { id: 1, sender: "me", content: "Meeting tomorrow at 3pm?", time: "Yesterday", status: "read" },
    { id: 2, sender: "them", content: "Can we reschedule?", time: "Yesterday" },
  ],
};
