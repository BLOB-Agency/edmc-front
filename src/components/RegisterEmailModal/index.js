import { Modal, ImageBackground, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { userActions } from "../../store/userSlice";
import PrimaryInput from "../PrimaryInput";
import { LinearGradient } from "expo-linear-gradient";
import SecondaryBtn from "../SecondaryBtn";
import ReturnBtn from "../ReturnBtn";
import RegisterPasswordModal from "../RegisterPasswordModal";
import styles from "./styles";

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
          </View>
          <RegisterPasswordModal visible={passwordModalVisible} username={props.username} hidePasswordModal={showPasswordModal}  />
        </LinearGradient>
      </ImageBackground>
    </Modal>
  );
};
export default RegisterEmailModal;
