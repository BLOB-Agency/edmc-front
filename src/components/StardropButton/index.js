import React, {Fragment, useState} from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {useSelector} from "react-redux";

const { width, height } = Dimensions.get('window');

const BlobButton = ({ onSubmit }) => {
    const blobSize = useSharedValue(0);
    const [isFilled, setIsFilled] = useState(false);
    const color = useSelector((state) => state.user.color || '#BB61C9');

    // Define the SVG Path for your blob here. This is a sample path.
    const blobPath = "M443,342Q399,434,314,437Q229,440,163.5,368.5Q98,297,106,205Q114,113,193,78.5Q272,44,354,88Q436,132,443,342Z";

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: blobSize.value }],
        };
    });

    const onPressIn = () => {
        blobSize.value = withTiming(1, { duration: 2000 }, (finished) => {
            if (finished) {
                setIsFilled(true);
            }
        });
    };

    const onPressOut = () => {
        blobSize.value = withTiming(0, { duration: 2000 });
        setIsFilled(false);
    };

    const handlePress = () => {
        if (isFilled) {
            onSubmit();
        }
    };

    return (
        <Fragment>
            <Animated.View style={[styles.blobContainer, animatedStyle]}>
                <Svg height="100%" width="100%" viewBox="0 0 500 500">
                    <Path d={blobPath} fill="blue" />
                </Svg>
            </Animated.View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: color }]}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={handlePress}
            >
                <Text style={styles.dropText}>Drop a star</Text>

                <Image
                    source={require("@assets/icons/star-icon.png")}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    dropText: {
        color: "white",
        fontSize: 12,
        fontFamily: "Cereal-Medium",
        textTransform: "uppercase",
    },
    container: {


    },
    blobContainer: {
        position: 'absolute',
        width: 500, // Width of your original SVG
        height: 500, // Height of your original SVG
    },
    button: {
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        zIndex: 1,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    icon: {
        height: 12,
        width: 12,
    }
});

export default BlobButton;
