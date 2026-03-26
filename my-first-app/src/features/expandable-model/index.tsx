import PoppinsText, { DynamicText } from '@/components/ui/poppins-text';
import { CircleQuestionMark, X } from 'lucide-react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, TouchableWithoutFeedback, Vibration, View } from 'react-native';

export default function ExpandableModel() {
    const MODAL_TRANFORMY_VALUE = 30
    const [isModalOpen, setIsModalOpen] = useState(false);

    const itemRef = useRef<any>(null)
    const targetRef = useRef<any>(null)

    // ITEM ANIMATION
    const itemHeight = useRef(new Animated.Value(0)).current
    const itemWidth = useRef(new Animated.Value(0)).current
    const itemPageX = useRef(new Animated.Value(-50)).current
    const itemPageY = useRef(new Animated.Value(0)).current

    // MODAL ANIMATION
    const modalTranslateY = useRef(new Animated.Value(0)).current
    const modalOpacity = useRef(new Animated.Value(0)).current

    const [elements, setTransitionElements] = useState({
        "item": { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 },
        "target": { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }
    })


    useLayoutEffect(() => {
        loadAllDimensions()
        return () => {
            loadAllDimensions()
        }
    }, [])

    function loadAllDimensions() {
        loadDimensions("item")
        loadDimensions("target")
    }


    function loadDimensions(key: "item" | "target") {
        const contentRef = key === "item" ? itemRef : targetRef
        if (contentRef.current?.measure) {
            contentRef.current?.measure((...props: number[]) => {
                const [x, y, width, height, pageX, pageY] = props;
                if (key === "item") {
                    itemWidth.setValue(width)
                    itemHeight.setValue(height)
                    itemPageX.setValue(0)
                    itemPageY.setValue(0)
                    modalTranslateY.setValue(MODAL_TRANFORMY_VALUE)
                }

                setTransitionElements(prev => {
                    let obj = { ...prev }
                    obj[key] = {
                        x, y, width, height, pageX, pageY
                    }
                    return obj
                })
            });
        }
    }


    function toggleModalAnimation() {

        setIsModalOpen(pre => !pre)
        Vibration.vibrate(30)
        if (!isModalOpen) {
            const cords = {
                x: elements.target.pageX - elements.item.pageX,
                y: elements.target.pageY - elements.item.pageY,
            }
            Animated.parallel([
                animateItem(modalTranslateY, 0, { easing: Easing.elastic(1.1), duration: 400 }),
                animateItem(modalOpacity, 1, { duration: 700 }),
                animateItem(itemWidth, elements.target.width, { easing: Easing.elastic(1.8), duration: 500 }),
                Animated.sequence([
                    animateItem(itemHeight, elements.target.height + 10, { easing: Easing.elastic(1.8), }),
                    animateItem(itemHeight, elements.target.height, { easing: Easing.elastic(1.8), }),
                ]),
                animateItem(itemPageX, cords.x - elements.item.x, { delay: 0 }),
                animateItem(itemPageY, cords.y, { delay: 0 }),
            ]).start();

        } else {
            Animated.parallel([
                animateItem(modalTranslateY, MODAL_TRANFORMY_VALUE),
                animateItem(modalOpacity, 0),
                animateItem(itemWidth, elements.item.width, { easing: Easing.elastic(1.8), duration: 500 }),
                Animated.sequence([
                    animateItem(itemHeight, elements.item.height + 5, { easing: Easing.elastic(1.8), }),
                    animateItem(itemHeight, elements.item.height, { easing: Easing.elastic(1.8), }),
                ]),
                animateItem(itemPageX, 0),
                animateItem(itemPageY, 0),
            ]).start();
        }
    }

    function animateItem(reference: any, value: any, config?: any) {
        return Animated.timing(reference, {
            toValue: value,
            duration: 300,
            useNativeDriver: false,
            ...config
        })
    }



    return (
        <View className='bg-[#0b1012]  flex-1'>
            {/* Confirm Model Wrapper*/}
            <Animated.View
                style={[
                    { opacity: modalOpacity, zIndex: 3, width: "100%" },
                    { transform: [{ translateY: modalTranslateY }] }
                ]}
                className='absolute bottom-4 left-0'>
                {/* Confirm Model */}
                <View className='mx-4 gap-8 px-4 py-8  bg-[#0e1616] rounded-3xl'>
                    {/* Top Portion */}
                    <View className=''>
                        {/* Confirm Model Header */}
                        <View className='flex-row items-center justify-between'>
                            {/* Confirm Model Header Left*/}
                            <View className='flex-row gap-2 items-center'>
                                <CircleQuestionMark size={22} color={'#8df0cc'} style={{ transform: [{ translateY: 0 }] }} />
                                <PoppinsText weight='semibold' size={20} className='text-white '>Confirm</PoppinsText>
                            </View>
                            <View>
                                <X onPress={toggleModalAnimation} size={24} color={"white"} />
                            </View>
                        </View>
                        {/* Confirm Model Body */}
                        <View className='mt-4'>
                            <DynamicText size={16} className='text-slate-400 max-sm:text-sm font-bebas'>Are you sure you want to receive a load of money?</DynamicText>
                        </View>
                    </View>
                    {/* Footer */}
                    <View className='flex-row gap-2'>
                        <TouchableWithoutFeedback onPress={toggleModalAnimation} >
                            <View className=' bg-[#1a1e26] flex-1 py-1 px-4 text-white rounded-[50px] p-4 w-fit mx-auto flex-row items-center justify-center'>
                                <PoppinsText size={14} weight='regular' className='text-white'>Cancel</PoppinsText>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View ref={targetRef} style={{ opacity: 0 }} className='bg-[#8df0cc] flex-1 p-4 w-fit mx-auto rounded-full px-8 py-2 flex-row items-center justify-center'>
                                <PoppinsText size={14} weight='regular'>Yeah</PoppinsText>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Animated.View>

            <View style={{ zIndex: 3, position: "absolute", bottom: 16, left: 0 }}>
                <TouchableWithoutFeedback
                    onPress={toggleModalAnimation}>
                    <Animated.View
                        ref={itemRef}
                        style={[
                            {
                                position: "absolute",
                                bottom: 0,
                                left: 50,
                                width: 300,
                                alignItems: "center",
                                transform: [
                                    { translateX: -50 },
                                    { translateY: 0 },
                                ],
                            }
                            , elements.item.width > 0 ? {
                                width: itemWidth,
                                height: itemHeight,
                                transform: [
                                    { translateX: itemPageX },
                                    { translateY: itemPageY },
                                ],
                            } : undefined, isModalOpen ? {} : styles.mainBtn]}>
                        {isModalOpen ? <SwapperContent itemStyle={styles.mainBtn} /> : <PoppinsText size={14} weight='regular'>Open</PoppinsText>}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
            {/* <View>
                <PoppinsText className='text-white'>{JSON.stringify(elements, null, 2)}</PoppinsText>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    mainBtn: {
        backgroundColor: "#8df0cc",
        padding: 16,
        borderRadius: 50,
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    }
})




function SwapperContent({ itemStyle }: { itemStyle?: any }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);


    return <Animated.View style={[{
        backgroundColor: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["#000", "#fff"]
        }),
    }, itemStyle, { width: "100%" }]}>
        <PoppinsText size={14} weight='regular'>Yeah</PoppinsText>
    </Animated.View>
}