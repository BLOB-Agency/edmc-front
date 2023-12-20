import { Modal, ImageBackground, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import PrimaryInput from "../PrimaryInput";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import SecondaryBtn from "../SecondaryBtn";
import ReturnBtn from "../ReturnBtn";

const RegisterPasswordModal = (props) => {
  const dispatch = useDispatch();
  const passwordIcon = require("../../../assets/icons/email-icon.png");
  const [password, setPassword] = useState("");
  const [isPassWordInput, setIsPassWordInput] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const getPassword = (enteredText) => {
    setPasswordError(false);
    setPassword(enteredText);
  };
  const passwordHandler = (props) => {
    // Regex for strong password verification
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Length: The password must be at least 8 characters long.
    // Lowercase Letters: The password must contain at least one lowercase letter.
    // Uppercase Letters: The password must contain at least one uppercase letter.
    // Numbers: The password must contain at least one numeric digit.
    // Special Characters: The password must contain at least one special character from the set @$!%*?&.
    // If the password is valid, dispatch the password and navigate to the next screen
    if (regex.test(password)) {
      dispatch(userActions.setPassword(password));
      dispatch(userActions.logUser());
      // Set next modal Visible here
    } else {
      console.log("The password is invalid!");
      setPasswordError(true);
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
              <PrimaryInput
                label={"Password"}
                placeholder={"*******"}
                Icon={passwordIcon}
                isPassword={isPassWordInput}   
                extraStyle={styles.input}
                value={password}
                method={getPassword}
              />
              {passwordError && (
                <Text style={{ color: "#FFA500" }}>
                  Password must be at least 8 characters long, contain at least
                  1 lowercase letter, 1 uppercase letter, 1 numeric digit and 1
                  special character.
                </Text>
              )}
              <SecondaryBtn
                title={"LET'S GO!"}
                textStyle
                onPress={passwordHandler}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    gap: 24,
    padding: 24,
    justifyContent: "space-between",
    paddingBottom: 72,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  containerMain: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    gap: 12,
  },
  containerText: {
    justifyContent: "center",
    marginTop: 24,
    rowGap: 9,
  },
  containerTitle: {
    gap: 6,
  },
  title: {
    fontSize: 36,
    marginVertical: 0,
    color: "#fff",
    fontFamily: "Cereal-Medium",
  },
  backIconContainer: {
    marginTop: 24,
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
  },
  input: {
    marginTop: 24,
  },
});

export default RegisterPasswordModal;
