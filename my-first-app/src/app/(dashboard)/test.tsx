import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, Easing, SafeAreaView } from 'react-native';
import { Send, RotateCcw, Cloud, Zap, ShieldCheck } from 'lucide-react-native';

const ANIMATION_DEFAULT_CONFIG = {
    duration: 600,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: false, // Since width/height are animated, useNativeDriver stays false
};

export default function Test() {
    const itemRef = useRef<any>(null);
    const targetRef = useRef<any>(null);

    const [elementsPos, setElementPos] = useState({
        item: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 },
        target: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }
    });
    const [isSent, setIsSent] = useState(false);

    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    
    // Pulse animation for vault
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    useLayoutEffect(() => {
        // trigger first layout
    }, []);

    function itemLayoutHandler() {
        if (itemRef.current?.measure) {
            itemRef.current?.measure((...props: number[]) => {
                const [x, y, width, height, pageX, pageY] = props;
                setElementPos(prev => ({
                    ...prev,
                    item: { x, y, width, height, pageX, pageY }
                }));
            });
        }
    }

    function targetLayoutHandler() {
        if (targetRef.current?.measure) {
            targetRef.current?.measure((...props: number[]) => {
                const [x, y, width, height, pageX, pageY] = props;
                setElementPos(prev => ({
                    ...prev,
                    target: { x, y, width, height, pageX, pageY }
                }));
            });
        }
    }

    function startAnimation() {
        if (elementsPos.target.pageY === 0 || elementsPos.item.pageY === 0) return;
        setIsSent(true);
        const distanceY = elementsPos.target.pageY - elementsPos.item.pageY;
        // Adjust for center alignment
        const distanceX = elementsPos.target.pageX - elementsPos.item.pageX + (elementsPos.target.width / 2 - elementsPos.item.width / 2);

        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.05, duration: 150, useNativeDriver: false }),
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: distanceY + (elementsPos.target.height / 2 - elementsPos.item.height / 2),
                    ...ANIMATION_DEFAULT_CONFIG
                }),
                Animated.timing(translateX, {
                    toValue: distanceX,
                    ...ANIMATION_DEFAULT_CONFIG
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.6,
                    ...ANIMATION_DEFAULT_CONFIG
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.8,
                    ...ANIMATION_DEFAULT_CONFIG
                })
            ])
        ]).start();
    }

    function revertAnimation() {
        setIsSent(false);
        Animated.parallel([
            Animated.timing(translateY, { toValue: 0, ...ANIMATION_DEFAULT_CONFIG }),
            Animated.timing(translateX, { toValue: 0, ...ANIMATION_DEFAULT_CONFIG }),
            Animated.timing(scaleAnim, { toValue: 1, ...ANIMATION_DEFAULT_CONFIG }),
            Animated.timing(opacityAnim, { toValue: 1, ...ANIMATION_DEFAULT_CONFIG })
        ]).start();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#020617' }}>
            <View className="flex-1 px-6 py-8 justify-between">
                
                {/* Header Area */}
                <View className="items-center mt-4 mb-8">
                    <View className="w-16 h-16 bg-indigo-500/10 rounded-full items-center justify-center mb-4 border border-indigo-500/20">
                        <Cloud color="#6366f1" size={32} />
                    </View>
                    <Text className="text-white text-3xl font-extrabold tracking-tight">Data Transfer</Text>
                    <Text className="text-slate-400 text-base mt-2 text-center px-4 leading-relaxed font-medium">
                        Securely migrate your encrypted payload to the remote vault layer.
                    </Text>
                </View>

                {/* Source Area */}
                <View className="flex-1 items-center z-10 justify-start pt-4">
                    <View className="mb-14" onLayout={itemLayoutHandler}>
                        <Animated.View
                            ref={itemRef}
                            style={[
                                {
                                    transform: [
                                        { translateY: translateY },
                                        { translateX: translateX },
                                        { scale: scaleAnim }
                                    ],
                                    opacity: opacityAnim,
                                    zIndex: 50,
                                }
                            ]}
                            className="bg-[#4f46e5] rounded-[24px] p-5 w-72 shadow-2xl border border-indigo-400/30 flex-row items-center justify-between"
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="bg-white/20 p-3 rounded-2xl">
                                    <Zap color="#fff" size={24} />
                                </View>
                                <View>
                                    <Text className="text-white text-lg font-bold tracking-wide">Payload Beta</Text>
                                    <View className="flex-row items-center mt-1">
                                        <View className="w-2 h-2 rounded-full bg-green-400 mr-2" />
                                        <Text className="text-indigo-100 text-xs font-medium uppercase tracking-wider">Ready • 1.2 GB</Text>
                                    </View>
                                </View>
                            </View>
                        </Animated.View>
                    </View>

                    {/* Controls */}
                    <View className="flex-row items-center justify-center gap-5 w-full">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={startAnimation}
                            disabled={isSent}
                            className={`flex-1 flex-row items-center justify-center py-4 rounded-full ${isSent ? 'bg-slate-800' : 'bg-blue-600'}`}
                            style={!isSent ? { shadowColor: '#2563eb', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 } : {}}
                        >
                            <Send color={isSent ? "#475569" : "#fff"} size={20} />
                            <Text className={`font-semibold ml-2 text-lg ${isSent ? 'text-slate-500' : 'text-white'}`}>Deploy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={revertAnimation}
                            disabled={!isSent}
                            className={`flex-1 flex-row items-center justify-center py-4 rounded-full ${!isSent ? 'bg-slate-800' : 'bg-rose-500'}`}
                            style={isSent ? { shadowColor: '#e11d48', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 } : {}}
                        >
                            <RotateCcw color={!isSent ? "#475569" : "#fff"} size={20} />
                            <Text className={`font-semibold ml-2 text-lg ${!isSent ? 'text-slate-500' : 'text-white'}`}>Recall</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Target Vault Area */}
                <View className="items-center pb-6 mt-16 w-full relative">
                    <View className="absolute -top-3 px-4 bg-[#020617] z-10">
                        <View className="flex-row items-center gap-2">
                            <ShieldCheck color="#64748b" size={16} />
                            <Text className="text-slate-500 uppercase tracking-[0.2em] font-bold text-xs">Secure Vault Zone</Text>
                        </View>
                    </View>
                    
                    <View className="w-full border-t border-slate-800 absolute top-0" />
                    
                    <Animated.View
                        style={{ transform: [{ scale: pulseAnim }] }}
                        className="w-full mt-8"
                    >
                        <View
                            ref={targetRef}
                            onLayout={targetLayoutHandler}
                            className="w-full h-44 bg-slate-900/40 rounded-[32px] border-2 border-dashed border-slate-700/60 items-center justify-center"
                            style={{ overflow: 'hidden' }}
                        >
                            <View className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/5" />
                            <Cloud color="#334155" size={48} />
                            <Text className="text-slate-600 font-medium mt-4 tracking-wide">Awaiting incoming data payload...</Text>
                        </View>
                    </Animated.View>
                </View>
            </View>
        </SafeAreaView>
    );
}
