import { DynamicText } from '@/components/ui/poppins-text'
import ExpandableModel from '@/features/expandable-model'
import React, { Fragment } from 'react'
import { StatusBar, View } from 'react-native'

export default function ExpandableModelPage() {
    return (
        <Fragment>
            <StatusBar hidden={true} backgroundColor={"#000"} />
            <View className='py-4 px-2 bg-[#0e1616] '>
                <DynamicText className='text-white' size={24}>Expandable Model</DynamicText>
            </View>
            <View className='flex-1 '>
                <ExpandableModel />
            </View>
            {/* <View className='flex-1 bg-[#0b1012]'>
                <DynamicText className='text-white' size={24}>Footer</DynamicText>
            </View> */}
        </Fragment>
    )
}