import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E'
    },
    bgImage: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        width: '100%',
        aspectRatio: 1,
        display: 'flex',
        flexDirection: "col",

        justifyContent: "flex-end"
    },
    artist: {
        fontFamily: "Cereal-Bold",
        color: "white",
        fontSize: 24,
    },
    gradient: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})