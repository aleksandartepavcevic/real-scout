import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-rubik text-xl my-10">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Link href="/explore">
        <Text className="font-rubik text-xl my-10">Explore</Text>
      </Link>
      <Link href="/profile">
        <Text className="font-rubik text-xl my-10">Profile</Text>
      </Link>
      <Link href="/sign-in">
        <Text className="font-rubik text-xl my-10">Sign In</Text>
      </Link>
    </View>
  );
}
