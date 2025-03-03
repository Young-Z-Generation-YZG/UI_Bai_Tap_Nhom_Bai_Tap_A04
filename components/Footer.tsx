import { View, Text, Image } from "react-native";
import React from "react";
import Icons from "@constants/svg-icons";

export default function Footer() {
  return (
    <View className="flex flex-col items-center justify-center w-full gap-5">
      {/* 3 icons */}
      <View className="flex flex-row items-center justify-center w-full gap-10 mt-10"></View>

      <View className="w-full">
        <Text className="text-xl text-center font-TenorSans-Regular">
          support@openfashion.com{" "}
        </Text>
        <Text className="mt-2 text-xl text-center font-TenorSans-Regular">
          +91 12345 67890{" "}
        </Text>
        <Text className="mt-2 text-xl text-center font-TenorSans-Regular">
          08:00-22:00 Everyday{" "}
        </Text>
      </View>

      <View className="flex flex-row justify-center w-full gap-10">
        <Text className="text-xl font-TenorSans-Regular">About</Text>
        <Text className="text-xl font-TenorSans-Regular">Contact</Text>
        <Text className="text-xl font-TenorSans-Regular">Blog</Text>
      </View>

      <View className="flex items-center justify-center w-full h-10 mt-10 bg-gray-100">
        <Text className="text-sm font-TenorSans-Regular">
          Copyright© artrivedi All Rights Reserved.
        </Text>
      </View>
    </View>
  );
}
