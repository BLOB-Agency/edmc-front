import { Modal, ImageBackground, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { userActions } from "../../store/userSlice";
import PrimaryInput from "../PrimaryInput";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import SecondaryBtn from "../SecondaryBtn";
import ReturnBtn from "../ReturnBtn";
import RegisterPasswordModal from "../RegisterPasswordModal";

const RegisterEmailModal = (props) => {
  const dispatch = useDispatch();
  const emailIcon = require("../../../assets/icons/email-icon.png");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const getEmail = (enteredText) => {
    setEmailError(false);
    setEmail(enteredText.toLowerCase());
  };
  const emailHandler = () => {
    // Regex for email verification
    const regex = /\S+@\S+\.\S+/;
    // If the email is valid, dispatch the email and navigate to the next screen
    if (regex.test(email)) {
      dispatch(userActions.setEmail(email));
      dispatch(userActions.logUser());
      setPasswordModalVisible(true);
      
    } else {
      console.log("The email is invalid!");
      setEmailError(true);
    }
  };
  const showPasswordModal = () => {
    setPasswordModalVisible(!passwordModalVisible);
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
          <ReturnBtn method={props.hideEmailModal} />
          <View style={styles.containerMain}>
            <View style={styles.containerText}>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>Hey</Text>
                <Text style={styles.title}>{props.username}!</Text>
              </View>
              <Text style={{ color: "#fff" }}>
                Now we need your email, so we can verify your account
              </Text>
              <PrimaryInput
                label={"E-Mail Address"}
                placeholder={"john@doe.com"}
                Icon={emailIcon}
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
          </View>
          <RegisterPasswordModal visible={passwordModalVisible} username={props.username} hidePasswordModal={showPasswordModal}  />
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
    flexDirection: "row",
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

export default RegisterEmailModal;
