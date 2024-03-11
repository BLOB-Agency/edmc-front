import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, Text, TouchableOpacity, StatusBar} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import styles from "./styles";
import PrimaryButton from "@components/PrimaryBtn";
import SecondaryButton from "@components/SecondaryBtn";
import AppleLogo from "@assets/images/apple_logo_white.png";
import SocialButton from "@components/IconButton";
import Background from "@components/auth/bg"
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import LoadingContainer from "@components/LoadingContainer";
import {userActions} from "@store/userSlice";
import config from "../../../config";
import {useDispatch} from "react-redux";

let user = null;
export default function({navigation}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.setColor("#BB61C9"));
    }, []);
    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
        const goToRegistration = () => {
        navigation.navigate('SignUp');
    }

    const goToLogin = () => {
        navigation.navigate('SignIn');
    }

    useEffect(() => {
        if (!appleAuth.isSupported) return;

        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );
    }, []);

    useEffect(() => {
        if (!appleAuth.isSupported) return;

        return appleAuth.onCredentialRevoked(async () => {
            console.warn('Credential Revoked');
            fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );
        });
    }, []);



    const fetchAndUpdateCredentialState = async () => {
        if (user === null) {
            updateCredentialStateForUser('N/A');
        } else {
            const credentialState = await appleAuth.getCredentialStateForUser(user);
            if (credentialState === appleAuth.State.AUTHORIZED) {
                updateCredentialStateForUser('AUTHORIZED');
            } else {
                updateCredentialStateForUser(credentialState);
            }
        }
    }


    const onAppleButtonPress = async () => {
        console.warn('Beginning Apple Authentication');

        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            
            const {
                user: newUser,
                email,
                nonce,
                identityToken,
                realUserStatus /* etc */,
            } = appleAuthRequestResponse;

            user = newUser;

            fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );

            if (identityToken) {
                // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
                            } else {
                // no token - failed sign-in?
                            }

            if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
                            }

                console.warn(`Apple Authentication Completed, ${user}, ${email}`);
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
                console.warn('User canceled Apple Sign in.');
            } else {
                console.error(error);
            }
        }
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
                    {appleAuth.isSupported && (
                        <SocialButton src={AppleLogo}></SocialButton>
                    )}
                </View>
            </Background>
        </>
    );
};
