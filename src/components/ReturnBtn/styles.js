import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
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
  });
  export default styles;