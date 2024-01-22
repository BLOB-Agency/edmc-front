import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

const PrimaryBtn = ({ onPress, title, style, textStyle, disabled = false , children}) => {
  const user = useSelector((state) => state.user);

  const mainColor = user.color;
  console.log("mainColor", mainColor);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
        disabled && styles.disabledButton,
        { backgroundColor: mainColor },
      ]}
    >
        {title && <Text style={[styles.text, textStyle]}>{title}</Text>}

        {children}
    </TouchableOpacity>
  );
};

export default PrimaryBtn;
