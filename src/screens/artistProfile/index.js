import {View, Text, Animated} from "react-native";
import {useGetArtistProfileQuery} from "@store/api/artist";
import React from "react";
import {styles} from "./styles";
import FastImage from "react-native-fast-image";
import {LinearGradient} from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function ({route}) {
    const { artistId } = route.params;
    console.log('artistId', artistId)
    const { data: artistProfile, isFetching, error } = useGetArtistProfileQuery(artistId);
    const insets = useSafeAreaInsets();
        console.log('artistProfile', artistProfile)

    if (isFetching) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching profile</Text>;

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                // onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <FastImage
                    source={{
                        uri: artistProfile.profile_cover[0].url,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={[styles.bgImage, {paddingTop: insets.top}]}
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.00)', '#000000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        locations={[0.28, 1]}
                        style={styles.gradient}
                    />

                    <Text style={styles.artist}>{artistProfile.username}</Text>
                </FastImage>
            </Animated.ScrollView>
        </View>
    )
}