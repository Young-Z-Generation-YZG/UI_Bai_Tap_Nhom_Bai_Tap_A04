import "../../global.css";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { persistStore } from "redux-persist";
import rtkStore from "~/src/infrastructure/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReduxProvider } from "~/src/infrastructure/redux/provider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const persistor = persistStore(rtkStore);

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "TenorSans-Regular": require("assets/fonts/TenorSans-Regular.ttf"),
    "Poppins-Black": require("assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ReduxProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </ReduxProvider>
  );
};

export default RootLayout;
