import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.alek.real-scout",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setPlatform(config.platform!)
  .setProject(config.projectId!);

export const account = new Account(client);
export const avatar = new Avatars(client);

export const login = async () => {
  try {
    const successUrl = Linking.createURL("/");
    const appwriteUrl = account.createOAuth2Token(
      OAuthProvider.Google,
      successUrl
    );

    if (!appwriteUrl) throw new Error("Failed to create redirect URL");
    console.log("response", appwriteUrl);

    const browserSession = await openAuthSessionAsync(
      appwriteUrl.toString(),
      successUrl
    );

    if (browserSession.type !== "success") throw new Error("Failed to login");

    console.log("browserSession", browserSession);

    const url = new URL(browserSession.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    console.log("session", session);

    return true;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await account.deleteSession("current");

    if (!response) throw new Error("Failed to logout");

    return true;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();

    if (!user.$id) throw new Error("Failed to get user");

    const userAvatar = avatar.getInitials(user.name);

    return {
      ...user,
      avatar: userAvatar.toString(),
    };
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
