import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderColor: 'rgba(255, 255, 255, 0.22)',
        borderWidth: 1,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Cereal-Medium',
        fontSize: 16,
        color: '#BB61C9',
        letterSpacing: -0.49,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

export default styles;