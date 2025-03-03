import "react-native-gesture-handler";
import React from "react";
import Header from "@components/Header";
import { Stack } from "expo-router";
import UserCircle from "@components/ui/user-circle";
import { TouchableOpacity, View } from "react-native";
import SvgIcons from "@constants/svg-icons";
import FeatherIcons from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/src/infrastructure/redux/store";
import { setSearchOpened } from "~/src/infrastructure/redux/features/app/search.slice";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const isOpened = useAppSelector((state) => state.search.isOpened);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <Header
            {...props}
            rightContent={
              <View className="flex flex-row items-center gap-6">
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setSearchOpened(!isOpened));
                  }}
                >
                  <FeatherIcons name="search" size={30} />
                </TouchableOpacity>
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
