import { Loader2 } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated'

const AnimatedLoader = Animated.createAnimatedComponent(Loader2)

interface LoaderProps extends React.ComponentProps<typeof Loader2> {
    animating?: boolean,
    containerProps?: ViewProps
}

export default function Loader({ animating = true, containerProps = {}, ...props }: LoaderProps) {
    const rotation = useSharedValue(0)

    useEffect(() => {
        if (animating) {
            rotation.value = withRepeat(
                withTiming(360, {
                    duration: 1000,
                    easing: Easing.linear,
                }),
                -1,
                false
            )
        } else {
            cancelAnimation(rotation)
        }
    }, [animating])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` }
            ]
        }
    })

    const propStyle = typeof props?.style == "object" ? props?.style : {}
    const containerPropsStyle = typeof containerProps?.style == "object" ? containerProps?.style : {}

    return (
        <View
            {...containerProps}
            style={[loaderStyle.container, containerPropsStyle]}
        >
            <AnimatedLoader
                style={[propStyle, animatedStyle]}
                size={32} color={"#3b82f6"} {...props} />
        </View>
    )
}


const loaderStyle = StyleSheet.create({
    container: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
    },
})