import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    backButton: {
        height: 24,
        width: 24,
        left: 12,
        position: 'absolute',
    },
    backIcon: {
        height: 16,
        width: 16,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Cereal-Medium',
        color: '#FFFFFF',
        width: '100%',
        textAlign: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 72
    },
    contentContainer: {
        marginLeft: -12
    },
    albumCoverContainer: {
        backgroundColor: 'blue',
        paddingLeft: 12,
        marginBottom: 72, // Maintain a 12px vertical gap
    },
})

export default styles;