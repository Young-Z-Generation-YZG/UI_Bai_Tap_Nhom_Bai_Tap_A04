import "expo-router/entry";

import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const AppScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 500);
  }, []);

  return (
    <SafeAreaView>
      <Text>AppScreen</Text>
    </SafeAreaView>
  );
};

export default AppScreen;
