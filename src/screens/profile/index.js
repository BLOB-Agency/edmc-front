import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, ActivityIndicator, Button } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProfileOption from "@components/ProfileOption";
import PrimaryBtn from "@components/PrimaryBtn";
import { userActions } from "@store/userSlice";
import { authActions } from "@store/authSlice";
import ScreenWithNavigationheader from "@components/navigationHeader";
import userIcon from "@assets/icons/user-icon.png";
import passwordIcon from "@assets/icons/lock-icon.png";
import notificationIcon from "@assets/icons/bell-icon.png";
import colorIcon from "@assets/icons/palette-icon.png";
import styles from "./styles";
const Profile = ({ navigation }) => {
    // Get the user's information from the Redux store
    const user = useSelector((state) => state.auth.user ?? {});
    const dispatch = useDispatch();


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
        <ScreenWithNavigationheader title={"My Profile"} small={true}>
          <View style={styles.outerContainer}>
              <View style={styles.innerContainer}>
                  <View style={styles.infoContainer}>
                      <View style={styles.containerPicture}>
                          <Image
                              source={require("@assets/images/harold.jpeg")}
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
                              isLast={true}
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
                              isLast={true}
                          />
                      </View>
                  </View>

              </View>

              <PrimaryBtn
                  title="Sign Out"
                  onPress={handleSignOut}
                  style={styles.signOutBtn}
              />
          </View>
        </ScreenWithNavigationheader>

    );
};


export default Profile;
