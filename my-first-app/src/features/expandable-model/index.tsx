import PoppinsText from '@/components/ui/poppins-text';
import { CircleQuestionMark, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, View } from 'react-native';


export default function ExpandableModel() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [transitionElementsCords, setTransitionElementsCords] = useState({
        "org": { x: 0, y: 0, width: 0, height: 0 },
        "target": { x: 0, y: 0, width: 0, height: 0 }
    })

    const modal_btn_width = useRef(new Animated.Value(120)).current
    const modal_btn_left = useRef(new Animated.Value(120)).current

    const modalTranslateY = useRef(new Animated.Value(100)).current
    const ModalOpacityAnimation = useRef(new Animated.Value(0)).current

    function toggleScale() {
        setIsModalOpen(pre => !pre)
        if (!isModalOpen) {
            Animated.parallel([
                Animated.timing(modalTranslateY, {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(ModalOpacityAnimation, {
                    toValue: 1,
                    duration: 250,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(modal_btn_width, {
                    toValue: transitionElementsCords.org.width,
                    duration: 250,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false,
                }),
                Animated.timing(modal_btn_left, {
                    toValue: transitionElementsCords.org.x,
                    duration: 250,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false,
                }),
            ])
                .start();
        } else {

            Animated.parallel([
                Animated.timing(modalTranslateY, {
                    toValue: 100,
                    duration: 200,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(ModalOpacityAnimation, {
                    toValue: 0,
                    duration: 250,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(modal_btn_width, {
                    toValue: 120,
                    duration: 250,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false,
                }),
            ])
                .start(() => setIsModalOpen(false));

        }
    }


    function modelSubmitButtonDimensions(e: any) {
        const layout = e.nativeEvent.layout;
        setTransitionElementsCords(prev => {
            let obj = { ...prev }
            obj.org = layout
            return obj
        })
    }

    function targetSubmitButtonDimensions(e: any) {
        const layout = e.nativeEvent.layout;
        setTransitionElementsCords(prev => {
            let obj = { ...prev }
            obj.target = layout
            return obj
        })

    }

    console.log(transitionElementsCords);

    return (
        <View className='bg-slate-900  flex-1'>
            <View className='py-4 px-2 '>
                <PoppinsText className='text-white' size={24}>Expandable Model</PoppinsText>
            </View>
            {/* Confirm Model Wrapper*/}
            <Animated.View style={{
                transform: [{
                    translateY: modalTranslateY
                }],
                opacity: ModalOpacityAnimation
            }} className='absolute bottom-0 left-0'>
                {/* Confirm Model */}
                <View className='mx-4 gap-8 p-4 bg-[#0e1616] rounded-3xl'>
                    {/* Top Portion */}
                    <View className=''>
                        {/* Confirm Model Header */}
                        <View className='flex-row items-center justify-between'>
                            {/* Confirm Model Header Left*/}
                            <View className='flex-row gap-2 items-center'>
                                <CircleQuestionMark size={24} color={'#8df0cc'} style={{ transform: [{ translateY: -1 }] }} />
                                <PoppinsText weight='semibold' size={20} className='text-white '>Confirm</PoppinsText>
                            </View>
                            <View>
                                <X onPress={toggleScale} size={24} color={"white"} />
                            </View>
                        </View>
                        {/* Confirm Model Body */}
                        <View className='mt-4'>
                            <PoppinsText size={12} className='text-slate-400 max-sm:text-sm'>
                                Are you sure you want to receive a load of money?</PoppinsText>
                        </View>
                    </View>
                    {/* Footer */}
                    <View className='flex-row gap-2'>
                        <TouchableWithoutFeedback onPress={toggleScale} >
                            <View className=' bg-[#1a1e26] flex-1 py-1 px-4 text-white rounded-[50px] p-4 w-fit mx-auto flex-row items-center justify-center'>
                                <PoppinsText size={14} weight='regular' className='text-white'>Cancel</PoppinsText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onLayout={modelSubmitButtonDimensions} style={{ opacity: 0 }}>
                            <View style={{ opacity: 0 }} className='bg-[#8df0cc] flex-1 p-4 w-fit mx-auto rounded-full px-8 py-2 flex-row items-center justify-center'>
                                <PoppinsText size={14} weight='regular'>Submit</PoppinsText>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Animated.View>
            <View
                style={{
                    position: 'absolute',
                    bottom: '0%',
                    left: '50%',
                    transform: [{ translateX: -50 }, { translateY: 0 }],
                }}
                className='p-4'>
                <TouchableWithoutFeedback
                    onPress={toggleScale}>
                    <Animated.View
                        onLayout={targetSubmitButtonDimensions}
                        style={[{ width: modal_btn_width, bottom: 0 }, { transform: [{ translateX: modal_btn_left }] }]}
                        className='bg-[#8df0cc] p-4 absolute mx-auto rounded-full px-8 py-2 flex-row items-center justify-center'>
                        <PoppinsText size={14} weight='regular'>Submit</PoppinsText>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}