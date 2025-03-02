import "react-native-gesture-handler";
import React from "react";
import Header from "@components/Header";
import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <Header
            {...props}
            rightContent={
              <TouchableOpacity onPress={() => console.log("Settings pressed")}>
                <Text style={{ fontSize: 16, color: "#1f2937" }}>⚙️</Text>
              </TouchableOpacity>
            }
          />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
};

export default HomeLayout;
