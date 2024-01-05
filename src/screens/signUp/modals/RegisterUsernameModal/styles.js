
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 24,
      justifyContent: "flex-start",
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

      gap: 24,
    },
    containerText: {
      justifyContent: "center",
      rowGap: 6,
    },
    containerTitle: {
      flexDirection: "row",
      gap: 6,
    },
    input: {
      marginTop: 12,
    },
  });

export default styles;