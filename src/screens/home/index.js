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
    const { songs, loading, errors } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchHomeData());
    }, [dispatch]);

    const handlePlay = async (song) => {
        console.log('song', song)

        const track = {
            url: song.media[0].url,
            title: song.title,
            artist: song.artists[0].name,
            artwork: song.cover_image[0].url,
            duration: song.duration,
        }

        await TrackPlayer.add([track]);
        await TrackPlayer.play();

        navigation.navigate('MusicPlayer', {song});
    }

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (errors.length > 0) {
        // Render error message
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
                        {songs.map((song, index) => (
                            <Playlist onPress={() => handlePlay(song)} key={index} title={song.title} subtitle={"Tiofneoifn"} bg={song.cover_image[0].url} />
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