import {View, Text, TouchableOpacity, Image, Animated, Dimensions} from "react-native";
import FastImage from "react-native-fast-image";
import styles, {trackStyles} from "./styles";
import ReturnBtn from "@components/ReturnBtn";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import IconButton from "@components/IconButton";
import {formatNamesWithAnd, getTotalDurationInMinutes, playSingleTrack} from "@utils/helpers";
import {LinearGradient} from "expo-linear-gradient";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchSongsForAlbum} from "@store/albumsSlice";
import TrackPlayer from "react-native-track-player";
import useTrackEvent, {TrackableEvents} from "@utils/hooks/useTrackEvent";
import Track from "@components/track";


export const Album = ({navigation, route}) => {
    const { album } = route.params;
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const songs = useSelector(state => state.albums.albums[album.id]?.songs || []);
    const trackEvent = useTrackEvent();
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const scrollY = new Animated.Value(0);

    useEffect(() => {
        dispatch(fetchSongsForAlbum(album.id));
    }, [dispatch, album, songs]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            listener: event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsTitleVisible(offsetY > Dimensions.get('window').width);
            },
            useNativeDriver: true,
        },
    );

    const textOpacity = scrollY.interpolate({
        inputRange: [0,  Dimensions.get('window').width],
        outputRange: [0,  1],
        extrapolate: 'clamp',
    });


    const playOne = async (song) => {
        await playSingleTrack(song)

        trackEvent(TrackableEvents.Music.Play, {
            track_id: song.id,
        });


    }

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <FastImage
                    source={{
                        uri: album.cover_image[0].url,
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

                    <View style={styles.bottomImageContainer}>
                        <View>
                            <Text style={styles.artistTitle}>{formatNamesWithAnd(album.artists)}</Text>
                            <Text style={styles.albumTitle}>{album.name}</Text>
                            <Text style={styles.releaseYear}>{album.release_date}</Text>
                        </View>

                        <View style={styles.bottomIconContainer}>
                            <IconButton
                                src={require("@assets/icons/play-icon-outline.png")}
                            />

                            {/*<IconButton*/}
                            {/*    src={require("@assets/icons/shuffle-icon.png")}*/}
                            {/*/>*/}
                        </View>
                    </View>

                </FastImage>

                <View style={styles.trackContainer}>
                    {songs.map((track, index) => (
                        <Track onClick={() => playOne(track)} track={track} index={index+1} last={index === songs.length - 1} />
                    ))}
                </View>

                <Text style={styles.bottomText}>
                    {songs.length} songs · {getTotalDurationInMinutes(songs)} minutes
                </Text>
            </Animated.ScrollView>

            <View style={[styles.topButtonContainer, {paddingTop: insets.top}]}>

                <ReturnBtn></ReturnBtn>
                {isTitleVisible && (
                    <Animated.Text style={[styles.albumTitleSmall, { opacity: textOpacity }]}>
                        {album.name}
                    </Animated.Text>
                )}
                <IconButton
                    src={require("@assets/icons/more-icon.png")}
                />
            </View>

        </View>
    )
}