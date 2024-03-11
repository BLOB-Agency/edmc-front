import ScreenWithNavigationHeader from "@components/navigationHeader";
import {
    ImageBackground,
    ScrollView,
    Image,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import {playlistStyles, styles, topListStyles} from "@screens/home/styles";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchHomeData} from "@store/homeSlice";
import FastImage from "react-native-fast-image";
import {usePlayerEventEmitter} from "@utils/emitters";
import {formatNamesWithAnd, playSingleTrack} from "@utils/helpers";
import {useMusicPlayer} from "@context/MusicPlayerContext";
import {useFetchFeaturedPlaylistsQuery, useFetchHomeDataQuery, useFetchRecentAlbumsQuery} from "@store/api/music";
import useTrackEvent, {TrackableEvents} from "@utils/hooks/useTrackEvent";

const TopPlaylist = ({ tag, title, subtitle, bg, onClick }) => {
    const tagWords = tag.split(' ');

    return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.7}>
            <ImageBackground
                style={topListStyles.container}
                source={bg}
            >
                <View style={topListStyles.bgOverlay} />
                <View style={topListStyles.topTextContainer}>
                    {tagWords.map((word, index) => (
                        <Text key={index} style={topListStyles.topText}>
                            {word}
                        </Text>
                    ))}
                </View>

                <View style={topListStyles.bottomTextContainer}>
                    <Text style={topListStyles.bottomText}>
                        {title}
                    </Text>
                    <Text style={topListStyles.bottomSubText}>
                        {subtitle}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const Playlist = ({title, subtitle, bg, onPress}) => {
    return (
        <TouchableOpacity style={playlistStyles.container} onPress={onPress}>
            <FastImage
                style={playlistStyles.image}
                source={{
                    uri: bg,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            <View style={playlistStyles.textContainer}>
                <Text style={playlistStyles.title}>{title}</Text>
                {subtitle && <Text style={playlistStyles.subtitle}>{subtitle}</Text>}
            </View>
        </TouchableOpacity>

    )

}

export default function ({navigation}) {
    const dispatch = useDispatch();
    const trackEvent = useTrackEvent();
    // const { recentAlbums, songs, loading, errors } = useSelector((state) => state.home);
    const {setCurrentSong} = useMusicPlayer();
    const playerEventEmitter = usePlayerEventEmitter();

    const { data: homeData, isLoading: isLoadingHomeData } = useFetchHomeDataQuery();
    const { data: recentAlbums } = useFetchRecentAlbumsQuery();
    const { data: featuredPlaylists } = useFetchFeaturedPlaylistsQuery();
    // useEffect(() => {
    //     dispatch(fetchHomeData());
    // }, [dispatch]);

    useEffect(() => {
            }, [recentAlbums]);


    const handlePlay = async (song) => {
         await playSingleTrack(song)
        trackEvent(TrackableEvents.Music.Play, {
            track_id: song.id,
        });

        setCurrentSong(song);
    }

    const navigateToAlbum = (album) => {
        navigation.navigate('AlbumScreen', { album });
    }

    if (isLoadingHomeData) {
        return <ActivityIndicator size="large" />;
    }

    // if (errors && errors.length > 0) {
    //     return <Text>Error fetching songs</Text>;
    // }

        const navigateToPlaylist = (playlistId) => {
        navigation.navigate('PlaylistScreen', { playlistId });
    }


    return (
        <ScreenWithNavigationHeader title={"Explore"}>
            <View style={styles.container}>
                <View style={styles.playlistContainer}>
                    <Text style={styles.topSongsTitle}>Top tracks</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContainer}
                    >
                        {(featuredPlaylists || []).map((playlist, index) => (
                            <TopPlaylist
                                key={index}
                                title={playlist.name}
                                subtitle={playlist.description}
                                tag={playlist.tag}
                                onClick={() => navigateToPlaylist(playlist.id)}
                                bg={{uri: playlist.cover_image[0].url}}
                            />
                        ))}


                    </ScrollView>
                </View>

                {/*<View style={{...styles.playlistContainer, gap: 12}}>*/}
                {/*    <Text style={styles.playlistTitle}>Latest Releases</Text>*/}
                {/*    <ScrollView*/}
                {/*        horizontal={true}*/}
                {/*        showsHorizontalScrollIndicator={false}*/}
                {/*        contentContainerStyle={styles.scrollViewContainer}*/}
                {/*    >*/}
                {/*        {recentAlbums.map((album, index) => (*/}
                {/*            // <Text>{JSON.stringify(album.cover_image[0].url)}</Text>*/}
                {/*            <Playlist onPress={() => navigateToAlbum(album)} key={index} title={album.name} subtitle={formatNamesWithAnd(album.artists)} bg={album.cover_image[0].url} />*/}
                {/*        ))}*/}
                {/*    </ScrollView>*/}
                {/*</View>*/}

                <View style={{...styles.playlistContainer, gap: 12}}>
                    <Text style={styles.playlistTitle}>Latest Releases</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContainer}
                    >
                        {homeData.songs.map((song, index) => (
                            // <Text>{JSON.stringify(song.album.cover_image[0].url)}</Text>
                            <Playlist onPress={() => handlePlay(song)} key={index} title={song.title} subtitle={formatNamesWithAnd(song.artists)} bg={song.album[0].cover_image[0].url} />
                        ))}
                    </ScrollView>
                </View>

                {/*<View style={{...styles.playlistContainer, gap: 12}}>*/}
                {/*    <Text style={styles.playlistTitle}>New Artists</Text>*/}
                {/*    <ScrollView*/}
                {/*        horizontal={true}*/}
                {/*        showsHorizontalScrollIndicator={false}*/}
                {/*        contentContainerStyle={styles.scrollViewContainer}*/}
                {/*    >*/}
                {/*        <Playlist title={"Voyage"} bg={require("@assets/images/albumarttest.png")}/>*/}
                {/*        <Playlist title={"Voyage"} bg={require("@assets/images/albumarttest.png")}/>*/}
                {/*        <Playlist title={"Voyage"} bg={require("@assets/images/albumarttest.png")}/>*/}
                {/*        <Playlist title={"Voyage"} bg={require("@assets/images/albumarttest.png")}/>*/}
                {/*        <Playlist title={"Voyage"} bg={require("@assets/images/albumarttest.png")}/>*/}
                {/*        <Playlist title={"Voyage"} bg={require("@assets/images/albumarttest.png")}/>*/}
                {/*    </ScrollView>*/}
                {/*</View>*/}
                <View style={{height: 48, width: 1}}/>
            </View>
        </ScreenWithNavigationHeader>
    )
}