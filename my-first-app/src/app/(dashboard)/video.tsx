
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';



const VIDEO_URL: string = "https://www.pexels.com/download/video/34746339/"


export default function ChatVideoMessage({ videoUrl = VIDEO_URL, isVisible = false }) {
    const player = useVideoPlayer(videoUrl, (player) => {
        player.loop = false; // chat videos usually don’t loop
    });

    // Auto play / pause based on visibility (important for chat performance)
    useEffect(() => {
        if (isVisible) {
            player.play();
        } else {
            player.pause();
        }
    }, [isVisible]);

    const handleToggle = () => {
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    return (
        <TouchableOpacity onPress={handleToggle} activeOpacity={0.9}>
            <View style={styles.container}>
                {!player?.isLoaded && (
                    <ActivityIndicator style={styles.loader} />
                )}

                <VideoView
                    player={player}
                    style={styles.video}
                    contentFit="cover"
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
});

