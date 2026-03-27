import { Message, messages_reversed } from "@/constants/message-const";
import { create } from "zustand";

type ChatStoreState = { messages: Message[] };

type ChatStoreActions = {
    addMessage: (message: Message) => void;
    loadOldMessage: (message: Message) => void;
};

type ChatStore = ChatStoreState & ChatStoreActions;

export const useChatStore = create<ChatStore>((set) => ({
    messages: messages_reversed,
    addMessage: (message) =>
        set((state) => ({
            messages: [message, ...state.messages,],
        })),
    loadOldMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
}));