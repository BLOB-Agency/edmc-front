import {StyleSheet} from "react-native";

const playlistStyles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        gap: 12,
        justifyContent: "space-between",
    },
    image: {
        width: '100%', // '100%
        aspectRatio: 1, // This makes the height equal to the width
        resizeMode: 'cover', // or 'contain', 'stretch', etc.
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

export  {playlistStyles};