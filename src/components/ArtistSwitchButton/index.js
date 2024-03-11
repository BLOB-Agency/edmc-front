import React, { Fragment, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get('window');

const BlobButton = ({ onSubmit }) => {
    const color = useSelector((state) => state.user.color || '#BB61C9');
    const artistProfile = useSelector((state) => state.user.artist_profile || null);
    const isArtistMode = useSelector((state) => state.user.isArtistMode || false);
            return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: color }]}
                onPress={onSubmit}
                activeOpacity={0.9}
            >
                {artistProfile ? (
                    isArtistMode ? (
                        <Text style={styles.dropText}>Switch to listener</Text>
                    ) : (
                        <Text style={styles.dropText}>Switch to artist</Text>
                    )
                ) : (
                    <Text style={styles.dropText}>Sign up as an artist</Text>
                )}
            </TouchableOpacity>
        </View>
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
        paddingHorizontal: 12,
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
