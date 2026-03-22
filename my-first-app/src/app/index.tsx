import PoppinsText from '@/components/ui/poppins-text';
import { Redirect, Stack } from 'expo-router';
import React, { Fragment } from 'react';
import { TouchableHighlight, View } from 'react-native';

export default function HomePage() {
    return <Redirect href={"/(dashboard)"} />
}


function OldHomePage() {
    return (<Fragment>
        <Stack.Screen options={{ title: "Home" }} />
        <View className='flex-1 items-center'>
            <View className='h-[120px] justify-end '>
                <TouchableHighlight className='py-1 rounded-full text-center w-max px-3 bg-blue-500'>
                    <PoppinsText weight="regular" className='font-poppins-semibold text-lg px-6 py-2 text-white'>Let's Start</PoppinsText>
                </TouchableHighlight>
            </View>
        </View>
    </Fragment>
    )
}
