import React from 'react';
import {View, StyleSheet, ImageBackground, Text, TouchableOpacity, StatusBar} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import styles from "./styles";
import PrimaryButton from "@components/PrimaryBtn";
import SecondaryButton from "@components/SecondaryBtn";
import AppleLogo from "@assets/images/apple_logo_white.png";
import SocialButton from "@components/IconButton";
import Background from "@components/auth/bg"

export default function({navigation}) {
    const goToRegistration = () => {
        navigation.navigate('SignUp');
    }

    const goToLogin = () => {
        navigation.navigate('Login');
    }
    return (
        <>
            <StatusBar barStyle="light-content" />
            <Background style={styles.container}>
                <Text style={styles.heroText}>Welcome to EDMC</Text>
                <SecondaryButton onPress={goToLogin} title={"Log In!"}></SecondaryButton>
                <PrimaryButton onPress={goToRegistration} title={"Sign Up!"}></PrimaryButton>

                <Text style={styles.socialText}>Or sign in with</Text>

                <View style={{alignItems: "center"}}>
                    <SocialButton src={AppleLogo}></SocialButton>
                </View>


            </Background>
        </>
);
};
