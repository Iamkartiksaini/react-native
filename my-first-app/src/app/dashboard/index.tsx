import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function DashboardPage() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Stack.Screen options={{ title: "Dashboard" }} />
            <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
            <Text className="text-gray-500 mt-2">Welcome to your dashboard!</Text>
        </View>
    );
}
