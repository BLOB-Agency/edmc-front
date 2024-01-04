import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        fontFamily: 'Cereal-Medium',
        fontSize: 16,
        letterSpacing: -0.49,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 30,
        overflow: 'hidden',
    },

});

export default styles;