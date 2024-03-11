import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: "center"
    },
    blur: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'absolute',
        zIndex: 4
    },
    topContainer: {

    },
    icon: {
        height: 16,
        width: 16
    },
    contentContainer: {
        marginHorizontal: 24,
        position: "relative",
        zIndex: 2,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(57, 57, 57, 0.8)',
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        gap: 24,
        padding: 24,
    },
    inputContainer: {
        display: "flex",
        gap: 12
    },


    titleContainer: {
        display: "flex",
        gap: 6,
        alignItems: "center"
    },
    title: {
        fontFamily: "Cereal-Medium",
        color: 'white',
        fontSize: 24
    },
    subtitle: {
        fontFamily: "Gordita-Medium",
        color: 'white',
        paddingHorizontal: 12,
        textAlign: "center",
        opacity: .6,
        fontSize: 14
    }
})