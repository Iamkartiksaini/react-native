import PoppinsText from "@/components/ui/poppins-text";
import { Plus, Search } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export default function ChatListHeader() {

    return (
        <View className='w-full flex-row items-center py-2 border-b  border-neutral-200 justify-between px-2 gap-2'>
            <PoppinsText size={20} weight="semibold">Contacts</PoppinsText>
            <View className='flex-row gap-4'>
                <TouchableOpacity>
                    <Plus color={"#838383"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Search color={"#838383"} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
