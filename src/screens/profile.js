import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, ActivityIndicator, Button } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProfileOption from "../components/ProfileOption";
import PrimaryBtn from "../components/PrimaryBtn";
import { userActions } from "../store/userSlice";
import { authActions } from "../store/authSlice";

const Profile = ({ navigation }) => {
  // Get the user's information from the Redux store
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userIcon = require("../../assets/icons/user-icon.png");
  const passwordIcon = require("../../assets/icons/lock-icon.png");
  const notificationIcon = require("../../assets/icons/bell-icon.png");
  const colorIcon = require("../../assets/icons/palette-icon.png");

  // Let's add a sign out button

  // Check if the user data is still loading
  const isLoading = useSelector((state) => state.isLoading);
  const handlePersonalData = () => {
    console.log("Clicked On Personal Data");
  };

  const handlePassword = () => {
    console.log("Clicked On Password");
  };
  const handleSignOut = () => {
    console.log("Clicked On Sign Out");
    // Here we want to reset the user data in the Redux store and redirect the user to the login screen
    dispatch(userActions.resetUser());
    dispatch(authActions.logOut());
    navigation.navigate("Welcome");
  };

  // Display a loader if data is still loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.pageTitle}>My Profile</Text>
      </View>
      <View style={styles.containerInfos}>
        <View style={styles.containerPicture}>
          <Image
            source={require("../../assets/images/harold.jpeg")}
            style={styles.picture}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <View style={styles.containerSettings}>
        <Text style={styles.subtTitle}>PERSONAL SETTINGS</Text>
        <View style={styles.containerOptions}>
          <ProfileOption
            icon={userIcon}
            text="My Account"
            method={handlePersonalData}
          />
          <ProfileOption
            icon={passwordIcon}
            text="Change Password"
            method={handlePassword}
          />
        </View>
      </View>
      <View style={styles.containerSettings}>
        <Text style={styles.subtTitle}>APP SETTINGS</Text>
        <View style={styles.containerOptions}>
          <ProfileOption
            icon={notificationIcon}
            text="Enable Notifications"
            method={handlePersonalData}
          />
          <ProfileOption
            icon={colorIcon}
            text="Change Accent Color"
            method={handlePassword}
          />
        </View>
      </View>
      <PrimaryBtn
        title="Sign Out"
        onPress={handleSignOut}
        style={styles.signOutBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#1E1E1E",
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    gap: 24,
    overflow: "hidden",
  },
  containerTitle: {
    marginTop: 50,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Cereal-Medium",
  },
  containerInfos: {
    marginTop: 50,
    gap: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  containerPicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  picture: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Cereal-Medium",
  },
  containerSettings: {
    gap: 24,
  },
  subtTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Cereal-Medium",
    opacity: 0.6,
  },
  containerOptions: {
    gap: 12,
  },
  signOutBtn: {
    marginTop: 48,
  },
});

export default Profile;
