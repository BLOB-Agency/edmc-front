import { Modal, ImageBackground, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@store/userSlice";
import PrimaryInput from "@components/PrimaryInput";
import { LinearGradient } from "expo-linear-gradient";
import SecondaryBtn from "@components/SecondaryBtn";
import ReturnBtn from "@components/ReturnBtn";
import styles from "./styles";
import signUp from "@utils/signup";
import authService from "@utils/authService";
import Background from "@components/auth/bg"
import {authStyles, genericStyles} from "@components/auth/styles";
import {authActions} from "@store/authSlice";
const passwordIcon = require("@assets/icons/lock-icon.png");
const isPasswordRegexValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;

const RegisterPasswordModal = ({goNext, goPrevious, goToModal}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const onPasswordChange = (enteredText) => {
    setPasswordError(false);
    setPassword(enteredText);
  };

  const onConfirmPasswordChange = (enteredText) => {
    setConfirmPasswordError(false);
    setConfirmPassword(enteredText);
  };


  const passwordHandler = () => {
    const isPasswordInvalid = !isPasswordRegexValid.test(password);
    const isPasswordMismatch = password !== confirmPassword;

    setPasswordError(isPasswordInvalid);
    setConfirmPasswordError(isPasswordMismatch);

    if (isPasswordInvalid || isPasswordMismatch) return;

    dispatch(userActions.setPassword(password));
    dispatch(userActions.registerUser({...userData, password, password_confirmation: confirmPassword}))
      .unwrap()
      .then((fulfilledAction) => {
          console.log('Registration successful:', fulfilledAction);
          dispatch(authActions.setToken(fulfilledAction.access_token));
            dispatch(authActions.setIsLoggedIn(true));
            dispatch(authActions.setUser(fulfilledAction.user));
      })
      .catch((rejectedAction) => {
          console.error('Registration failed:', rejectedAction);
          if (rejectedAction.email) {
              goToModal(1)
              return;
          }

          if (rejectedAction.username) {
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
              <Text style={authStyles.title}>Now for security</Text>
              <Text style={authStyles.subtitle}>
                Pick and confirm your password
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
                />
                {passwordError && (
                  <Text style={genericStyles.errorText}>
                    Password must be at least 8 characters long, contain at
                    least 1 lowercase letter, 1 uppercase letter, 1 numeric
                    digit and 1 special character.
                  </Text>
                )}
                <PrimaryInput
                  label={"Confirm Password"}
                  placeholder={"*******"}
                  icon={passwordIcon}
                  isPassword={true}
                  extraStyle={styles.input}
                  value={confirmPassword}
                  method={onConfirmPasswordChange}
                />
                {confirmPasswordError && (
                  <Text style={genericStyles.errorText}>
                    The passwords do not match
                  </Text>
                )}
              </View>

              <SecondaryBtn
                title={"LET'S GO!"}
                textStyle
                onPress={passwordHandler}
              />
            </View>
      </Background>
    
  );
};

export default RegisterPasswordModal;
