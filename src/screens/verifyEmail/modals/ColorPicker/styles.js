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
  containerText: {
    justifyContent: "center",
    rowGap: 6,
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
  colorsContainer: {
    flexWrap: 'wrap',
    display: "flex",
    gap: 12,
    width: "100%",
    flexDirection: "row",
    marginTop: 32
  },
  linearGradient: {
    flex: 1,
    gap: 24,
    padding: 24,
    paddingBottom: 72,
    justifyContent: "space-between",
  },
  colorItem: {
    width: 72,
    height: 72,
    borderRadius: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  containerMain: {

    marginTop: 24,
    height: "100%",
    flex: 1,
    width: "100%",
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
  colorName: {
    fontFamily: "Cereal-Medium",
    color: 'white',
    fontSize: 14,
    opacity: .6,
  },
});
export default styles;
