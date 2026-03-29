import { Image, Locate, Newspaper, Video } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import PoppinsText from './poppins-text';

interface Props {
    visible: boolean;
    hideModal: () => void
}

function voidAction() {
    return
}

export default function MessageMediaInput({ visible, hideModal }: Props) {

    const actions = [
        { icon: Image, label: "Image", color: "#000", action: voidAction },
        { icon: Video, label: "Video", color: "#000", action: voidAction },
        { icon: Newspaper, label: "Files", color: "#000", action: voidAction },
        { icon: Locate, label: "Location", color: "#000", action: voidAction },
    ]

    return (
        <Modal
            visible={visible}
            animationType='none'
            transparent
            onRequestClose={hideModal}
        >
            <Pressable style={style.overlay} onPress={hideModal}
                className='bg-gray-400'
            >
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
                />

                <Animated.View
                    entering={FadeIn.springify().duration(20)}
                    exiting={FadeOut.springify().duration(20)}
                    className='bg-white flex-wrap flex-row items-center '
                    style={style.container}>
                    {actions.map((action, index) => (
                        <ActionItem key={index} {...action} />
                    ))}
                </Animated.View>
            </Pressable>
        </Modal>
    )
}


function ActionItem({ icon: Icon, label, color = "#000", isLast = false, action = () => { } }: any) {
    return (
        <Pressable
            className={` active:bg-blue-50 items-center justify-between py-3 px-4`}
            onPress={action}
        >
            <View style={style.iconContainer}>
                <Icon size={scale(24)} color={color} />
            </View>
            <PoppinsText size={14} className=' mt-1 text-neutral-600'
                style={{ color: "#525252" }}
            >{label}</PoppinsText>
        </Pressable>
    )
};

const style = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    container: {
        paddingTop: 20,
        paddingHorizontal: 10,
        justifyContent: "space-evenly",
        height: "auto"
    },
    iconContainer: {
        padding: 4, borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        width: "auto",
        height: "auto"
    }

})