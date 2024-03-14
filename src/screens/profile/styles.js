import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer: {

        flex: 1,

        gap: 24,

    },
    outerContainer: {
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 72,
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#1E1E1E",
    },
    infoContainer: {
        marginTop: 24,
        zIndex: 2,
        gap: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    containerPicture: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    picture: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    username: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "Cereal-Medium",
    },
    containerSettings: {
        gap: 12,
    },
    subtTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Cereal-Medium",
        opacity: 0.6,
    },
    containerOptions: {
    },
    signOutBtn: {
        marginTop: 24,
    },
});

export default styles;