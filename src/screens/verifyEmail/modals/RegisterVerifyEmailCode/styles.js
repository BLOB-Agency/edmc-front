import { StyleSheet } from "react-native";

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
    // alignItems: "center",
  },
  linearGradient: {
    flex: 1,
    gap: 24,
    padding: 24,
    paddingBottom: 72,
    justifyContent: "space-between",
  },
  containerMain: {
    marginTop: 24,
    height: "100%",
    justifyContent: "space-between",
  },
  title: {

    fontSize: 36,
    marginVertical: 0,
    color: "#fff",
    fontFamily: "Cereal-Medium",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",

    fontFamily: "Gordita-Medium",
  },

  containerDigitInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48,
  },
  digitInput: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    marginHorizontal: 5,
  },
  containerResendCode: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 6,
    fontFamily: "Gordita-Regular",
  },
  sendCodeLink: {
    textDecorationLine: "underline",
    color: "#fff",
  },
});
export default styles;
