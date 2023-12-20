import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import styles from "./styles";

const PrimaryInput = ({ Icon, errorMessage, label, placeholder, extraStyle}) => {
    return (
        <View style={[styles.container, extraStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, errorMessage ? styles.inputError : null]}>
                {Icon && <Icon style={styles.icon} />}
                <TextInput
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    placeholder={placeholder}
                    style={[styles.input]}
                />
            </View>

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};


export default PrimaryInput;
