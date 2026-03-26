import PoppinsText from '@/components/ui/poppins-text';
import { Check, CheckCheck } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const UserProfileCard = ({ ...props }: any) => {
    const { id, title, message, profilePic, time, message_status, avatarSize = 48 } = props

    const st = useMemo(() => StyleSheet.create({
        container: {
            height: moderateScale(avatarSize + moderateScale(8 * 2)),
            backgroundColor: "gray"
        },
        profilePic: {
            height: moderateScale(avatarSize),
            width: moderateScale(avatarSize),
            borderRadius: moderateScale(avatarSize),
            backgroundColor: "#fc6392",
            justifyContent: "center",
            alignItems: "center"
        }
    }), [avatarSize])

    const Avatar = profilePic ? <Image style={st.profilePic} source={{ uri: profilePic }} /> :
        <View style={st.profilePic}>
            <PoppinsText size={18} weight="semibold" className='text-white'>{title.slice(0, 1).toUpperCase()}</PoppinsText>
        </View>
    const isSeen = message_status === "seen" ? <CheckCheck color="green" size={14} /> : <Check color="gray" size={14} />
    return (
        <View className='flex-row items-center gap-2 border-y border-neutral-100 p-2 active:bg-green hover:bg-green'>
            {Avatar}
            <View className='flex-1 relative'>
                <View className='relative'>
                    <View className=''>
                        <PoppinsText size={16} weight="regular" className='text-lg'>{title}</PoppinsText>
                    </View>
                    <PoppinsText size={14} weight='light' className='text-[16px] text-neutral-500'>{message}</PoppinsText>
                </View>
                <View className='absolute right-0 top-0 flex-row gap-1 items-center'>
                    {isSeen}
                    <PoppinsText size={10} weight='light' className='text-[16px] text-neutral-500'>{time}</PoppinsText>
                </View>
            </View>
        </View>
    )
}


export function Avatar({ profilePic, title, avatarSize = 48 }: { profilePic?: string, title: string, avatarSize: number }) {
    const st = useMemo(() => StyleSheet.create({
        profilePic: {
            height: moderateScale(avatarSize),
            width: moderateScale(avatarSize),
            borderRadius: moderateScale(avatarSize),
            backgroundColor: "#fc6392",
            justifyContent: "center",
            alignItems: "center"
        }
    }), [avatarSize])
    return (
        profilePic ? <Image style={st.profilePic} source={{ uri: profilePic }} /> :
            <View style={st.profilePic}>
                <PoppinsText size={18} weight="semibold" className='text-white'>{title.slice(0, 1).toUpperCase()}</PoppinsText>
            </View>
    )
}


export default UserProfileCard