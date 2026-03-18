import { Stack } from "expo-router";
import React from "react";
import { ImageBackground, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ImageBackground
                source={require("@/assets/images/background.png")}
                style={{ flex: 1, filter: "blur(8px)", }}
                className="absolute top-0 left-0 h-full w-full"
            />
            <StatusBar barStyle={"dark-content"} backgroundColor={"gray"} />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "#ffffff36" }
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="auth" />
            </Stack>
        </SafeAreaView>
    );
}
