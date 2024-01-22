import {Dimensions, StyleSheet} from "react-native";

const screenHeight = Dimensions.get('window').height;

const progressStyles = StyleSheet.create({
    progressBarContainer: {
        height: 9,
        width: '100%',
        backgroundColor: 'rgba(216, 216, 216, 0.3)',
        borderRadius: 9,
        padding: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
});

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        zIndex: 2,
    },
    outerContainer: {
        // display: 'flex',
        flex: 1,
        paddingTop: 12,
        flexDirection: 'column',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 24,
        height: 48,
        zIndex: 2,
        justifyContent: 'space-between',
    },
    container: {
        zIndex: 2,
        marginTop: 48,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingHorizontal: 24,
        // alignItems: 'center',
        height: screenHeight,
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        zIndex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumArt: {
        borderRadius: 8,
        width: '100%',
        aspectRatio: 1,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    title: {
        fontFamily: 'Cereal-Medium',
        fontSize: 22,
        color: 'white',
    },
    artist: {
        fontFamily: 'Cereal-Book',
        opacity: 0.6,
        fontSize: 18,
        color: 'white',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    controlButton: {
        fontSize: 18,
        color: 'blue',
    },
    albumTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nowPlaying: {
        fontFamily: 'Cereal-Medium',
        fontSize: 14,
        color: 'white',
        opacity: 0.5,
    },
    albumTitle: {
        fontFamily: 'Cereal-Book',
        fontSize: 18,
        color: 'white',
    },
    duration: {
        fontFamily: 'Cereal-Book',
        fontSize: 16,
        color: 'white',
    },
    durationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:6
    }
});

export default styles;
export {progressStyles};