import React from 'react';
import { View } from 'react-native';
import ChatListHeader from './components/header';
import List from './components/list';


export default function ChatList() {
    return (
        <View className='flex-1 '>
            <ChatListHeader />
            <List />
        </View>
    )
}
