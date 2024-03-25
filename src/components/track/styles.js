import {StyleSheet} from "react-native";

const trackStyles = StyleSheet.create({
    moreIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 12
    },
    image: {
        marginTop: 12,
        width: 48,
        height: 48,
        borderRadius: 5,
    },
    index: {
        textAlign: "center",
        width: 25,
        fontFamily: "Cereal-Bold",
        color: 'white',
        fontSize: 20,
        opacity: .6
    },
    title: {
        fontFamily: "Cereal-Medium",
        fontSize: 16,
        color: 'white'
    },
    artists: {
        fontFamily: "Cereal-Book",
        fontSize: 14,
        color: "white"
    },
    leftContainer: {
        display: "flex",
        gap: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'white',
        opacity: .1
    },
    outerContainer: {

    }
})

export {trackStyles}