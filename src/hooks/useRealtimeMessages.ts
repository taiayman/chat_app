'use client'

import { useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface Message {
    id: string
    content: string
    sender: 'me' | 'them'
    time: string
    status: 'sent' | 'delivered' | 'read'
}

interface UseRealtimeMessagesProps {
    currentUserId: string | undefined
    selectedUserId: string | undefined
    onNewMessage: (message: Message) => void
}

export function useRealtimeMessages({
    currentUserId,
    selectedUserId,
    onNewMessage
}: UseRealtimeMessagesProps) {

    const handleNewMessage = useCallback((payload: any) => {
        const msg = payload.new

        // Only process messages that are part of current conversation
        if (!currentUserId || !selectedUserId) return

        const isFromSelectedUser = msg.senderId === selectedUserId && msg.receiverId === currentUserId
        const isToSelectedUser = msg.senderId === currentUserId && msg.receiverId === selectedUserId

        if (isFromSelectedUser || isToSelectedUser) {
            const formattedMessage: Message = {
                id: msg.id,
                content: msg.content,
                sender: msg.senderId === currentUserId ? 'me' : 'them',
                time: new Date(msg.createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }),
                status: msg.isRead ? 'read' : 'delivered'
            }
            onNewMessage(formattedMessage)
        }
    }, [currentUserId, selectedUserId, onNewMessage])

    useEffect(() => {
        if (!currentUserId) return

        // Subscribe to new messages
        const channel = supabase
            .channel('messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'Message',
                    filter: `receiverId=eq.${currentUserId}`
                },
                handleNewMessage
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [currentUserId, handleNewMessage])
}
