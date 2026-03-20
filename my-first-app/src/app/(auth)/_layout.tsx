import React, { Fragment } from 'react';
import { Text, View } from 'react-native';

export default function AuthLayout() {
    return (
        <Fragment>
            {/* <Stack screenOptions={{ headerShown: true }} /> */}
            <View>
                <Text>Hello Friend</Text>
            </View>
        </Fragment>
    );
}