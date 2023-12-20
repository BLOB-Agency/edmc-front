import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: '#BB61C9',
        opacity: 0.5,
    },
    button: {
        backgroundColor: '#BB61C9',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        fontFamily: 'Cereal-Medium',
        fontSize: 16,
        color: '#FFF',
        letterSpacing: -0.49,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

export default styles;