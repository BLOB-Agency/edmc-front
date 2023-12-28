import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import ReturnBtn from "../components/ReturnBtn";
import PrimaryBtn from "../components/PrimaryBtn"
import { FlatList } from "react-native-gesture-handler";

const SignUpColorPick = ({ navigation }) => {
  const colors = [
    { name: "Purple", colorCode: "#BB61C9" },
    { name: "Lila", colorCode: "#8083FF" },
    { name: "Salmon", colorCode: "#FB6376" },
    { name: "Cream", colorCode: "#FAB3A9" },
    { name: "Electric", colorCode: "#FAB565" },
    { name: "Sunset", colorCode: "#FF715B" },
    { name: "Abyss", colorCode: "#0267C1" },
    { name: "Rock", colorCode: "#6E8894" },
    { name: "Bali", colorCode: "#A9CEC2" },
    { name: "Mekong", colorCode: "#5B9279" },
    { name: "Duck", colorCode: "#0E7C7B" },
    { name: "Pine", colorCode: "#005A34" },
  ];
  // Let's create a function that will allow to pick a color and display a white border and an Icon the selected Item
  // State to track the selected color
  const [selectedColor, setSelectedColor] = useState(null);

  // Function to handle color selection
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    console.log("SelectedColor: ", color);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ width: "100%", height: "100%", justifyContent: "center" }}
    >
      <LinearGradient
        colors={["rgba(30,30,30,0.0)", "rgba(30, 30, 30, 0.89)", "#1E1E1E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          ...styles.linearGradient,
        }}
      >
        <ReturnBtn method={() => navigation.navigate("Welcome")} />
        <View style={styles.containerMain}>
          <View style={styles.containerText}>
            <Text style={styles.title}>Pick your color</Text>
            <Text style={{ color: "#fff" }}>
              Music is subjective, and so is our app. Pick a color you like!
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          > */}
          <FlatList
            data={colors}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            contentContainerStyle={{
              justifyContent: "start",
              alignItems:"center"
            }}
            numColumns={3}
            renderItem={(itemData) => {
              const isSelected = itemData.item.colorCode === selectedColor;

              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    flex: 1,
                    margin: 6,
                  }}
                >
                  <TouchableOpacity
                    key={itemData.item.name}
                    style={[
                      styles.colorItem,
                      {
                        backgroundColor: itemData.item.colorCode,
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: isSelected ? "#fff" : "",
                        
                      },
                    ]}
                    onPress={() => {
                      handleColorSelection(itemData.item.colorCode);
                    }}
                  >
                    {isSelected && (
                      <Image
                        source={require("../../assets/icons/icon-check.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={{ color: "#fff" }}>{itemData.item.name}</Text>
                </View>
              );
            }}
          />
        </View>
        <PrimaryBtn title={"CONTINUE"} />
        {/* </View> */}
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 72,
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  containerMain: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    gap: 12,
  },
  containerText: {
    justifyContent: "center",
    marginTop: 24,
    rowGap: 9,
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

  button: {
    backgroundColor: "#A020F0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  linearGradient: {
    flex: 1,
    gap: 24,
    padding: 24,
    justifyContent: "space-between",
    paddingBottom: 72,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 24,
  },
  colorItem: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpColorPick;

{
  /* {colors.map((color) => (
              <FlatList
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <TouchableOpacity
                  key={color.name}
                  style={{
                    backgroundColor: color.colorCode,
                    width: 100,
                    height: 100,
                    borderRadius: 100,

                    marginTop: 10,
                  }}
                ></TouchableOpacity>
                <Text style={{ color: "#fff" }}>{color.name}</Text>
              </FlatList>
            ))} */
}
