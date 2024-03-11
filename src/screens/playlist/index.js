import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import ScreenWithNavigationHeader from '@components/navigationHeader';
import { useFetchPlaylistQuery } from '@store/api/music';
import AlbumCover from '@components/AlbumCover';
import {formatNamesWithAnd, playMultipleTracks} from '@utils/helpers';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GridView from 'react-native-super-grid';
import styles from './styles'

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth / 3) - 24

export default function Playlist({ route, navigation }) {
    const { playlistId } = route.params;
    const { data: playlist, error, isLoading } = useFetchPlaylistQuery(playlistId);

    
    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;


    const goBack = () => navigation.goBack();

    const handlePress = (index) => {
        const selectedAndFollowingSongs = playlist.songs.slice(index);

        playMultipleTracks(selectedAndFollowingSongs)
    }

    return (

        <ScreenWithNavigationHeader  xsmall={true} title={playlist.name} onBack={goBack} useScrollView={true}>
           <View style={styles.grid}>
               {playlist.songs.map((song, index) => (
                   <AlbumCover
                       key={index}
                       onPress={() => handlePress(index)}
                       containerStyles={{width: itemWidth, marginBottom: 12}}
                       title={song.title}
                       bg={ song.album[0].cover_image[0].url}
                       subtitle={formatNamesWithAnd(song.artists)}
                   />
               ))}
           </View>
        </ScreenWithNavigationHeader>
    );
}
