import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { BlurView } from 'expo-blur';
import styles from "./styles";

const SecondaryBtn = ({ onPress, title, style, textStyle }) => {
    const user = useSelector((state) => state.user);
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <BlurView
                style={styles.blurView}
                tint="light"
                intensity={20}
            >

            </BlurView>
            <Text style={[styles.text, textStyle, {color: user.color}]}>{title}</Text>
        </TouchableOpacity>
    );
};



export default SecondaryBtn;
