import PoppinsText from '@/components/ui/poppins-text'
import { router } from 'expo-router'
import { MousePointer, Rows4 } from 'lucide-react-native'
import React from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'

export default function DashboardHome() {

    const cards = [
        { id: 1, title: "Chat List", Icon: Rows4, link: "/chatlist" },
        { id: 1, title: "John doe", Icon: Rows4, link: "/john-doe" },
        { id: 2, title: "Focused Button", Icon: MousePointer, link: "/focused-button" },
        { id: 3, title: "Animated Tabs", Icon: MousePointer, link: "/animated-tabs" },
        { id: 4, title: "Expandable model", Icon: MousePointer, link: "/expandable-model" },
        { id: 5, title: "Test", Icon: MousePointer, link: "/test" },
        // { id: 6, title: "Shared Layout", Icon: MousePointer, link: "/shared-layout" },
    ]


    return (
        <View>
            <FlatList ListHeaderComponent={<View className='bg-white  py-2 px-2'>
                <PoppinsText size={24} className='font-bebas tracking-widest mt-2'>Components List</PoppinsText>
            </View>}
                numColumns={2}
                data={cards}
                renderItem={({ item, index }) => {
                    return <Card title={item.title} Icon={item.Icon} link={item.link} />
                }}
            />
        </View>
    )
}


function Card({ title, Icon, link }: { title: string, Icon: any, link: string }) {
    return (
        <Pressable
            onPress={() => router.push(link as any)}
            style={styles.card}
        >
            <Icon pointerEvents="none" />
            <PoppinsText size={16} weight='light' className='font-bebas font-light mt-2'>{title}</PoppinsText>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        gap: 2,
        marginHorizontal: 4,
        marginVertical: 4,
    }
})