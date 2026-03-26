import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { Fragment, useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFonts } from 'expo-font';

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Poppins-Light': require('../../assets/fonts/poppins/Poppins-Light.ttf'),
    'Poppins-Regular': require('../../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/fonts/poppins/Poppins-Bold.ttf'),
    'BebasNeue-Regular': require('../../assets/fonts/bebas/BebasNeue-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Fragment>
      <StatusBar barStyle={"light-content"} backgroundColor={"#fff"} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "transparent" }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#ffffff36", }
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaView>
    </Fragment>
  );
}
