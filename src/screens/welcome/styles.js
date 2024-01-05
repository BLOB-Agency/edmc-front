import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        gap: 24,
        padding: 24,
        justifyContent: 'flex-end',
    },
    heroText: {
        fontFamily: 'Cereal-Medium',
        fontSize: 36,
        color: '#FFFFFF',
        letterSpacing: -1.1,
        lineHeight: 44,
    },
    socialText: {
        opacity: 0.35,
        fontFamily: 'Cereal-Book',
        fontSize: 14,
        color: '#FFFFFF',
        letterSpacing: -0.37,
        textTransform: 'uppercase',
        textAlign: 'center',
    }
});

export default styles;