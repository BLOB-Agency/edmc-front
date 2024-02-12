import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ImageBackground, Text, View } from "react-native";
import { registrationActions } from "@store/registrationSlice";
import PrimaryInput from "@components/PrimaryInput";
import PrimaryBtn from "@components/PrimaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import Background from "@components/auth/bg";
import { authStyles, genericStyles } from "@components/auth/styles";
import styles from "./styles";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const emailIcon = require("@assets/icons/email-icon.png");

const validateEmail = (email) => EMAIL_REGEX.test(email);

const RegisterEmailModal = ({ goNext, goPrevious }) => {
    const dispatch = useDispatch();
    const {username, email} = useSelector(state => state.registration);
    const stateError = useSelector(state => (state.registration.errors?.email) ?? null);
    const [emailState, setEmailState] = useState({ email: "", error: null });

    useEffect(() => {
        if (email) {
            setEmailState({ email, error: null });
        }
    }, [email]);

    useEffect(() => {
        setEmailState(emailState => ({ ...emailState, error: stateError }));
    }, [stateError]);

    const handleEmailChange = useCallback((enteredText) => {
        setEmailState({ email: enteredText.toLowerCase(), error: null });
    }, []);

    const handleEmailSubmit = useCallback(() => {
        const isValid = validateEmail(emailState.email);
        if (isValid) {
            dispatch(registrationActions.setEmail(emailState.email));
            goNext();
        } else {
            setEmailState(emailState => ({ ...emailState, error: "Please enter a valid email address" }));
        }
    }, [emailState.email, dispatch, goNext]);

    return (
        <Background>
            <ReturnBtn method={goPrevious} />
            <View style={styles.containerMain}>
                <Text style={authStyles.title}>Hey {username}!</Text>
                <Text style={authStyles.subtitle}>
                    Now we need your email, so we can verify your account
                </Text>
                <PrimaryInput
                    label="E-Mail Address"
                    placeholder="avicii@edmc.io"
                    icon={emailIcon}
                    extraStyle={styles.input}
                    value={emailState.email}
                    method={handleEmailChange}
                    errorMessage={emailState.error}
                />

                <PrimaryBtn
                    disabled={emailState.error !== null || emailState.email === ""}
                    title="LET'S GO!"
                    onPress={handleEmailSubmit}
                />
            </View>
        </Background>
    );
};

export default RegisterEmailModal;
