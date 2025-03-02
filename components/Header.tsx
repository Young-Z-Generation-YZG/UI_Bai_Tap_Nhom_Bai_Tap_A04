// Header.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type HeaderProps = NativeStackHeaderProps & {
  rightContent?: React.ReactNode; // Optional content for the right side
};

const Header = ({ navigation, options, rightContent }: HeaderProps) => {
  const router = useRouter();
  const canGoBack = navigation.canGoBack();
  const title = options.title || "Default Title"; // Fallback title

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* Left Section: Back Button */}
        <View style={styles.left}>
          {canGoBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section: Title */}
        <View style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right Section: Custom Content */}
        <View style={styles.right}>
          {rightContent || <View style={styles.placeholder} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Tailwind-like styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff", // bg-white
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    borderBottomWidth: 1, // border-b
    borderBottomColor: "#e5e7eb", // border-gray-200
    shadowColor: "#000", // shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  center: {
    flex: 3,
    alignItems: "center",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 4, // p-1
  },
  backIcon: {
    fontSize: 20, // text-xl
    color: "#1f2937", // text-gray-800
  },
  title: {
    fontSize: 18, // text-lg
    fontWeight: "600", // font-semibold
    color: "#1f2937", // text-gray-800
  },
  placeholder: {
    width: 20, // w-5 (for balance when no right content)
  },
});

export default Header;
