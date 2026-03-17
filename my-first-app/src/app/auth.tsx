import { router, Stack } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { MoveLeft } from 'lucide-react-native';
import React, { Fragment, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function handleSubmit() {
        if (isLogin) {
            const payload = { email, password }
        }
        try {
            const data = jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30")
            console.log(data)
        } catch (error: any) {
            console.log(error?.message)
        }
    }

    return (
        <Fragment>
            <Stack.Screen options={{
                headerShown: true,
                header: () => (
                    <View className='flex-row gap-2 bg-neutral-200 items-center' style={{ height: 60, paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => router.back()} className="mr-4">
                            <MoveLeft size={24} />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Auth</Text>
                    </View>
                )
            }} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 bg-grey-50 justify-center font-sans"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="bg-white px-4 pt-8 rounded-3xl shadow-sm border border-gray-100 h-full">

                        {/* Header */}
                        <View className="items-center mb-8 gap-2">
                            <Text className="text-3xl font-bold text-gray-900">
                                {isLogin ? "Welcome back" : "Create an account"}
                            </Text>
                            <Text className="text-sm text-gray-500 text-center">
                                {isLogin ? "Please enter your details to sign in." : "Start your journey with us today."}
                            </Text>
                        </View>

                        {/* Form */}
                        <View className="flex-col">
                            {!isLogin && (
                                <View className="mb-4">
                                    <Text className="text-sm font-medium text-gray-700 mb-1.5 focus:text-black">Name</Text>
                                    <TextInput
                                        className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                                        placeholder="John Doe"
                                        placeholderTextColor="#9ca3af"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            )}

                            <View className="mb-4">
                                <Text className="text-sm font-medium text-gray-700 mb-1.5 focus:text-black">Email address</Text>
                                <TextInput
                                    className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                                    placeholder="name@example.com"
                                    placeholderTextColor="#9ca3af"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <View className="mb-6">
                                <Text className="text-sm font-medium text-gray-700 mb-1.5 focus:text-black">Password</Text>
                                <TextInput
                                    className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 text-base"
                                    placeholder="••••••••"
                                    placeholderTextColor="#9ca3af"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                {isLogin && (
                                    <TouchableOpacity className="mt-2 items-end">
                                        <Text className="text-sm font-medium text-gray-500">Forgot password?</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="bg-black rounded-xl py-4 items-center justify-center active:bg-gray-800">
                                <Text className="text-white text-base font-semibold">
                                    {isLogin ? "Sign In" : "Sign Up"}
                                </Text>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View className="flex-row items-center my-6">
                                <View className="flex-1 h-[1px] bg-gray-200" />
                                <Text className="px-4 text-sm text-gray-500 font-medium tracking-wider">OR</Text>
                                <View className="flex-1 h-[1px] bg-gray-200" />
                            </View>

                            {/* Social Buttons */}
                            <TouchableOpacity className="flex-row items-center justify-center border border-gray-200 rounded-xl py-3.5 bg-white active:bg-gray-50">
                                <Text className="text-gray-700 text-base font-medium">Continue with Google</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer Toggle */}
                        <View className="flex-row justify-center mt-8">
                            <Text className="text-gray-500 text-sm">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                            </Text>
                            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                                <Text className="text-black text-sm font-semibold">
                                    {isLogin ? "Sign up" : "Sign in"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Fragment>
    );
}
