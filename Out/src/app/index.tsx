import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Home Screen</Text>
    </View>
  );
}
// import { useAuthStore } from "@/store/authStore";
// import { Text, View } from "react-native";

// export default function HomePage() {
//     const auth = useAuthStore();
//     const { signIn, token } = auth

//     const value = token || "no token"

//     async function handleClick(e: any) {
//         console.log("Button Clicked")
//         console.log(auth)
//         const res = await signIn({ email: "test@gmail.com", password: "123456" })
//         console.log(res)
//     }


//     return (
//         <View>
//             <Text>{value}</Text>
//             {/* <Stack.Screen options={{ title: "Home Page" }} />
//             <Text>Home Page</Text>
//             <Link href={"/dashboard" as any}>Go to Dashboard</Link>
//             <TouchableHighlight className="px-3 py-1 bg-teal-600 text-white rounded-sm mx-auto" onPress={handleClick}>
//                 <Text className="text-white">Click Me</Text>
//             </TouchableHighlight>
//             <Text>{value}</Text>
//             <View className="flex-1 items-center justify-center bg-white">
//                 <Text className="text-xl font-bold text-blue-500">
//                     Welcome to Nativewind!
//                 </Text>
//             </View> */}
//         </View>
//     );
// }
