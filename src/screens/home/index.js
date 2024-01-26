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
import TrackPlayer from 'react-native-track-player';
import {useCurrentSong} from "@context/CurrentSongContext";
import {usePlayerEventEmitter} from "@utils/emitters";
import {formatNamesWithAnd, playSingleTrack} from "@utils/helpers";

const TopPlaylist = ({tag, title, subtitle, bg}) => {
    const tagWords = tag.split(' ');

    return (
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
    )
}

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
    const { recentAlbums, songs, loading, errors } = useSelector((state) => state.home);
    const {setCurrentSong} = useCurrentSong();
    const playerEventEmitter = usePlayerEventEmitter();
    useEffect(() => {
        dispatch(fetchHomeData());
    }, [dispatch]);

    useEffect(() => {
        console.log(recentAlbums, 'recentAlbums')
    }, [recentAlbums]);

    const handlePlay = async (song) => {
         await playSingleTrack(song)
        setCurrentSong(song);
    }

    const navigateToAlbum = (album) => {
        navigation.navigate('AlbumScreen', { album });
    }

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (errors && errors.length > 0) {
        return <Text>Error fetching songs</Text>;
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
                        <TopPlaylist
                            title={"Weekly Top"}
                            subtitle={"Top songs this week"}
                            tag={"EDMC 10"}
                            bg={require("@assets/images/topplaylisttestbg.png")}
                        />

                        <TopPlaylist
                            title={"Weekly Top"}
                            subtitle={"Top songs this week"}
                            tag={"EDMC 10"}
                            bg={require("@assets/images/topplaylisttestbg.png")}
                        />

                        <TopPlaylist
                            title={"Weekly Top"}
                            subtitle={"Top songs this week"}
                            tag={"EDMC 10"}
                            bg={require("@assets/images/topplaylisttestbg.png")}
                        />
                    </ScrollView>
                </View>

                <View style={{...styles.playlistContainer, gap: 12}}>
                    <Text style={styles.playlistTitle}>Latest Releases</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContainer}
                    >
                        {recentAlbums.map((album, index) => (
                            // <Text>{JSON.stringify(album.cover_image[0].url)}</Text>
                            <Playlist onPress={() => navigateToAlbum(album)} key={index} title={album.name} subtitle={formatNamesWithAnd(album.artists)} bg={album.cover_image[0].url} />
                        ))}
                    </ScrollView>
                </View>

                <View style={{...styles.playlistContainer, gap: 12}}>
                    <Text style={styles.playlistTitle}>Latest Releases</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContainer}
                    >
                        {songs.map((song, index) => (
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