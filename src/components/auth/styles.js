import {StyleSheet} from "react-native";

const authStyles = StyleSheet.create({
    title: {
        fontFamily: 'Cereal-Medium',
        fontSize: 36,
        color: '#FFFFFF',
        letterSpacing: -1.1,
        lineHeight: 44,
    },
    subtitle: {
        opacity: 0.58,
        fontFamily: 'Gordita-Medium',
        fontSize: 16,
        color: '#FFFFFF',
    },
});

const genericStyles = StyleSheet.create({
    bodyText: {
        color: "#fff",
        fontFamily: "Cereal-Book",
        fontSize: 16,
    },
    errorText: {
        color: "#ff0033",
        fontFamily: "Gordita-Medium",
        fontSize: 14,

    },
});


export {authStyles, genericStyles};