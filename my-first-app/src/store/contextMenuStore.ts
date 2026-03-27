import { create } from "zustand";
import { Message } from "@/constants/message-const";

export type MessageLayout = {
    x: number;
    y: number;
    width: number;
    height: number;
    pageY: number;
};

type ContextMenuState = {
    selectedMessage: Message | null;
    activeMessageLayout: MessageLayout | null;
};

type ContextMenuActions = {
    setSelectedMessage: (message: Message | null, layout: MessageLayout | null) => void;
    clearSelectedMessage: () => void;
};

type ContextMenuStore = ContextMenuState & ContextMenuActions;

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
    selectedMessage: null,
    activeMessageLayout: null,
    setSelectedMessage: (message, layout) =>
        set(() => ({
            selectedMessage: message,
            activeMessageLayout: layout,
        })),
    clearSelectedMessage: () =>
        set(() => ({
            selectedMessage: null,
            activeMessageLayout: null,
        })),
}));
