import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 160,
        height: 200,
        padding: 12,
        justifyContent: "space-between",
        borderRadius: 8,
        overflow: "hidden",
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


export default styles;