import ExpandableModel from '@/features/expandable-model'
import React, { Fragment } from 'react'
import { StatusBar, View } from 'react-native'

export default function ExpandableModelPage() {
    return (
        <Fragment>
            <StatusBar hidden={true} backgroundColor={"#000"} />
            <View className='flex-1 '>
                <ExpandableModel />
            </View>
        </Fragment>
    )
}