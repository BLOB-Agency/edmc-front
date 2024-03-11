import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { verifyEmail } from '@store/authSlice';
import Background from '@components/auth/bg';
import  { authStyles, genericStyles } from '@components/auth/styles';

import styles from './styles';
import {saveColor, userActions} from "@store/userSlice";
import {FlatList} from "react-native-gesture-handler";
import config from "../../../../../config";
import PrimaryBtn from "@components/PrimaryBtn";


const ColorPicker = ({ goNext, navigation, goPrevious }) => {
    const [currentColor, setCurrentColor] = useState(false)
    const { color } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleColorSelection = (color) => {
        setCurrentColor(color);
        dispatch(userActions.setColor(color));

            };

    const onSubmit = () => {
        dispatch(saveColor(currentColor))
        goNext();
    }
  return (
      <Background>
        <View style={styles.containerMain}>
          <View style={styles.containerText}>
              <Text style={authStyles.title}>Pick your color</Text>
              <Text style={authStyles.subtitle}>
                  Music is subjective, and so is {`\n`}our app. Pick a color you like!
              </Text>
          </View>

            <FlatList
                data={config.COLORS}
                style={styles.colorsContainer}
                contentContainerStyle={{
                    display: "flex",
                    gap: 12,
                    width: "100%",
                }}
                numColumns={3}
                renderItem={(itemData) => {
                    const isSelected = itemData.item.colorCode === currentColor;

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
                                        source={require("@assets/icons/icon-check.png")}
                                        style={{ width: 24, height: 24 }}
                                    />
                                )}
                            </TouchableOpacity>
                            <Text style={styles.colorName}>{itemData.item.name}</Text>
                        </View>
                    );
                }}
            />
        </View>

          {currentColor && (
              <PrimaryBtn title={"CONTINUE!"} onPress={onSubmit} />
          )}
      </Background>
  );
};

export default ColorPicker;
