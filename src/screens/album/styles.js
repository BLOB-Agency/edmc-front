import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E'
    },
    gradient: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bottomText: {
        fontFamily: "Cereal-Book",
        color: "white",
        width: '100%',
        textAlign: "center"
    },
    trackContainer: {
        display: "flex",
        gap: 24,
        padding: 24
    },
    bottomIconContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 24
    },
    bottomImageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
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
    topButtonContainer: {
        position: "absolute",
        width: '100%',
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    artistTitle: {
        fontFamily: "Cereal-Medium",
        color: "white",
        fontSize: 16
    },
    albumTitle: {
        fontFamily: "Cereal-Bold",
        color: "white",
        fontSize: 18
    },
    albumTitleSmall: {
        fontFamily: "Cereal-Medium",
        color: "white",
        fontSize: 16
    },
    releaseYear: {
        fontFamily: 'Cereal-Book',
        color: "white",
        fontSize: 14,
        opacity: .6
    }
});

export default styles