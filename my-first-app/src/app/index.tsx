import { Stack, useRouter } from 'expo-router';
import React, { Fragment } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

export default function HomePage() {

    const router = useRouter()
    function redirectToAuth() {
        router.push("/auth")
    }

    return (<Fragment>
        <View className='p-3 flex-1 items-center'>
            <Stack.Screen options={{ title: "Home" }} />
            <View className='flex-1 justify-center items-center gap-2'>
                <Text className='text-5xl text-center font-bold text-blue-500'>Welcome</Text>
                <Text className='text-xl text-center font-semibold italic text-neutral-500'>Manage your Todos</Text>
            </View>
            <TouchableHighlight className='py-1 rounded-full  text-center w-max px-3 bg-blue-500' onPress={redirectToAuth}>
                <Text className='text-lg px-6 py-2 font-semibold text-white'>Let's Start</Text>
            </TouchableHighlight>
        </View>
    </Fragment>

    )
}
