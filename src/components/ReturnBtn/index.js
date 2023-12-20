import React from "react";
import { BlurView } from "expo-blur";
import { Image, TouchableOpacity } from "react-native";
import styles from "./styles";

const ReturnBtn = ({ method }) => {
  return (
    <TouchableOpacity style={styles.backIconContainer} onPress={method}>
      <BlurView tint="light" intensity={20} style={styles.blurView}>
        <Image
          source={require("../../../assets/icons/back-icon.png")}
          style={{ width: 24, height: 24 }}
        />
      </BlurView>
    </TouchableOpacity>
  );
};

export default ReturnBtn;
