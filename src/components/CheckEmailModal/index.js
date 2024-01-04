import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import styles from "./styles";
import PrimaryBtn from "../PrimaryBtn";
import resendCode from "../../utils/resendCode";
import VerifyEmailCode from "../VerifyEmailCode";

const CheckEmailModal = (props) => {
  const [verifyEmailModalVisible, setVerifyEmailModalVisible] = useState(false);
  const handleShowVerifyEmailModal = () => {
    setVerifyEmailModalVisible(true);
  };
  const hideVerifyEmailModal = () => {
    setVerifyEmailModalVisible(false);
  };
  const userData = useSelector((state) => state.user);
  const handleResendCode = () => {
    resendCode(userData.email);
    console.log("Resending code...");
  };
  const openEmailApp = () => {
    console.log("Opening email app...");
    Linking.canOpenURL("mailto:")
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle mailto URL");
        } else {
          return Linking.openURL("mailto:");
        }
      })
      .catch((err) => console.error("An error occurred", err));
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
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={handleShowVerifyEmailModal}
          >
            <BlurView tint="light" intensity={20} style={styles.blurView}>
              <Image
                source={require("../../../assets/icons/cross-icon.png")}
                style={{ width: 24, height: 24 }}
              />
            </BlurView>
          </TouchableOpacity>
          <BlurView
            tint="light"
            intensity={10}
            style={styles.blurMainContainer}
          >
            <View style={styles.containerMain}>
              <View style={styles.containerText}>
                <Text style={styles.title}>Check your email</Text>
                <Text style={styles.subtitle}>
                  We’ve sent you instructions on how to verify your email.
                </Text>
              </View>
              <Image
                source={require("../../../assets/icons/send-email-icon.png")}
                style={{ width: 96, height: 96, alignSelf: "center" }}
              />
              <PrimaryBtn onPress={openEmailApp} title={"OPEN YOUR E-MAIL"} />
            </View>
          </BlurView>
          <View style={styles.containerResendCode}>
            <Text style={{ color: "#fff" }}>Don't have a code?</Text>
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.sendCodeLink}>Resend now</Text>
            </TouchableOpacity>
          </View>
          <VerifyEmailCode
            visible={verifyEmailModalVisible}
            method={hideVerifyEmailModal}
            userData={userData}
            navigation={props.navigation}
            hideEmailModal={props.hideEmailModal}
            hidePasswordModal={props.hidePasswordModal}
            hideCheckEmailModal={props.hideCheckEmailModal}
            hideVerifyEmailModal={hideVerifyEmailModal}
          />
        </LinearGradient>
      </ImageBackground>
    </Modal>
  );
};

export default CheckEmailModal;
