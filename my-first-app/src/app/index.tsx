import { router, Stack } from 'expo-router';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

export default function HomePage() {

    function redirectToAuth() {
        router.push("/auth")
    }

    return (
        <View className='p-3'>
            <Stack.Screen options={{ title: "Home" }} />
            <Text>HomePage</Text>
            <TouchableHighlight className='py-1 text-center w-max px-3 bg-blue-500 rounded ' onPress={redirectToAuth}>
                <Text className='text-white'>Go to Auth Page</Text>
            </TouchableHighlight>
        </View>
    )
}
