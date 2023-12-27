import { Modal, ImageBackground, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import PrimaryInput from "../PrimaryInput";
import { LinearGradient } from "expo-linear-gradient";
import SecondaryBtn from "../SecondaryBtn";
import ReturnBtn from "../ReturnBtn";
import CheckEmailModal from "../CheckEmailModal";
import styles from "./styles";
import signUp from "../../utils/signUp";

const RegisterPasswordModal = (props) => {
  const dispatch = useDispatch();
  const passwordIcon = require("../../../assets/icons/lock-icon.png");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassWordInput, setIsPassWordInput] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [checkEmailModalVisible, setCheckEmailModalVisible] = useState(false);
  const userData = useSelector((state) => state.user);
  const hideCheckEmailModal = () => {
    setCheckEmailModalVisible(false);
  };
  const getPassword = (enteredText) => {
    setPasswordError(false);
    setPassword(enteredText);
  };
  const getConfirmPassword = (enteredText) => {
    setConfirmPassword(false);
    setConfirmPassword(enteredText);
    console.log("confirmPassword: ", confirmPassword);
  };

  const passwordHandler = () => {
    setPasswordError(false);
    setConfirmPasswordError(false);
    // Length: The password must be at least 8 characters long.
    // Lowercase Letters: The password must contain at least one lowercase letter.
    // Uppercase Letters: The password must contain at least one uppercase letter.
    // Numbers: The password must contain at least one numeric digit.
    // Special Characters: The password must contain at least one special character from the set @$!%*?&.
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(true);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(true);
    }
    // If they match, dispatch the password and navigate to the next screen
    else {
      dispatch(userActions.setPassword(password));
      dispatch(userActions.logUser());

      signUp(userData);

      setCheckEmailModalVisible(true);
    }
  };

  return (
    <Modal animationType="fade" visible={props.visible}>
      <ImageBackground
        source={require("../../../assets/images/bg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <LinearGradient
          colors={["rgba(30,30,30,0.0)", "rgba(30, 30, 30, 0.89)", "#1E1E1E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            ...styles.linearGradient,
          }}
        >
          <ReturnBtn method={props.hidePasswordModal} />
          <View style={styles.containerMain}>
            <View style={styles.containerText}>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>Now for security</Text>
                <Text style={styles.title}>{props.username}!</Text>
              </View>
              <Text style={{ color: "#fff" }}>
                Pick and confirm your password
              </Text>
              <View>
                <PrimaryInput
                  label={"Password"}
                  placeholder={"*******"}
                  icon={passwordIcon}
                  isPassword={isPassWordInput}
                  extraStyle={styles.input}
                  value={password}
                  method={getPassword}
                />
                {passwordError && (
                  <Text style={{ color: "#FFA500" }}>
                    Password must be at least 8 characters long, contain at
                    least 1 lowercase letter, 1 uppercase letter, 1 numeric
                    digit and 1 special character.
                  </Text>
                )}
                <PrimaryInput
                  label={"Confirm Password"}
                  placeholder={"*******"}
                  icon={passwordIcon}
                  isPassword={isPassWordInput}
                  extraStyle={styles.input}
                  value={confirmPassword}
                  method={getConfirmPassword}
                />
                {confirmPasswordError && (
                  <Text style={{ color: "#FFA500" }}>
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
          </View>
          <CheckEmailModal
            visible={checkEmailModalVisible}
            method={hideCheckEmailModal}
          />
        </LinearGradient>
      </ImageBackground>
    </Modal>
  );
};

export default RegisterPasswordModal;
