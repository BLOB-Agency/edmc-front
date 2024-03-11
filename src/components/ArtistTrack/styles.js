import {StyleSheet} from "react-native";

const trackStyles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 8
    },
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
        paddingVertical: 12,
        paddingHorizontal: 24
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