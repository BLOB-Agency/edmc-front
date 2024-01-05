import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import styles from "./styles";

const Button = ({ onPress, style, src }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <BlurView style={styles.blurView} tint="light" intensity={20} />

            {src && <Image source={src} style={styles.icon} />}
        </TouchableOpacity>
    );
};

export default Button;
