import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    disabledButton: {
        opacity: 0.5,
    },
    button: {
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