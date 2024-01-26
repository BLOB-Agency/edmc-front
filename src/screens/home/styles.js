import { StyleSheet } from 'react-native';

const topListStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: 160,
        height: 200,
        padding: 12,
        justifyContent: "space-between",
    },
    bgOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: 8,
    },
    topTextContainer: {
        flex: 1,
        justifyContent: "flex-startr",
        alignItems: "flex-end",
    },
    topText: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "right",
        fontFamily: "Cereal-Bold",
    },
    bottomTextContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
    bottomText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Cereal-Medium",
    },
    bottomSubText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Cereal-Book",
        opacity: 0.6,
    },
});

const playlistStyles = StyleSheet.create({
    container: {
        width: 120,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        justifyContent: "space-between",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    textContainer: {
    },
    title: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Cereal-Medium",
    },
    subtitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Cereal-Book",
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        paddingTop: 24,
        paddingBottom: 72,
        justifyContent: "space-between",
        backgroundColor: "#1E1E1E",
    },
    scrollViewContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        gap: 12,
    },
    topSongsTitle: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "Cereal-Bold",
        marginLeft: 24,
    },
    playlistTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Cereal-Bold",
        marginLeft: 24,
    },
    playlistContainer: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 24,
    }
});

export { topListStyles, playlistStyles, styles };