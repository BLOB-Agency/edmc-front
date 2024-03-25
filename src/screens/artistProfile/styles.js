import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E'
    },
    back: {
        position: 'absolute',
        // top: 24,
        left: 24,
    },
    topContainer: {
        // position: "relative",
    },
    contentContainer: {
        position: "relative",
        flex: 1,

        zIndex: 2,
        padding: 24,
    },
    latestTitle: {
        fontFamily: "Cereal-Medium",
        color: "white",
        opacity: 0.5,
        fontSize: 12,
        textTransform: "uppercase",
        marginBottom: 6,
    },
    latestName: {
        fontFamily: "Cereal-Medium",
        color: "white",
        fontSize: 14,
    },
    topTitle: {
        fontFamily: "Cereal-Bold",
        color: "white",
        fontSize: 24,
        marginBottom: 12,
    },
    tracksContainer: {
        marginTop: 24,
    },
    latestDate: {
        fontFamily: "Cereal-Medium",
        color: "white",
        fontSize: 12,
        opacity: 0.5,
    },
    latestImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    latestContainer: {
        padding: 12,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    bottomContainer: {
      padding: 24,
    },

    bgImage: {

        width: '100%',
        aspectRatio: 1,
        display: 'flex',
        flexDirection: "col",
        position: "relative",
        justifyContent: "flex-end"
    },
    artist: {
        fontFamily: "Cereal-Bold",
        color: "white",
        fontSize: 24,
    },
    gradient: {
        // flex: 1,
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})