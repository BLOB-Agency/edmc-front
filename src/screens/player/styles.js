import {Dimensions, StyleSheet} from "react-native";

const screenHeight = Dimensions.get('window').height;

const progressStyles = StyleSheet.create({
    progressBarContainer: {
        height: 9,
        width: '100%',
        backgroundColor: 'rgba(216, 216, 216, 0.3)',
        borderRadius: 9,
        padding: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
});

const styles = StyleSheet.create({
    likeButton: {
        height: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderRadius: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row",
        gap: 6,
        borderColor: 'rgba(255, 255, 255, 0.25)'
    },
    liked: {
        borderColor: "white",
    },
    likeButtons: {
        display: "flex",
        gap: 12,
        flexDirection: "row"
    },
    likeIcon: {
      opacity: .6,
        height: 16,
        width: 16
    },
    likedIcon: {
        opacity: 1,
    },
    likeText: {
        fontFamily: "Cereal-Medium",
        fontSize: 12,
        color: "white",
        opacity: .5
    },
    likedText: {
        opacity: 1,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        zIndex: 2,
    },
    outerContainer: {
        // display: 'flex',
        paddingHorizontal: 24,
        gap: 24,
        flex: 1,
        paddingTop: 12,
        flexDirection: 'column',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 48,
        zIndex: 2,
        gap: 24,
        justifyContent: 'space-between',
    },
    dropContainer: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between"
    },
    container: {
        zIndex: 2,
        marginTop: 48,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingHorizontal: 24,
        // alignItems: 'center',
        height: screenHeight,
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        zIndex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumArt: {
        borderRadius: 8,
        width: '100%',
        aspectRatio: 1,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    title: {
        fontFamily: 'Cereal-Medium',
        fontSize: 22,
        color: 'white',
    },
    artist: {
        fontFamily: 'Cereal-Book',
        opacity: 0.6,
        fontSize: 18,
        color: 'white',
    },
    controls: {
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    controlButton: {
        fontSize: 18,
        color: 'blue',
    },
    albumTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nowPlaying: {
        fontFamily: 'Cereal-Medium',
        fontSize: 14,
        color: 'white',
        opacity: 0.5,
    },
    albumTitle: {
        fontFamily: 'Cereal-Book',
        fontSize: 18,
        color: 'white',
    },
    duration: {
        fontFamily: 'Cereal-Book',
        fontSize: 16,
        color: 'white',
    },
    durationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:6
    },
    infoContainer: {
        zIndex: 2,
        gap: 24,
        marginTop: 24,
    }
});

export const popupStyles = StyleSheet.create({
    blurView: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight,
        zIndex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    content: {
        backgroundColor: 'rgba(57, 57, 57, .84)',
        zIndex: 2,
        width: "100%",
        borderRadius: 8,
        borderColor: "#5f5f5f",
        borderWidth: 1,
    },
    topContent: {
        paddingLeft: 24,
        paddingRight: 14,
        paddingVertical: 12,
        borderColor: "#5f5f5f",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    closeButton: {
        height: 24,
        width: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    closeButtonImage: {
        height: 14,
        width: 14
    },
    title: {
        fontFamily: "Gordita-Medium",
        color: "#fff",
        fontSize: 16,
        marginBottom: 4
    },
    artist: {
        fontFamily: "Cereal-Book",
        color: "white",
        opacity: .5,
        fontSize: 14
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderColor: "#5f5f5f",
        borderBottomWidth: 1,
    },
    optionText: {
        color: "white",
        fontFamily: "Cereal-Medium"
    }
})


export const reportStyles = StyleSheet.create({
    topContainer: {
        flexDirection: "row",
        justifyContent: "center",
        position: "relative"
    },
    title: {
        fontFamily: "Cereal-Medium",
        color: "white",
        fontSize: 20
    },
    description: {
        marginTop: 6,
        marginBottom: 12,
        fontFamily: "Cereal-Book",
        color: "white",
        opacity: .6,
        fontSize: 14,
        width: '100%',
        textAlign: "center"
    },
    reportModalContent : {
        backgroundColor: 'rgba(57, 57, 57, .54)',
        width: "100%",
        borderRadius: 8,
        borderColor: "#5f5f5f",
        borderWidth: 1,
        padding: 24,
        margin: 24,
    },
    closeButton: {
      position: "absolute",
        top: 0,
         right:0
    },

    reportInput : {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 12,
        marginBottom: 16,
        color: '#333',
    },

    reportSubmitButton : {
        backgroundColor: '#1E90FF', // Change to your desired color
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
    },

    reportSubmitButtonText : {
        color: '#fff',
        fontSize: 16,
    },

})

export default styles;
export {progressStyles};