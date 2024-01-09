import {Modal, ImageBackground, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "@store/userSlice";
import PrimaryInput from "@components/PrimaryInput";
import SecondaryBtn from "@components/SecondaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import styles from "./styles";
import Background from "@components/auth/bg"
import {authStyles, genericStyles} from "@components/auth/styles";
import {loginActions} from "@store/loginSlice";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const emailIcon = require("@assets/icons/email-icon.png");

const LoginEmailModal = ({goNext, goPrevious}) => {
    const dispatch = useDispatch();
    const stateError = useSelector(state => (state.login.errors ?? []).email ?? "")
    const enteredEmail = useSelector(state => state.login.email)
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);

    useEffect(() => {
        setEmail(enteredEmail)
    }, [enteredEmail]);

    useEffect(() => {
        setEmailError(stateError)
    }, [stateError]);

    const getEmail = (enteredText) => {
        setEmailError(null);
        setEmail(enteredText.toLowerCase());
    };

    const emailHandler = () => {
        if (EMAIL_REGEX.test(email)) {
            setEmailError(null);
            dispatch(loginActions.setEmail(email));
            goNext();
        } else {
            setEmailError("Please enter a valid email address");
        }
    };

    return (
        <Background>
            <ReturnBtn method={goPrevious}/>
            <View style={styles.containerMain}>
                <Text style={authStyles.title}>Welcome back!</Text>
                <Text style={authStyles.subtitle}>
                    Enter your account details to get started.
                </Text>
                <PrimaryInput
                    label={"E-Mail Address"}
                    placeholder={"Enter your email"}
                    icon={emailIcon}
                    extraStyle={styles.input}
                    value={email}
                    method={getEmail}
                    errorMessage={emailError}
                />

                <SecondaryBtn
                    title={"CONTINUE!"}
                    textStyle
                    onPress={emailHandler}
                />
            </View>
        </Background>
    );
};

export default LoginEmailModal;
