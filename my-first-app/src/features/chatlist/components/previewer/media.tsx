import PoppinsText from '@/components/ui/poppins-text';
import { Message } from '@/constants/message-const';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function MediaPreviewer(props: Message) {
    const { media } = props

    if (typeof media === "boolean") return

    if (media.includes("images")) {
        return <ImagesPreview images={props?.images} />
    }
    if (media.includes("videos")) {
        return null
        // <VideoPreview videos={props?.videos} />
    }
    if (media.includes("location")) {
        return <LocationPreview />
    }
    if (media.includes("documents")) {
        return <DocumentPreview />
    }

    return (
        <View>
            <Text>Media</Text>
        </View>
    )
}


function ImagesPreview({ images = [] }: { images?: string | string[] | undefined }) {
    let arr = []

    const isArray = Array.isArray(images);
    if (isArray && images.length > 0) {
        arr = images
    }
    else if (typeof images === "string") {
        arr.push(images);
    } else {
        return null
    }

    return (
        <View className="flex-row w-full ">
            <View style={[styles.mediaContainer]}>
                {arr.map((img, i) => {
                    return <Image
                        key={i}
                        // onError={(e) => { console.log("Images Error ", e) }}
                        src={img || "https://images.pexels.com/photos/30921606/pexels-photo-30921606.png"}
                        style={[styles.media]} />
                })}
            </View>
        </View>
    )
}


function VideoPreview({ videos = [] }: { videos?: string | string[] | undefined }) {
    let arr = []

    const isArray = Array.isArray(videos);
    if (isArray && videos.length > 0) {
        arr = videos
    }
    else if (typeof videos === "string") {
        arr.push(videos);
    } else {
        return null
    }

    const player = useVideoPlayer("https://www.pexels.com/download/video/34746339/", (player) => {
        player.loop = true;
        player.pause();
    });

    // console.log("player", JSON.stringify(player, null, 2))
    return (
        <View>
            <PoppinsText>
                This is Video
            </PoppinsText>
            <VideoView
                style={[styles.media]}
                player={player}
                contentFit="cover"
            />
        </View>
    );
}
function LocationPreview() {
    return (
        <View>
            <Text>LocationPreview</Text>
        </View>
    )
}
function DocumentPreview() {
    return (
        <View>
            <Text>DocumentPreview</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    mediaContainer: {
        width: "100%",
        height: 200,
        borderRadius: 14,
        flex: 1,
    },
    media: {
        flex: 1,
        width: "auto",
        borderRadius: 8,
    },
})