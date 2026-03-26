import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function DashboardLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            contentStyle: {
                paddingTop: 0
            }
        }} >
            <Stack.Screen name='[chat]/index' options={{ headerShown: false }} />
        </Stack>
    )
}

const styles = StyleSheet.create({})