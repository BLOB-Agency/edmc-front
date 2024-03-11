import {View, Text, Dimensions} from "react-native";
import ScreenWithNavigationHeader from "@components/navigationHeader";
import {useFetchPublicPlaylistsQuery} from "@store/api/music";
import Playlist from "@components/playlist";
import styles from './styles'
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Charts({ navigation }) {
    const insets = useSafeAreaInsets();
    const {data: chartsData, loading: chartsLoading, error: chartsError} = useFetchPublicPlaylistsQuery();

    if (chartsLoading) return <Text>Loading...</Text>;
    if (chartsError) return <Text>Error: {chartsError.message}</Text>;
    const navigateToPlaylist = (playlistId) => {
        navigation.navigate('PlaylistScreen', { playlistId });
    }
    return (
        <ScreenWithNavigationHeader title={"Charts"} small={true}>
            <View style={[styles.container, {paddingBottom: 72}]}>
                {chartsData && chartsData.map((chart, index) => (
                    <Playlist
                        onClick={() => navigateToPlaylist(chart.id)}
                        style={{marginBottom: 12}}
                        key={index}
                        tag={chart.tag}
                        title={chart.name}
                        subtitle={chart.description}
                        bg={{uri: chart.cover_image[0].url}}
                    />
                ))}
            </View>
        </ScreenWithNavigationHeader>
    );
}