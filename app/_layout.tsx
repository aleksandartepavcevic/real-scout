import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import GlobalProvider from "@/contexts/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Rubik_Regular: require("../assets/fonts/Rubik-Regular.ttf"),
    Rubik_Medium: require("../assets/fonts/Rubik-Medium.ttf"),
    Rubik_SemiBold: require("../assets/fonts/Rubik-SemiBold.ttf"),
    Rubik_Bold: require("../assets/fonts/Rubik-Bold.ttf"),
    Rubik_Light: require("../assets/fonts/Rubik-Light.ttf"),
  });

  if (fontsLoaded) {
    SplashScreen.hide();
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GlobalProvider>
  );
}
