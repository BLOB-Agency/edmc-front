import React, { useState, useEffect, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import styles from "./styles"

const PrimaryBtn = ({ onPress, title, style, textStyle, active = false, disabled = false, children }) => {
    const user = useSelector((state) => state.user);
    const animatedValue = useRef(new Animated.Value(active ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: active ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [active]);

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.07)', user.color || 'rgba(0, 0, 0, 1)']
    });

    const borderColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.20)']
    });

    const textColor = active ? 'white' : user.color;

    const handlePress = () => {
        if (!disabled) {
            onPress && onPress();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
            <Animated.View
                style={[
                    styles.button,
                    style,
                    { backgroundColor, borderColor },
                    disabled && styles.disabledButton
                ]}
            >
                {title && <Text style={[styles.text, textStyle, {color: textColor}]}>{title}</Text>}
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default PrimaryBtn;
