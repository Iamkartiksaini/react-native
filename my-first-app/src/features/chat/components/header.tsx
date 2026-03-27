import PoppinsText from "@/components/ui/poppins-text"
import { ICON_SIZE, ICON_STYLE } from "@/constants/default-style"
import { Avatar } from "@/features/chatlist/components/user-profile-card"
import { useChatStore } from "@/store/chatStore"
import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { TouchableOpacity, View } from "react-native"

export default function Header() {
    const { messages } = useChatStore()

    function goBack() {
        router.back()
    }

    return (
        <View className='flex-row justify-between items-center px-4 py-2  bg-zinc-100'>
            <TouchableOpacity onPress={goBack}>
                <View className='flex-row items-center gap-2'>
                    <View style={ICON_STYLE.container} className='bg-red-400'>
                        <ArrowLeft size={ICON_SIZE} color={"#3b82f6"} />
                    </View>
                    {/* <PoppinsText className='text-blue-500' size={14}>Back</PoppinsText> */}
                </View>
            </TouchableOpacity>

            <View >
                <PoppinsText className='text-black text-center' size={16}>John Doe</PoppinsText>
                <PoppinsText size={12} className='text-gray-600 text-center'>last seen just now {messages.length}</PoppinsText>
            </View>

            <View>
                <Avatar title='John Doe'
                    profilePic='https://avatars.githubusercontent.com/u/104669343?v=4'
                    avatarSize={44} />
            </View>
        </View>
    )
}
