import {Animated, TouchableWithoutFeedback, View} from "react-native";
import {progressStyles} from "@screens/player/styles";
import {useEffect, useRef} from "react";

export const ProgressBar = ({ position, duration, onSeek, color = "white" }) => {
    // Using Animated.Value to represent the progress
    const widthAnim = useRef(new Animated.Value(0)).current;

    // Calculate the progress percentage
    const progress = (position / duration) * 100;

    useEffect(() => {
        // Animate the width change
        Animated.timing(widthAnim, {
            toValue: progress,
            duration: 250, // You can adjust the duration
            useNativeDriver: false, // Set to true if you are not animating properties that need layout calculation
        }).start();
    }, [position, progress, widthAnim]);

    const handleSeek = (evt) => {
        // Calculate the seek position
        const seekPosition = (evt.nativeEvent.locationX / evt.currentTarget.offsetWidth) * duration;
        onSeek(seekPosition);
    };


    return (
        <TouchableWithoutFeedback onPress={handleSeek}>
            <View style={progressStyles.progressBarContainer}>
                <Animated.View style={[progressStyles.progressBar, {
                    width: widthAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%']
                    }),
                    backgroundColor: color
                }]} />
            </View>
        </TouchableWithoutFeedback>
    );
};

