import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import { registrationActions } from "@store/registrationSlice";
import PrimaryInput from "@components/PrimaryInput";
import PrimaryBtn from "@components/PrimaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import Background from "@components/auth/bg";
import { authStyles } from "@components/auth/styles";
import styles from "./styles";

const userIcon = require("@assets/icons/user-icon.png");

export default function Registration({ goNext, goPrevious }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const stateError = useSelector(state => state.registration.errors?.username ?? null);

    useEffect(() => {
        if (stateError) {
            setUsername("");
        }
    }, [stateError]);

    const saveUsername = () => {
        const trimmedUsername = username.trim();
        if (trimmedUsername) {
            dispatch(registrationActions.setUsername(trimmedUsername));
            goNext();
        } else {
            alert('Username cannot be empty');
        }
    };

    return (
        <Background>
            <ReturnBtn method={goPrevious} />
            <View style={styles.containerMain}>
                <View style={styles.containerText}>
                    <Text style={authStyles.title}>Welcome to EDMC</Text>
                    <Text style={authStyles.subtitle}>Let's start with your username</Text>
                </View>
                <PrimaryInput
                    label="Username"
                    placeholder="Username"
                    icon={userIcon}
                    value={username}
                    extraStyle={styles.input}
                    method={setUsername}
                    errorMessage={stateError}
                />
                <PrimaryBtn
                    disabled={!username.trim() || stateError}
                    title="CONTINUE!"
                    onPress={saveUsername}
                />
            </View>
        </Background>
    );
};
