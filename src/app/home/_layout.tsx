import "react-native-gesture-handler";
import React from "react";
import Header from "@components/Header";
import { Stack } from "expo-router";
import UserCircle from "@components/ui/user-circle";
import { View } from "react-native";
import SvgIcons from '@constants/svg-icons'

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <Header
            {...props}
            rightContent={ 
              <View className="flex flex-row items-center gap-6">
                <SvgIcons.BellIcon width={30} height={30}/>
                <UserCircle />
              </View>
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
