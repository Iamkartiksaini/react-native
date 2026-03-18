import { useAuthStore } from '@/store/authStore';
import Entypo from '@expo/vector-icons/Entypo';
import { Stack } from 'expo-router';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

export default function DashboardPage() {

    const { logout } = useAuthStore()

    return (
        <View className="flex-1 items-center justify-center bg-white pb-8">
            <Stack.Screen options={{ title: "Dashboard" }} />
            <View className='flex-1 justify-center items-center gap-2'>
                <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
                <Text className="text-gray-500 mt-2">Welcome to your dashboard!</Text>
            </View>
            <TouchableHighlight className='py-1 rounded-full  text-center w-max px-3 bg-red-500' onPress={logout}>
                <View className='flex-row items-center px-6 gap-2'>
                    <Text className='text-lg  py-2 font-semibold text-white'>Logout</Text>
                    <Entypo name="log-out" size={16} color="white" />
                </View>
            </TouchableHighlight>
        </View>
    );
}
