import React, { useEffect } from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import styles from "./styles";

const ProfileOption = (props) => {
   
  return (
    <TouchableOpacity onPress={props.method} >
      <View style={styles.containerOption}>
        
          <Image
            source={props.icon}
            style={styles.icon}
          />
        <Text style={styles.textOption}>{props.text}</Text>

        <Image
          source={require("../../../assets/icons/chevron-right.png")}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOption;
