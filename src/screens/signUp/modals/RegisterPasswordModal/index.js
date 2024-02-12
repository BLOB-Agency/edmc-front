import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ImageBackground, Text, View } from "react-native";

import { registrationActions } from "@store/registrationSlice";
import { authActions } from "@store/authSlice";
import { userActions } from "@store/userSlice";

import PrimaryInput from "@components/PrimaryInput";
import SecondaryBtn from "@components/SecondaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import Background from "@components/auth/bg";
import { authStyles, genericStyles } from "@components/auth/styles";
import styles from "./styles";
import TokenService from "@utils/tokenService";
import PrimaryBtn from "@components/PrimaryBtn";

const passwordIcon = require("@assets/icons/lock-icon.png");
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
export const PASSWORD_ERROR = "Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric digit, and 1 special character.";
export const CONFIRM_PASSWORD_ERROR = "The passwords do not match.";

const RegisterPasswordModal = ({ goNext, navigation, goPrevious, goToModal }) => {
    const [state, setState] = useState({
        password: "",
        confirmPassword: "",
        passwordError: false,
        confirmPasswordError: false,
    });
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.registration);

    const handleInputChange = useCallback((key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
            ...(key === 'password' && { passwordError: false }),
            ...(key === 'confirmPassword' && { confirmPasswordError: false }),
        }));
    }, []);

    const passwordHandler = useCallback(() => {
        const isPasswordInvalid = !PASSWORD_REGEX.test(state.password);
        const isPasswordMismatch = state.password !== state.confirmPassword;

        setState((prevState) => ({
            ...prevState,
            passwordError: isPasswordInvalid,
            confirmPasswordError: isPasswordMismatch,
        }));

        if (isPasswordInvalid || isPasswordMismatch) return;

        const payload = { ...userData, password: state.password, password_confirmation: state.confirmPassword };
        dispatch(registrationActions.registerUser(payload))
            .unwrap()
            .then(async ({ access_token, user }) => {
                await TokenService.setTokenInStorage(access_token);
                dispatch(authActions.setIsLoggedIn(true));
                dispatch(userActions.setUser(user));
            })
            .catch((error) => {
                error.errors.email && goToModal(1);
                error.errors.username && goToModal(0);
            });
    }, [state, userData, dispatch, goToModal]);

    return (
        <Background>
            <ReturnBtn method={goPrevious} />
            <View style={styles.containerMain}>
                <View style={styles.containerText}>
                    <Text style={authStyles.title}>Now for security</Text>
                    <Text style={authStyles.subtitle}>Pick and confirm your password</Text>
                </View>
                <View>
                    <PrimaryInput
                        label="Password"
                        placeholder="*******"
                        icon={passwordIcon}
                        isPassword
                        extraStyle={styles.input}
                        value={state.password}
                        method={(text) => handleInputChange('password', text)}
                    />
                    {state.passwordError && (
                        <Text style={genericStyles.errorText}>{PASSWORD_ERROR}</Text>
                    )}
                    <PrimaryInput
                        label="Confirm Password"
                        placeholder="*******"
                        icon={passwordIcon}
                        isPassword
                        extraStyle={styles.input}
                        value={state.confirmPassword}
                        method={(text) => handleInputChange('confirmPassword', text)}
                    />
                    {state.confirmPasswordError && (
                        <Text style={genericStyles.errorText}>{CONFIRM_PASSWORD_ERROR}</Text>
                    )}
                </View>
                <PrimaryBtn
                    disabled={state.passwordError || state.confirmPasswordError || state.password === "" || state.confirmPassword === ""}
                    title="LET'S GO!" onPress={passwordHandler} />
            </View>
        </Background>
    );
};

export default RegisterPasswordModal;
