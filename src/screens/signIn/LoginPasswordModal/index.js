import { Modal, ImageBackground, Text, View } from "react-native";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryInput from "@components/PrimaryInput";
import { LinearGradient } from "expo-linear-gradient";
import SecondaryBtn from "@components/SecondaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import styles from "./styles";
import signUp from "@utils/signup";
import authService from "@utils/authService";
import Background from "@components/auth/bg"
import {authStyles, genericStyles} from "@components/auth/styles";
import {loginActions} from "@store/loginSlice";
import {authActions} from "@store/authSlice";
import {useLoginEventEmitter} from "@utils/emitters";
import PrimaryBtn from "@components/PrimaryBtn";
import TokenService from "@utils/tokenService";
import {userActions} from "@store/userSlice";
const passwordIcon = require("@assets/icons/lock-icon.png");

const LoginPasswordModal = ({goNext, goPrevious, goToModal}) => {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const dispatch = useDispatch();
    const {email, loading} = useSelector((state) => state.login);
    const stateError = useSelector(state => {
        const errors = state.login.errors ?? []
        return errors.password ?? errors.error ?? ""
    })
    const loginEventEmitter = useLoginEventEmitter();

    useEffect(() => {
        setPasswordError(stateError)
    }, [stateError]);

    const onPasswordChange = (enteredText) => {
        setPasswordError(false);
        setPassword(enteredText);
    };

    const passwordHandler = () => {
        dispatch(loginActions.loginUser({email, password}))
            .unwrap()
            .then(async (fulfilledAction) => {
                console.log('Login successful:', fulfilledAction);
                await TokenService.setTokenInStorage(fulfilledAction.access_token);
                dispatch(authActions.setIsLoggedIn(true));
                dispatch(userActions.setUser(fulfilledAction.user));
                loginEventEmitter.emit('loginSuccess');
            })
            .catch((rejectedAction) => {
                console.error('Login failed:', rejectedAction);
                if (rejectedAction.email) {
                    goToModal(0)
                    return;
                }
            });
    };

    return (
        <Background>
            <ReturnBtn method={goPrevious} />
            <View style={styles.containerMain}>
                <View style={styles.containerText}>
                    <Text style={authStyles.title}>Enter your password</Text>
                    <Text style={authStyles.subtitle}>
                        Enter your account details to get started.
                    </Text>
                </View>
                <View>
                    <PrimaryInput
                        label={"Password"}
                        placeholder={"*******"}
                        icon={passwordIcon}
                        isPassword={true}
                        extraStyle={{...styles.input}}
                        value={password}
                        method={onPasswordChange}
                        errorMessage={passwordError}
                    />

                </View>

                <PrimaryBtn
                    disabled={passwordError || password === ""}
                    title={"LET'S GO!"}
                    textStyle
                    onPress={passwordHandler}
                />
            </View>
        </Background>

    );
};

export default LoginPasswordModal;
