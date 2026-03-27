import PoppinsText from "@/components/ui/poppins-text";
import { useContextMenuStore } from '@/store/contextMenuStore';
import { Copy, Forward, Reply, Star, Trash2 } from "lucide-react-native";
import React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export default function MessageContextMenu() {
    const { selectedMessage, activeMessageLayout, clearSelectedMessage } = useContextMenuStore();

    if (!selectedMessage || !activeMessageLayout) return null;

    const isUser = selectedMessage.sender === "user";

    // Action items
    const ActionItem = ({ icon: Icon, label, color = "#000", isLast = false }: any) => (
        <Pressable
            className={`flex-row items-center justify-between py-3 px-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
            onPress={clearSelectedMessage}
        >
            <PoppinsText size={16} style={{ color }}>{label}</PoppinsText>
            <Icon size={20} color={color} />
        </Pressable>
    );

    const menuHeight = 260; // Approximate height of 5 items
    const spaceBelow = WINDOW_HEIGHT - (activeMessageLayout.pageY + activeMessageLayout.height);
    const showMenuAbove = spaceBelow < menuHeight + 20;

    const menuTop = showMenuAbove
        ? activeMessageLayout.pageY - menuHeight - 16
        : activeMessageLayout.pageY + activeMessageLayout.height + 16;

    return (
        <Modal transparent visible={!!selectedMessage} animationType="none">
            <Pressable style={styles.overlay} onPress={clearSelectedMessage}>
                {/* Blurred Background or Semi-transparent */}
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
                />

                {/* Message Mirror */}
                {/* <Animated.View
                    entering={ZoomIn.duration(200).springify()}
                    exiting={ZoomOut.duration(200)}
                    style={{
                        position: 'absolute',
                        top: activeMessageLayout.pageY,
                        left: activeMessageLayout.x,
                        width: activeMessageLayout.width,
                        height: activeMessageLayout.height,
                        backgroundColor: isUser ? "#00a5ef3b" : "#a442ff26",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        alignItems: isUser ? "flex-start" : "flex-end",
                    }}
                >
                    <View className="">
                        <PoppinsText size={14} style={{ color: isUser ? '#000' : '#000' }}>{selectedMessage.text}</PoppinsText>
                    </View>
                    <View className="flex-row items-center gap-1" style={{ transform: [{ translateY: 8 }] }}>
                        <PoppinsText size={8}>{selectedMessage.time}</PoppinsText>
                        <CheckCheck size={12} />
                    </View>
                </Animated.View> */}

                {/* Action Menu List */}
                <Animated.View
                    entering={ZoomIn.duration(20).springify()}
                    exiting={ZoomOut.duration(20)}
                    style={{
                        position: 'absolute',
                        top: menuTop,
                        ...(isUser ? { right: 16 } : { left: 16 }),
                        width: 250,
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        overflow: 'hidden',
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 5,
                    }}
                >
                    <ActionItem icon={Reply} label="Reply" />
                    <ActionItem icon={Copy} label="Copy" />
                    <ActionItem icon={Forward} label="Forward" />
                    <ActionItem icon={Star} label="Pin" />
                    <ActionItem icon={Trash2} label="Delete" color="#ef4444" isLast={true} />
                </Animated.View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
    }
});