import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useGetPostsAsyncQuery } from "~/src/infrastructure/redux/apis/post.api";
import { logger } from "react-native-logs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Carousel } from "react-native-ui-lib";
import { useGetCategoriesAsyncQuery } from "~/src/infrastructure/redux/apis/category.api";
import { CategoryItemType } from "~/src/infrastructure/types/category.type";
import { ProductItemType } from "~/src/infrastructure/types/product.type";
import { useGetProductsAsyncQuery } from "~/src/infrastructure/redux/apis/product.api";
import images from "@constants/images";
// Explain how component is rendered
/**
 * state 1: At first mount, the HomeScreen component will call the useGetPostsAsyncQuery hook to fetch posts from the server. (automatically called by the hook under the hood)
 *  so at the first render, data will be undefined, but "View" is still rendered.
 * state 2: The component will render a View component. (still no data)
 * state 3: data is fetched from the server and the component will re-render with the fetched data. (data is now available)
 */

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const imagesSlideshow = [
  images.slideshow01,
  images.slideshow02,
  images.slideshow03,
  images.slideshow04,

]

const HomeScreen = () => {
  var log = logger.createLogger();

  // const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoriesData, setCategoriesData] = useState<CategoryItemType[]>([]);
  const [productsData, setProductsData] = useState<ProductItemType[]>([]);

  const {
    data: categoriesResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCategoriesAsyncQuery();

  const {
    data: productsResponse,
  } = useGetProductsAsyncQuery({_page: 1, _limit: 10});

  useEffect(() => {
    if (categoriesResponse?.data) {
       setCategoriesData(categoriesResponse.data);
    }
    if (productsResponse?.data?.items) {
      setProductsData(productsResponse.data.items);
   }
  }, [categoriesResponse,productsResponse]);

  if (categoriesData.length !== 0 && productsData.length !== 0) {
    console.log('categoriesData', categoriesData);
    console.log('productsData', productsData);
  }
  else{
    console.log("ERROR!!!")
  }

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
    <ScrollView>
      {/* <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
        Home Screen
      </Text> */}
      <View className="w-full">
        <Carousel
          loop
          autoplay
          pageWidth={SCREEN_WIDTH}
          itemSpacings={0}
          // containerMarginHorizontal={40}
          initialPage={0}
          pageControlPosition={Carousel.pageControlPositions.OVER}
          // allowAccessibleLayout
          // className="bg-green-200"
        >
          {imagesSlideshow.map((image, index) => (
              <View key={index} className="h-[548px] w-full">
                <Image source={image} style={{width: "100%", height: "100%", resizeMode: "contain"}} />
              </View>
          ))}
        </Carousel>
        
      </View>
      {/* Category Carousel */}
      <View className="w-full">
        <Text className="text-black text-2xl font-semibold text-center uppercase mt-5 mb-3 underline">Categories</Text>
        <Carousel
          // autoplay
          pageWidth={120}
          containerMarginHorizontal={0}
          initialPage={0}
          itemSpacings={10}
        >
          {categoriesData.map((category) => (
            <TouchableOpacity key={category._id} className="h-[120px] w-full rounded-2xl bg-black flex justify-center items-center">
              <Text className="text-white text-xl text-center ">{category.category_name}</Text>
            </TouchableOpacity>
          ))}
        </Carousel>
      </View>

      {/* Product Carousel */}
      <View>
        <Text className="text-black text-2xl font-semibold text-center uppercase mt-5 mb-3 underline">Products</Text>
        <Carousel
          // autoplay
          pageWidth={200}
          containerMarginHorizontal={0}
          initialPage={0}
          itemSpacings={10}
        >
          {productsData.map((product) => (
            <TouchableOpacity key={product._id} className="h-[340px] overflow-hidden  w-full rounded-2xl flex justify-start items-center">
              <Image 
                source={{uri: product.product_imgs[0].secure_url}}
                style={{width: "100%", height: 240, resizeMode: "contain"}}
              />
              <View className="h-[100px] w-full bg-[#fff] flex p-2">
                <Text className="h-[60px] text-2xl">{product.product_name}</Text>
                <Text className="text-xl ">${product.product_price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Carousel>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // title: {
  //   marginTop: 10,
  //   fontSize: 22,
  //   textAlign: "center",
  //   fontWeight: "bold",
  // },
  // carouselContainer: {
  //   marginVertical: 20,
  // },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  //   marginLeft: 20,
  // },
  // categoryItem: {
  //   backgroundColor: "#f8f9fa",
  //   padding: 15,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   width: SCREEN_WIDTH * 0.8,
  // },
  // categoryText: {
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
  // productItem: {
  //   backgroundColor: "#fff",
  //   padding: 10,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   width: SCREEN_WIDTH * 0.8,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  // },
  // productImage: {
  //   width: 150,
  //   height: 150,
  //   resizeMode: "contain",
  // },
  // productText: {
  //   marginTop: 10,
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
});
