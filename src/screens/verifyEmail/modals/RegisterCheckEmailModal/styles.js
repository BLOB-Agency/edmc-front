import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15
  },
  linearGradient: {
    flex: 1,
    gap: 24,
    padding: 24,
    paddingBottom: 72,
    justifyContent: "space-between",
  },
  skip: {
    fontFamily: "Cereal-Book",
    fontSize: 13,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    opacity: 0.5,
  },
  background: {
    textAlign: "center",
    flex:1,
    height: 400,
    overflow: "hidden",
    maxHeight: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1,
    borderRadius: 15
  },
  containerMain: {
    height: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  containerText: {
    justifyContent: "center",
    rowGap: 6,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    marginVertical: 0,
    color: "#fff",
    fontFamily: "Cereal-Medium",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    fontFamily: "Gordita-Medium",
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
  containerResendCode: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    fontFamily: "Gordita-Regular",
  },
  sendCodeLink: {
    textDecorationLine: "underline",
    color: "#fff",
  },
});
export default styles;
