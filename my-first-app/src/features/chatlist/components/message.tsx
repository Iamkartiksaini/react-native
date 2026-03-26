import PoppinsText from "@/components/ui/poppins-text";
import { CheckCheck } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

interface Message {
    id: number;
    text: string;
    sender: string;
    media: boolean | string | null;
    time: string;
}


export default function MessageCard({ ...props }: Message) {
    const { id, text, sender, media, time } = props

    function getClassStyle() {
        if (sender === "user") {
            return styles.user
        }
        return styles.other
    }

    function getMessageColor() {
        if (sender === "user") {
            return styles.userMessageBG
        }
        return styles.otherMessageBG
    }

    return (
        <View
            style={[getClassStyle(), styles.container]}>
            <View style={[getMessageColor(), styles.content]}>
                <View className="">
                    <PoppinsText size={14}>{text}</PoppinsText>
                </View>
                <View className="flex-row items-center gap-1 "
                    style={{ transform: [{ translateY: 8 }] }}
                >
                    <PoppinsText size={8}>{time}</PoppinsText>
                    <CheckCheck size={12} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    user: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    other: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    container: {
        padding: 10,
        borderRadius: 10,
    },
    content: {
        maxWidth: "85%",
        // flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 12,
    },
    userMessageBG: {
        backgroundColor: "#00a5ef3b",
        alignItems: "flex-start"
    },
    otherMessageBG: {
        backgroundColor: "#a442ff26",
    }
})