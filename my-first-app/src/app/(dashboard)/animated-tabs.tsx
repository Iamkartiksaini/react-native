import PoppinsText from "@/components/ui/poppins-text";
import React, { useRef, useState } from "react";
import {
    Animated,
    Button,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

const TABS = ["Home", "Trending", "Subscriptions", "Library"];

export default function TabHeader() {
    const [count, setCount] = useState(8);
    const [activeIndex, setActiveIndex] = useState(0);
    const [layouts, setLayouts] = useState([]);

    const translateX = useRef(new Animated.Value(0)).current;
    const indicatorWidth = useRef(new Animated.Value(0)).current;

    const handleLayout = (event: any, index: any, label: string) => {
        const { x, width } = event.nativeEvent.layout;

        setLayouts((prev) => {
            const updated: any = [...prev];
            updated[index] = { x, width };
            return updated;
        });

        // Initialize indicator on first tab render
        if (index === 0) {
            translateX.setValue(x);
            indicatorWidth.setValue(width);
        }
    };

    const onTabPress = (index: any) => {
        const layout: any = layouts[index];
        if (!layout) return;

        setActiveIndex(index);

        Animated.parallel([
            Animated.timing(translateX, {
                toValue: layout.x,
                duration: 250,
                useNativeDriver: false, // 👈 IMPORTANT: keep false
            }),
            Animated.timing(indicatorWidth, {
                toValue: layout.width,
                duration: 250,
                useNativeDriver: false,
            }),
        ]).start();
    };

    console.log("count")

    return (
        <View style={styles.container}>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tabRow}>
                {TABS.map((tab, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <TouchableOpacity
                            key={tab}
                            style={styles.tab}
                            activeOpacity={0.7}
                            onPress={() => onTabPress(index)}
                            onLayout={(e) => handleLayout(e, index, tab)}
                        >
                            <PoppinsText style={[styles.text, isActive && styles.activeText]}>
                                {tab}
                            </PoppinsText>
                        </TouchableOpacity>
                    );
                })}

                {/* Indicator */}
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            width: indicatorWidth,
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </ScrollView>
            <View className="flex-row mt-[120] p-2 items-center justify-evenly">
                <Button title="decrease" onPress={() => setCount(pre => pre - 1)} />
                <PoppinsText size={24} weight='bold' className='mx-2'>{count}</PoppinsText>
                <Button title="increase" onPress={() => setCount(pre => pre + 1)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: 50,
    },
    tabRow: {
        flexDirection: "row",
        position: "relative",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tab: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 16,
        color: "#777",
    },
    activeText: {
        color: "#0284c7",
    },
    indicator: {
        position: "absolute",
        bottom: 0,
        height: 3,
        borderColor: "#0284c7",
        borderWidth: 3,
        borderRadius: 2,
    },
});