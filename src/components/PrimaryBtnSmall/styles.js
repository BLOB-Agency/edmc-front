import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        paddingVertical: 6,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 6,
        borderRadius: 30,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.20)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Cereal-Book',
        fontSize: 14,
        // color: '#FFF',
        paddingHorizontal: 6,
        textAlign: 'center',
    },
});

export default styles;