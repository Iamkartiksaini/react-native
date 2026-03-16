import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function HomePage() {
    return (
        <View>
            <Stack.Screen options={{ title: "Home Page" }} />
            <Text>Home Page</Text>
            <Link href={"/dashboard" as any}>Go to Dashboard</Link>
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-xl font-bold text-blue-500">
                    Welcome to Nativewind!
                </Text>
            </View>
        </View>
    );
}
