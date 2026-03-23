import React, { useLayoutEffect, useRef, useState } from 'react';
import { Animated, Button, View } from 'react-native';


const ANIMATION_DEFAULT_CONFIG = {
    duration: 500,
    useNativeDriver: false,
}

export default function Test() {

    const itemRef = useRef<any>(null);
    const targetRef = useRef<any>(null);

    const [elementsPos, setElementPos] = useState({
        item: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 },
        target: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }
    })


    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(0)).current;
    const heightAnim = useRef(new Animated.Value(0)).current;


    useLayoutEffect(() => {
        itemLayoutHandler()
        targetLayoutHandler()
    }, [])


    function itemLayoutHandler() {
        if (itemRef.current?.measure) {
            itemRef.current?.measure((...props: number[]) => {
                const [x, y, width, height, pageX, pageY] = props
                widthAnim.setValue(width);
                heightAnim.setValue(height);
                setElementPos(prev => {
                    let obj = { ...prev }
                    obj.item = { x, y, width, height, pageX, pageY }
                    return obj
                })
            })
        }
    }

    function targetLayoutHandler() {
        if (targetRef.current?.measure) {
            targetRef.current?.measure((...props: number[]) => {
                const [x, y, width, height, pageX, pageY] = props
                setElementPos(prev => {
                    let obj = { ...prev }
                    obj.target = { x, y, width, height, pageX, pageY }
                    return obj
                })
            })
        }
    }


    function startAnimation() {
        const distanceY = elementsPos.target.pageY - elementsPos.item.pageY
        const distanceX = elementsPos.target.pageX - elementsPos.item.pageX
        const newPos = {
            y: distanceY,
            x: distanceX,
            width: elementsPos.target.width,
            height: elementsPos.target.height,
        }

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: newPos.y,
                ...ANIMATION_DEFAULT_CONFIG
            }),
            Animated.timing(widthAnim, {
                toValue: newPos.width,
                ...ANIMATION_DEFAULT_CONFIG
            }),
        ]).start();
    }

    function revertAnimation() {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                ...ANIMATION_DEFAULT_CONFIG
            }),
            Animated.timing(widthAnim, {
                toValue: elementsPos.item.width,
                ...ANIMATION_DEFAULT_CONFIG
            }),
        ]).start();
    }


    return (
        <View className='bg-slate-300 flex-1 justify-between  w-min'>
            <View className='items-start '>
                <View className='w-full items-center bg-gray-900 p-8 h-fit'>
                    <Animated.Text ref={itemRef}
                        style={[{
                            zIndex: 8,
                        },
                        elementsPos.item.width > 0 ? {
                            width: widthAnim,
                            transform: [
                                {
                                    translateY: translateY
                                },
                            ],
                        } : undefined]}
                        className='bg-red-500 px-3 text-2xl'>Test</Animated.Text>
                </View>
                <View className='flex-row gap-3'>
                    <Button title='start'
                        onPress={startAnimation}
                    />
                    <Button title='Revert'
                        onPress={revertAnimation}
                    />
                </View>
            </View>

            <View ref={targetRef} className='bg-cyan-600 h-[120] w-auto'>
            </View>

        </View>
    )
}
