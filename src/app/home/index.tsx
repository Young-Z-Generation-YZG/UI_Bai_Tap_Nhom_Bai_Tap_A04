import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useGetPostsAsyncQuery } from "~/src/infrastructure/redux/apis/post.api";
import { logger } from "react-native-logs";
import { SafeAreaView } from "react-native-safe-area-context";

// Explain how component is rendered
/**
 * state 1: At first mount, the HomeScreen component will call the useGetPostsAsyncQuery hook to fetch posts from the server. (automatically called by the hook under the hood)
 *  so at the first render, data will be undefined, but "View" is still rendered.
 * state 2: The component will render a View component. (still no data)
 * state 3: data is fetched from the server and the component will re-render with the fetched data. (data is now available)
 */
const HomeScreen = () => {
  var log = logger.createLogger();

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPostsAsyncQuery({});

  if (isLoading) {
    log.debug("Loading data...");
    return (
      <View>
        <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
          Loading...
        </Text>
      </View>
    );
  }

  if (isError) {
    log.error("Error loading data...");
    return (
      <View>
        <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
          Error loading data...
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
        Home Screen
      </Text>

      <FlatList
        className="px-5 mt-5"
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-3 bg-primary">
            <Text className="mb-2 font-Poppins-Regular">
              Title: {item.title}
            </Text>
            <Text className="font-TenorSans-Regular">Content: {item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
