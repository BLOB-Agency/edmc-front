import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.7)", // Use borderBottomColor
  },
  textOption: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Cereal-Book",
    marginLeft: 24, // Add margin to the left to separate text from the icon
    flex:2,
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 10, // Add margin to the right to separate the icon from the text
  },
});

export default styles;
