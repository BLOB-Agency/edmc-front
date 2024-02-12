import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, ActivityIndicator, Button } from "react-native";
import { useSelector } from "react-redux";
import ProfileOption, {ProfileToggleOption} from "@components/ProfileOption";
import PrimaryBtn from "@components/PrimaryBtn";
import {updateNotificationsEnabled, userActions} from "@store/userSlice";
import { authActions } from "@store/authSlice";
import ScreenWithNavigationheader from "@components/navigationHeader";
import userIcon from "@assets/icons/user-icon.png";
import passwordIcon from "@assets/icons/lock-icon.png";
import notificationIcon from "@assets/icons/bell-icon.png";
import colorIcon from "@assets/icons/palette-icon.png";
import styles from "./styles";
import ChangePassword from "@screens/ChangePassword";
import ColorPicker from "@screens/ColorPicker";
const Profile = ({ navigation }) => {

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.isLoading);
    const handlePersonalData = () => {
        console.log("Clicked On Personal Data");
    };

    const handleSignOut = () => {
        console.log('signout?')
        dispatch(userActions.resetUser());
        dispatch(authActions.logOut());
        // navigation.navigate("Welcome");
    };

    const openChangePassword = () => {
        setShowChangePassword(true)
    };

    const closeChangePassword = () => {
        setShowChangePassword(false)
    }

    const openColorPicker = () => {
        setShowColorPicker(true)
    };

    const closeColorPicker = () => {
        setShowColorPicker(false)
    }

    const handleNotificationToggle = (value) => {
        dispatch(updateNotificationsEnabled(value ? 1 : 0))
        setNotificationsEnabled(value)
    }

    useEffect(() => {
        setNotificationsEnabled(user.notifications_enabled)
    }, [user]);

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
                              source={require("@assets/images/default-avatar.png")}
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
                              method={openChangePassword}
                              isLast={true}
                          />
                      </View>
                  </View>
                  <View style={styles.containerSettings}>
                      <Text style={styles.subtTitle}>APP SETTINGS</Text>
                      <View style={styles.containerOptions}>
                          <ProfileToggleOption
                              icon={notificationIcon}
                              toggleValue={notificationsEnabled}
                              text="Enable Notifications"
                              onToggleChange={handleNotificationToggle}
                          />
                          <ProfileOption
                              icon={colorIcon}
                              text="Change Accent Color"
                              method={openColorPicker}
                              isLast={true}
                          />
                      </View>
                  </View>

              </View>

              <PrimaryBtn
                  title="Sign Out"
                  disabled={false}
                  onPress={handleSignOut}
                  style={styles.signOutBtn}
              />
          </View>

            <ChangePassword onClose={closeChangePassword} visible={showChangePassword}/>
            <ColorPicker onClose={closeColorPicker} visible={showColorPicker}/>
        </ScreenWithNavigationheader>

    );
};


export default Profile;
