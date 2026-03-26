import PoppinsText from '@/components/ui/poppins-text'
import { Message, messages } from "@/constants/message-const.ts"
import MessageCard from '@/features/chatlist/components/message'
import { Avatar } from '@/features/chatlist/components/user-profile-card'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native'

const ChatPage = () => {
    return (
        <View style={{ padding: 0 }} className='flex-1 '>
            <StatusBar barStyle={"dark-content"} />
            <Header />
            <ChatBody />
        </View>
    )
}

export default ChatPage

function Header() {

    function goBack() {
        router.back()
    }

    return (
        <View className='flex-row justify-between items-center px-4 py-2  bg-zinc-100'>
            <TouchableOpacity onPress={goBack}>
                <View className='flex-row items-center gap-2'>
                    <ArrowLeft color={"#3b82f6"} />
                    <PoppinsText className='text-blue-500' size={14}>Back</PoppinsText>
                </View>
            </TouchableOpacity>

            <View >
                <PoppinsText className='text-black text-center' size={16}>John Doe</PoppinsText>
                <PoppinsText size={12} className='text-gray-600 text-center'>last seen just now</PoppinsText>
            </View>

            <View>
                <Avatar title='John Doe'
                    profilePic='https://avatars.githubusercontent.com/u/104669343?v=4'
                    avatarSize={44} />
            </View>
        </View>
    )
}

let count = 6
function ChatBody() {
    const [data, setData] = useState<Message[]>(messages)
    const listRef = useRef<FlatList>(null);

    function scrollHandler(e: any) {
        // const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
        // console.log(JSON.stringify({ contentOffset, layoutMeasurement, contentSize }, null, 2))
    }

    // useEffect(() => {
    //     return
    // let tm = setInterval(() => {
    //     if (count == 0) {
    //         clearInterval(tm)
    //         return
    //     }
    //     count--
    //     setData((prev: Message[]) => {
    //         const len = prev.length;
    //         const new_message: any = {
    //             id: len + 1,
    //             text: "new Message _at_ " + new Date().toLocaleDateString(),
    //             sender: len % 2 ? "other" : "user",
    //             media: null,
    //             time: "12:00 PM"
    //         }
    //         listRef.current?.scrollToEnd({ animated: true })
    //         return [...prev, new_message]
    //     }
    //     )
    // }, 2000)
    // return () => clearInterval(tm)
    // }, [])


    return (
        <FlatList
            ref={listRef}
            data={data}
            extraData={true}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            style={{ backgroundColor: "#fff", }}
            contentContainerStyle={{ paddingBottom: 40 }}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={({ item }) => <MessageCard {...item} />}
        />
    )
}
