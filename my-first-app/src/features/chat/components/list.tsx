import Loader from "@/components/ui/loader";
import { Message } from "@/constants/message-const";
import MessageCard from "@/features/chatlist/components/message";
import { useChatStore } from "@/store/chatStore";
import { startTransition, useCallback, useRef } from "react";
import { FlatList } from "react-native";

let count = 1
let onGoing: any = false

export default function ChatBody() {
    const { messages, loadOldMessage } = useChatStore();
    const listRef = useRef<FlatList>(null);

    function scrollHandler(e: any) {
        const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
        const scrollPosY = contentOffset.y
        const containerHeight = layoutMeasurement.height
        const onTop = scrollPosY + containerHeight + 36 >= contentSize.height
        if (onTop && !onGoing) {
            onGoing = setTimeout(() => {
                startTransition(() => {
                    console.log("Touched the Top", count)
                    let message: Message = {
                        id: Date.now(),
                        text: "new Message _at_ " + new Date().toLocaleTimeString(),
                        sender: count % 2 ? "other" : "user",
                        media: null,
                        time: "12:00 PM"
                    }
                    loadOldMessage(message)
                    count++
                    onGoing = false
                })
            }, 1000);
        }
    }

    const renderItem = useCallback(({ item }: { item: Message }) => (
        <MessageCard {...item} />
    ), []);

    return (
        <FlatList
            ref={listRef}
            data={messages}
            extraData={true}
            keyExtractor={({ id }) => id.toString()}
            showsVerticalScrollIndicator={true}
            ListFooterComponent={<Loader size={36} color={"#d4d4d4"}
                containerProps={{ className: "my-2 " }}
            />}
            inverted
            style={{ backgroundColor: "#fff", }}
            contentContainerStyle={{ paddingTop: 80 }}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={renderItem}

            initialNumToRender={15}
            maxToRenderPerBatch={10}
            windowSize={10}
            removeClippedSubviews={true}
        />
    )
}
