import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/messages?userId=xxx - Fetch messages with a specific user
export async function GET(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 })
        }

        // Fetch messages between current user and specified user
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: session.user.id, receiverId: userId },
                    { senderId: userId, receiverId: session.user.id }
                ]
            },
            orderBy: { createdAt: 'asc' },
            select: {
                id: true,
                content: true,
                createdAt: true,
                senderId: true,
                receiverId: true,
                isRead: true
            }
        })

        // Mark messages from other user as read
        await prisma.message.updateMany({
            where: {
                senderId: userId,
                receiverId: session.user.id,
                isRead: false
            },
            data: { isRead: true }
        })

        // Transform to match UI format
        const formattedMessages = messages.map(msg => ({
            id: msg.id,
            content: msg.content,
            sender: msg.senderId === session.user.id ? 'me' : 'them',
            time: new Date(msg.createdAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }),
            status: msg.isRead ? 'read' : 'delivered'
        }))

        return NextResponse.json(formattedMessages)
    } catch (error) {
        console.error('Error fetching messages:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// POST /api/messages - Send a new message
export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { receiverId, content } = body

        if (!receiverId || !content) {
            return NextResponse.json({ error: 'receiverId and content are required' }, { status: 400 })
        }

        // Create message
        const message = await prisma.message.create({
            data: {
                content,
                senderId: session.user.id,
                receiverId
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                senderId: true,
                receiverId: true,
                isRead: true
            }
        })

        // Update sender's lastSeen
        await prisma.user.update({
            where: { id: session.user.id },
            data: { lastSeen: new Date(), isOnline: true }
        })

        return NextResponse.json({
            id: message.id,
            content: message.content,
            sender: 'me',
            time: new Date(message.createdAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }),
            status: 'delivered'
        })
    } catch (error) {
        console.error('Error sending message:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
