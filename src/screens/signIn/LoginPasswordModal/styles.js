import { StyleSheet } from "react-native";
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

      gap: 12,
    },

    containerText: {
        justifyContent: "center",
        rowGap: 6,
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
      marginTop: 12,
    },
  });

export default styles;