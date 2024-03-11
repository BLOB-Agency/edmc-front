import React, { Fragment, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get('window');

const BlobButton = ({ onSubmit }) => {
    const blobSize = useSharedValue(0);
    const blobPositionX = useSharedValue(0);
    const blobPositionY = useSharedValue(0);
    const [isFilled, setIsFilled] = useState(false);
    const color = useSelector((state) => state.user.color || '#BB61C9');
    const buttonRef = useRef();
    const star_drops = useSelector((state) => state.user.star_drops);
    const blobPath = "M443,342Q399,434,314,437Q229,440,163.5,368.5Q98,297,106,205Q114,113,193,78.5Q272,44,354,88Q436,132,443,342Z";

    const blobOrigin = useRef({ x: 0, y: 0 });

    const animatedStyle = useAnimatedStyle(() => {
        const translateX = blobOrigin.current.x - (500 / 2);
        const translateY = blobOrigin.current.y - (500 / 2);

        return {
            transform: [
                { translateX: translateX },
                { translateY: translateY },
                { scale: blobSize.value }
            ],
        };
    });

    const onPressIn = (event) => {
        buttonRef.current.measure((fx, fy, width, height, px, py) => {
            // Calculate the touch point relative to the screen
            const touchX = event.nativeEvent.pageX;
            const touchY = event.nativeEvent.pageY;

            // Set the blob's origin
            blobOrigin.current = { x: touchX, y: touchY };

            // Start the blob animation
            blobSize.value = withTiming(1, { duration: 2000 }, (finished) => {
                if (finished) {
                    // setIsFilled(true);
                }
            });
        });
    };

    const onPressOut = () => {
        blobSize.value = withTiming(0, { duration: 2000 });
        blobPositionX.value = withTiming(0, { duration: 500 });
        blobPositionY.value = withTiming(0, { duration: 500 });
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
            <View ref={buttonRef} style={styles.buttonContainer}>
                {star_drops > 0 && (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: color }]}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={handlePress}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.dropText}>Drop a star</Text>
                        <Image
                            source={require("@assets/icons/star-icon.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}

                {star_drops === 0 && (
                    <View style={[styles.button, {backgroundColor: 'rgba(255, 255, 255, 0.3)'}]}>
                        <Text style={styles.dropText}>No stars available</Text>
                        <Image
                            source={require("@assets/icons/star-icon.png")}
                            style={styles.icon}
                        />
                    </View>
                )}
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropText: {
        color: "white",
        fontSize: 12,
        fontFamily: "Cereal-Medium",
        textTransform: "uppercase",
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    blobContainer: {
        position: 'absolute',
        width: 500, // Width of your original SVG
        height: 500, // Height of your original SVG
        top: 0,
        left: 0,
    },
    button: {
        height: 24,
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
