import React, { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { scale } from 'react-native-size-matters';

type PoppinsWeight = 'bold' | 'semibold' | 'medium' | 'regular' | 'light';

interface PoppinsTextProps {
    children: React.ReactNode;
    className?: string;
    size?: number;
    style?: any;
    weight?: PoppinsWeight;
}

const PoppinsText = ({ children, size = 16, style = {}, className, weight, ...props }: TextProps & PoppinsTextProps) => {

    const st = useMemo(() => StyleSheet.create({
        text: {
            ...style,
            fontSize: scale(size),
            lineHeight: scale(size + 4),
        }
    }), [size])


    const weights: Record<PoppinsWeight, string> = {
        'bold': 'font-poppins-bold',
        'semibold': 'font-poppins-semibold',
        'medium': 'font-poppins-medium',
        'regular': 'font-poppins-regular',
        'light': 'font-poppins-light',
    }

    let weightClass = 'font-poppins-regular'

    if (weight && weights[weight]) {
        weightClass = weights[weight]
    }

    return (
        <Text {...props}
            className={`${weightClass} ${className || ''}`}
            style={[st.text]}
        >
            {children}
        </Text>
    )
}


export default PoppinsText