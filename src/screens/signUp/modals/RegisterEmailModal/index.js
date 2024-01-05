import { Modal, ImageBackground, Text, View } from "react-native";
import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { userActions } from "@store/userSlice";
import PrimaryInput from "@components/PrimaryInput";
import { LinearGradient } from "expo-linear-gradient";
import SecondaryBtn from "@components/SecondaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import styles from "./styles";
import genericStyles from "../../../../genericStyles";
import Background from "@components/auth/bg"
import {authStyles} from "@components/auth/styles";
const RegisterEmailModal = ({goNext, goPrevious}) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username)
  const emailIcon = require("@assets/icons/email-icon.png");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const getEmail = (enteredText) => {
    setEmailError(false);
    setEmail(enteredText.toLowerCase());
  };
  const emailHandler = () => {
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      dispatch(userActions.setEmail(email));
      goNext();
      dispatch(userActions.logUser());
    } else {
      console.log("The email is invalid!");
      setEmailError(true);
    }
  };

 

  return (
      
      <Background>
          <ReturnBtn method={goPrevious} />
          <View style={styles.containerMain}>
                <Text style={authStyles.title}>Hey {username}!</Text>
              <Text style={authStyles.subtitle}>
                Now we need your email, so we can verify your account
              </Text>
              <PrimaryInput
                label={"E-Mail Address"}
                placeholder={"john@doe.com"}
                icon={emailIcon}
                extraStyle={styles.input}
                value={email}
                method={getEmail}
              />
              {emailError && (
                <Text style={{ color: "#FFA500" }}>
                  Please enter a valid email address
                </Text>
              )}
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
