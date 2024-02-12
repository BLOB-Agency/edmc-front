import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12
    },
    outerControls: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    gradient: {
        flex: 1,
        borderRadius: 8,
        borderWidth: .8,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    player: {
        left: 24,
        position: 'absolute',
        borderRadius: 8,
        overflow: 'hidden',
        // backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableArea: {
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        display: 'flex',
        padding: 12,
        gap: 12,
        // paddingVertical:18,
        flexDirection: 'row',
    },
    albumArt: {
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 4,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
    },
    songTitle: {
        fontSize: 17,
        color: 'white',
        fontFamily: 'Cereal-Medium',
    },
    artist: {
        fontFamily: 'Cereal-Book',
        color: 'white',
        opacity: 0.6,
        fontSize: 14,
    },
});

export default styles;