import { useChatStore } from '@/store/chatStore'
import { Mic, Paperclip, Send } from 'lucide-react-native'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { scale } from 'react-native-size-matters'

const ICON_SIZE = 22

export default function MessageInput() {
    const { addMessage } = useChatStore()
    const [message, setMessage] = useState("")

    function handleChangeText(text: string) {
        setMessage(text)
    }

    function handleSend() {
        addMessage({
            id: Date.now(),
            text: message,
            time: Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }).format(new Date()),
            sender: "user",
            media: null
        })
        setMessage("")
    }

    const isSend = message.trim().length > 0

    return (
        <View className='bg-pink-200' style={styles.container}>
            <View style={styles.iconContainer}>
                <Paperclip size={ICON_SIZE} color={"#858E99"} />
            </View>
            <View className='flex-1 '>
                <TextInput
                    placeholder='Message'
                    className='rounded-xl px-2'
                    style={{ fontSize: scale(14) }}
                    numberOfLines={7}
                    value={message}
                    onChangeText={handleChangeText}
                    multiline
                />
            </View>
            <View style={styles.iconContainer}>
                {isSend ? <Send
                    onPress={handleSend}
                    size={ICON_SIZE} color={"#858E99"}
                /> :
                    <Mic size={ICON_SIZE} color={"#858E99"} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        paddingVertical: 2,
        paddingHorizontal: 4,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 4,
        marginBottom: 8,
        borderRadius: 20,
        marginHorizontal: 8
    },
    iconContainer: {
        backgroundColor: "#fff",
        borderRadius: 50,
        marginBottom: 4,
        justifyContent: "center",
        alignItems: "center",
        height: 36,
        width: 36
    }
})