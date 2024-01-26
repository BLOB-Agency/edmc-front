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
import {registrationActions} from "@store/registrationSlice";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
    const emailIcon = require("@assets/icons/email-icon.png");

const RegisterEmailModal = ({goNext, goPrevious}) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.registration.username)
    const stateError = useSelector(state => (state.registration.errors ?? []).email ?? "")
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);

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
            dispatch(registrationActions.setEmail(email));
            goNext();
        } else {
            console.log("The email is invalid!");
            setEmailError("Please enter a valid email address");
        }
    };

    return (
        <Background>
            <ReturnBtn method={goPrevious}/>
            <View style={styles.containerMain}>
                <Text style={authStyles.title}>Hey {username}!</Text>
                <Text style={authStyles.subtitle}>
                    Now we need your email, so we can verify your account
                </Text>
                <PrimaryInput
                    label={"E-Mail Address"}
                    placeholder={"avicii@edmc.io"}
                    icon={emailIcon}
                    extraStyle={styles.input}
                    value={email}
                    method={getEmail}
                    errorMessage={emailError}
                />

                <SecondaryBtn
                    title={"LET'S GO!"}
                    textStyle
                    onPress={emailHandler}
                />
            </View>
        </Background>
    );
};

export default RegisterEmailModal;
