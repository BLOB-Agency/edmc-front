import {Text, View} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "@store/userSlice";
import PrimaryInput from "@components/PrimaryInput";
import SecondaryBtn from "@components/SecondaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import {authStyles} from "@components/auth/styles";
import Background from "@components/auth/bg"
import styles from "./styles";

const userIcon = require("@assets/icons/user-icon.png");

export default function ({goNext, goPrevious}) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [error, setError] = useState('');

    const saveUsername = () => {
        if (username.trim().length > 0) {
            dispatch(userActions.setUsername(username));
            goNext();
            setError('');
        } else {
            setError('Username cannot be empty');
        }
    };

    return (
        <Background>
            <ReturnBtn method={goPrevious}/>
            <View style={styles.containerMain}>
                <View style={styles.containerText}>
                    <Text style={authStyles.title}>Welcome to EDMC</Text>
                    <Text style={authStyles.subtitle}>
                        Let's start with your username
                    </Text>
                </View>
                <PrimaryInput
                    label={"Username"}
                    placeholder="Username"
                    icon={userIcon}
                    value={username}
                    extraStyle={styles.input}
                    method={setUsername}
                    errorMessage={error}
                />
                <SecondaryBtn
                    title={"CONTINUE!"}
                    onPress={saveUsername}
                />
            </View>
        </Background>
    );
};