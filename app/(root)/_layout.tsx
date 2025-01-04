import { useGlobalContext } from "@/contexts/global-provider";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading)
    return (
      <SafeAreaView className="h-full flex items-center justify-center">
        <ActivityIndicator size="large" className="text-primary-300" />
      </SafeAreaView>
    );

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return <Slot />;
}

export default AppLayout;
