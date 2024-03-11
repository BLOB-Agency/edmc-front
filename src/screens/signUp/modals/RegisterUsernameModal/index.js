import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Switch, Text, View} from "react-native";
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
    const stateError = useSelector(state => state.registration.errors?.username ?? null);
    const {is_artist: isArtist, username} = useSelector((state) => state.registration);
    const color = useSelector((state) => state.user.color || '#BB61C9');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(stateError !== null);
    }, [stateError]);

    const setUsername = (username) => {
        isError && setIsError(false);
        dispatch(registrationActions.setUsername(username));
    }

    const setArtist = (isArtist) => {
        dispatch(registrationActions.setIsArtist(isArtist));
    }


    return (
        <Background>
            <ReturnBtn method={goPrevious} />
            <View style={styles.containerMain}>
                <View style={styles.containerText}>
                    <Text style={authStyles.title}>Welcome to EDMC</Text>
                    <Text style={authStyles.subtitle}>Let's start with your username</Text>
                </View>
               <View style={styles.inputContainer}>
                   <PrimaryInput
                       label="Username"
                       placeholder="Username"
                       icon={userIcon}
                       value={username}
                       extraStyle={styles.input}
                       method={setUsername}
                       errorMessage={isError ? stateError : null}
                   />

                   <View style={styles.artistField}>
                       <Switch
                           trackColor={{ false: '#767577', true: color }}
                           thumbColor={"#f4f3f4"}
                           ios_backgroundColor='#3e3e3e'
                           onValueChange={setArtist}
                           value={isArtist}
                       />

                       <Text style={styles.artistText}>
                           I'm an artist
                       </Text>
                   </View>
               </View>

                <PrimaryBtn
                    disabled={!username.trim() || isError ? stateError : null}
                    title="CONTINUE!"
                    onPress={goNext}
                />
            </View>
        </Background>
    );
};
