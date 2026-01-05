import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/users - Fetch all users except current user
export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const currentUserId = session.user.id

        const users = await prisma.user.findMany({
            where: {
                id: { not: currentUserId }
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                isOnline: true,
                lastSeen: true,
            },
            orderBy: {
                name: 'asc'
            }
        })

        // Get last message for each user
        const usersWithLastMessage = await Promise.all(
            users.map(async (user) => {
                const lastMessage = await prisma.message.findFirst({
                    where: {
                        OR: [
                            { senderId: currentUserId, receiverId: user.id },
                            { senderId: user.id, receiverId: currentUserId }
                        ]
                    },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        content: true,
                        createdAt: true,
                        senderId: true,
                        isRead: true
                    }
                })

                // Count unread messages from this user
                const unreadCount = await prisma.message.count({
                    where: {
                        senderId: user.id,
                        receiverId: currentUserId,
                        isRead: false
                    }
                })

                return {
                    ...user,
                    lastMessage: lastMessage?.content || null,
                    lastMessageTime: lastMessage?.createdAt || null,
                    unreadCount
                }
            })
        )

        // Sort by last message time
        usersWithLastMessage.sort((a, b) => {
            if (!a.lastMessageTime) return 1
            if (!b.lastMessageTime) return -1
            return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
        })

        return NextResponse.json(usersWithLastMessage)
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

