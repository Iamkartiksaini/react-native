import PoppinsText from "@/components/ui/poppins-text";
import { useContextMenuStore } from "@/store/contextMenuStore";
import { CheckCheck } from "lucide-react-native";
import { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Message {
    id: number;
    text: string;
    sender: "user" | "other";
    media: boolean | string | null;
    time: string;
}


export default function MessageCard({ ...props }: Message) {
    const { id, text, sender, media, time } = props
    const viewRef = useRef<View>(null);
    const { selectedMessage, setSelectedMessage } = useContextMenuStore();

    const handleLongPress = () => {
        viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setSelectedMessage(props, { x, y, width, height, pageY });
        });
    };

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

    const isSelected = selectedMessage?.id == id
    return (
        <Pressable
            style={[getClassStyle(), styles.container,
            isSelected && {
                backgroundColor: "#f5f5f5"
            }]}
            onLongPress={handleLongPress}
            delayLongPress={200}
        >
            <View
                ref={viewRef}
                style={[getMessageColor(), styles.content]}>
                <View className="">
                    <PoppinsText size={14}>{text}</PoppinsText>
                </View>
                <View className="flex-row items-center gap-1"
                    style={{ transform: [{ translateY: 8 }] }}
                >
                    <PoppinsText size={8}>{time}</PoppinsText>
                    <CheckCheck size={12} />
                </View>
            </View>
        </Pressable>
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
        // borderRadius: 10,
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