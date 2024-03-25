import {View, Text, Animated} from "react-native";
import {useGetArtistProfileQuery} from "@store/api/artist";
import React from "react";
import {styles} from "./styles";
import FastImage from "react-native-fast-image";
import {LinearGradient} from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {playlistStyles} from "@screens/home/styles";
import Track from "@components/track";
import ReturnBtn from "@components/ReturnBtn";
import {playSingleTrack} from "@utils/helpers";
import useTrackEvent, {TrackableEvents} from "@utils/hooks/useTrackEvent";
import {useMusicPlayer} from "@context/MusicPlayerContext";

export default function ({route, navigation}) {
    const { artistId } = route.params;
    const { data: artistProfile, isFetching, error } = useGetArtistProfileQuery(artistId);
    const trackEvent = useTrackEvent();
    const insets = useSafeAreaInsets();
    const {setCurrentSong} = useMusicPlayer();
    if (isFetching) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching profile</Text>;
    const playOne = async (song) => {
        await playSingleTrack(song)

        trackEvent(TrackableEvents.Music.Play, {
            track_id: song.id,
        });
        setCurrentSong(song);

    }

    console.log('artistProfile', artistProfile)
    return (
        <View style={styles.container}>
            <Animated.ScrollView
                // onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 96 + insets.bottom}}
            >
                <View style={styles.topContainer}>
                    {
                        artistProfile.profile_photo[0]?.url ?
                            <FastImage
                                source={{
                                    uri: artistProfile.profile_photo[0].url,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                                style={[styles.bgImage, {paddingTop: insets.top}]}
                            />
                                :
                            <View style={[styles.bgImage, {paddingTop: insets.top, backgroundColor: 'grey'}]}/>

                    }
                    <LinearGradient
                        colors={['rgba(0,0,0,0.00)', '#000000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        locations={[0.28, 1]}
                        style={styles.gradient}
                    />
               <View style={styles.contentContainer}>


                   <Text style={styles.artist}>{artistProfile.username}</Text>
               </View>
                    <ReturnBtn style={[styles.back, {
                        top: insets.top,
                    }]}
                    method={() => navigation.goBack()}
                    ></ReturnBtn>
                </View>

                <View style={styles.bottomContainer}>
                    { artistProfile.latest && (
                        <View style={styles.latestContainer}>
                         <View>
                             <Text style={styles.latestTitle}>Latest release</Text>
                             <Text style={styles.latestName}>{artistProfile.latest.title}</Text>
                             <Text style={styles.latestDate}>{artistProfile.latest.album[0].release_date}</Text>
                         </View>

                            <FastImage
                                style={styles.latestImage}
                                source={{
                                    uri: artistProfile.latest.album[0].cover_image[0].url,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    )}

                    <View style={styles.tracksContainer}>
                        <Text style={styles.topTitle}>Top tracks</Text>
                        <View style={playlistStyles.scrollViewContainer}>
                            {artistProfile.songs.map((track, index) => (
                                <Track onClick={() => playOne(track)} track={track} key={index} image={true}></Track>
                            ))}
                        </View>
                    </View>
                </View>


            </Animated.ScrollView>
        </View>
    )
}