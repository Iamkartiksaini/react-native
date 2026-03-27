import Chat from '@/features/chat'
import React from 'react'
import { View } from 'react-native'

const ChatPage = () => {
    return (
        <View style={{ padding: 0 }} className='flex-1 '>
            <Chat />
        </View>
    )
}

export default ChatPage
