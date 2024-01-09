import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  textOption: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Cereal-Book",
    marginLeft: 24,
    flex:2,
  },
  icon: {
    width: 14,
    height: 14,
  },
});

export default styles;
