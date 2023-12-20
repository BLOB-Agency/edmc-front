import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import styles from "./styles";

const SecondaryBtn = ({ onPress, title, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <BlurView
                style={styles.blurView}
                tint="light"
                intensity={20}
            >

            </BlurView>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};



export default SecondaryBtn;
