import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { logger } from "react-native-logs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Carousel } from "react-native-ui-lib";
import { useGetCategoriesAsyncQuery } from "~/src/infrastructure/redux/apis/category.api";
import { CategoryItemType } from "~/src/infrastructure/types/category.type";
import { ProductItemType } from "~/src/infrastructure/types/product.type";
import { useGetProductsAsyncQuery } from "~/src/infrastructure/redux/apis/product.api";
import images from "@constants/images";
import { router } from "expo-router";
import ProductItem from "@components/ui/product-item";
import HomeLayout from "@components/layouts/Home.layout";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const imagesSlideshow = [
  images.slideshow01,
  images.slideshow02,
  images.slideshow03,
  images.slideshow04,
];

const HomeScreen = () => {
  const log = logger.createLogger();
  const [categoriesData, setCategoriesData] = useState<CategoryItemType[]>([]);
  const [productsData, setProductsData] = useState<ProductItemType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4); // Use const since it doesn't change
  const [totalItems, setTotalItems] = useState<number | null>(null);

  const {
    data: categoriesResponse,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
    isError: categoriesIsError,
  } = useGetCategoriesAsyncQuery();

  const {
    data: productsResponse,
    isLoading: productsIsLoading,
    isFetching: productsIsFetching,
    isError: productsIsError,
    refetch: productsRefetch,
  } = useGetProductsAsyncQuery({ _page: page, _limit: limit });

  // Update categories data
  useEffect(() => {
    if (categoriesResponse?.data) {
      setCategoriesData(categoriesResponse.data);
    }
  }, [categoriesResponse]);

  // Append products and update totalItems
  useEffect(() => {
    if (productsResponse?.data?.items) {
      setProductsData((prev) => {
        const newItems = productsResponse.data.items.filter(
          (newItem) => !prev.some((item) => item._id === newItem._id)
        );
        return [...prev, ...newItems];
      });
      if (productsResponse.data.meta?.totalItems !== undefined) {
        setTotalItems(productsResponse.data.meta.totalItems);
      }
    }
  }, [productsResponse]);

  // Load more products when scrolling near the end
  const loadMoreProducts = useCallback(() => {
    if (
      !productsIsFetching &&
      !productsIsError &&
      totalItems !== null &&
      productsData.length < totalItems
    ) {
      setPage((prev) => prev + 1);
    }
  }, [productsIsFetching, productsIsError, totalItems, productsData.length]);

  // Handle scroll event to detect end of content
  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const paddingToBottom = 20;

      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      ) {
        loadMoreProducts();
      }
    },
    [loadMoreProducts]
  );

  // Conditional content rendering
  const renderContent = () => {
    if (categoriesIsLoading || productsIsLoading) {
      log.debug("Loading data...");
      return (
        <View>
          <Text className="mt-5 text-xl text-center font-TenorSans-Regular">
            Loading...
          </Text>
        </View>
      );
    }

    if (categoriesIsError || productsIsError) {
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
        {/* Slideshow Carousel */}
        <View className="w-full">
          <Carousel
            loop
            autoplay
            pageWidth={SCREEN_WIDTH}
            itemSpacings={0}
            initialPage={0}
            pageControlPosition={Carousel.pageControlPositions.OVER}
          >
            {imagesSlideshow.map((image, index) => (
              <View key={index} className="h-[548px] w-full">
                <Image
                  source={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
            ))}
          </Carousel>
        </View>

        {/* Category Carousel */}
        <View className="w-full">
          <Text className="mt-5 mb-3 text-2xl font-semibold text-center text-black underline uppercase">
            Categories
          </Text>
          <Carousel
            pageWidth={120}
            containerMarginHorizontal={0}
            initialPage={0}
            itemSpacings={10}
          >
            {categoriesData.map((category) => (
              <TouchableOpacity
                key={category._id}
                className="h-[120px] w-full rounded-2xl bg-black flex justify-center items-center"
              >
                <Text className="text-xl text-center text-white">
                  {category.category_name}
                </Text>
              </TouchableOpacity>
            ))}
          </Carousel>
        </View>

        {/* Product Carousel */}
        <View>
          <Text className="mt-5 mb-3 text-2xl font-semibold text-center text-black underline uppercase">
            Products
          </Text>
          <Carousel
            pageWidth={200}
            containerMarginHorizontal={0}
            initialPage={0}
            itemSpacings={10}
          >
            {productsData.map((product) => (
              <TouchableOpacity
                key={product._id}
                className="h-[340px] overflow-hidden w-full rounded-2xl flex justify-start items-center"
              >
                <Image
                  source={{ uri: product.product_imgs[0].secure_url }}
                  style={{ width: "100%", height: 240, resizeMode: "contain" }}
                />
                <View className="h-[100px] w-full bg-[#fff] flex p-2">
                  <Text className="h-[60px] text-2xl">
                    {product.product_name}
                  </Text>
                  <Text className="text-xl">${product.product_price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Carousel>
        </View>

        {/* Product Grid */}
        <View className="mt-20">
          <Text className="text-xl font-semibold">Load more</Text>
          <View className="flex-row flex-wrap items-center justify-center gap-6">
            {productsData.map((item) => (
              <TouchableOpacity key={item._id} onPress={() => {}}>
                <ProductItem
                  title={item.product_name}
                  description="reversible angora cardigan"
                  price={item.product_price}
                  imageUrl={
                    item.product_imgs[0]?.secure_url ||
                    "https://via.placeholder.com/150"
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <TouchableOpacity
            className="mt-5 bg-black"
            onPress={() => router.push("/cart")}
          >
            <Text className="p-2 text-xl font-semibold text-center text-white">
              Navigate to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <HomeLayout onScroll={handleScroll}>{renderContent()}</HomeLayout>;
};

export default HomeScreen;
