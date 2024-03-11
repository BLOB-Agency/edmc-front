import ScreenWithNavigationHeader from "@components/navigationHeader"
import {FlatList} from "react-native-gesture-handler";
import {useFetchMyTracksQuery} from "@store/api/music";
import Track from "@components/ArtistTrack";
import {ScrollView, Text, View} from "react-native";
import {useState} from "react";
import PrimaryBtnSmall from "@components/PrimaryBtnSmall";
import styles from './styles'


export default function ({navigation}) {

    const { data: tracks, error, isLoading } = useFetchMyTracksQuery();
    const [sortOption, setSortOption] = useState('mostRecent'); // mostPlays, mostRecent, mostLikes
    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;


    const sortTracks = (tracks, option) => {
        switch (option) {
            case 'mostPlays':
                return [...tracks].sort((a, b) => b.plays - a.plays);
            case 'mostLikes':
                return [...tracks].sort((a, b) => b.likes - a.likes);
            case 'mostRecent':
            default:
                return [...tracks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    };

    const sortedTracks = sortTracks(tracks, sortOption);

    return (
        <ScreenWithNavigationHeader
            title={"My tracks"}
            small={true}
            hasFilters={false}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                <PrimaryBtnSmall
                    title={"Most recent"}
                    active={sortOption === "mostRecent"}
                    style={{marginRight: 12}}
                    onPress={() => setSortOption("mostRecent")}
                />

                <PrimaryBtnSmall
                    title={"Most played"}
                    active={sortOption === "mostPlays"}
                    // active={false}
                    style={{marginRight: 12}}
                    onPress={() => setSortOption("mostPlays")}
                />

                <PrimaryBtnSmall
                    title={"Most liked"}
                    active={sortOption === "mostLiked"}
                    onPress={() => setSortOption("mostLiked")}
                />

            </ScrollView>
            {sortedTracks && sortedTracks.length > 0 ?  (
                sortedTracks.map((track, index) => (
                    <Track
                        key={track.id}
                        track={track}
                        onClick={() => {}}
                        index={index + 1}
                    />
                ))
            ) : (
                <Text>No tracks found</Text>
            )}
        </ScreenWithNavigationHeader>
    )
}