import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',

    },
    headerTitle: {
        fontFamily: 'Cereal-Medium',
        fontSize: 24,
        color: '#FFFFFF',
        letterSpacing: -0.73,
    },
    headerTitleLarge: {
        fontFamily: 'Cereal-Bold',
        fontSize: 36,
        color: '#FFFFFF',
        letterSpacing: -1.1,
    },
});


export default styles;