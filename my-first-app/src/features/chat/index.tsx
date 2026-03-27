import MessageInput from "@/components/ui/message-input"
import { StatusBar, View } from "react-native"
import Header from "./components/header"
import ChatBody from "./components/list"
import MessageContextMenu from "./components/context-menu"

export default function Chat() {
    return (
        <View style={{ padding: 0 }} className='flex-1 '>
            <StatusBar barStyle={"dark-content"} />
            <Header />
            {/* <View className='flex-1 bg-white'></View> */}
            <ChatBody />
            <MessageInput />
            <MessageContextMenu />
        </View>
    )
}

