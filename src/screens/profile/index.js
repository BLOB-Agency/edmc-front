import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {View, Text, Image, ActivityIndicator, Button, TouchableOpacity} from "react-native";
import { useSelector } from "react-redux";
import ProfileOption, {ProfileOptionText, ProfileToggleOption} from "@components/ProfileOption";
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
import ArtistSwitchButton from "@components/ArtistSwitchButton";
import SignOut from "@screens/signOut";
import {loginActions} from "@store/loginSlice";
import {registrationActions} from "@store/registrationSlice";
import CreateArtistProfile from "@screens/createArtistProfile";
import {useLoginEventEmitter} from "@utils/emitters";
import MyAccount from "@screens/MyAccount";
import ChooseImage from "@screens/ChooseImage";
import FastImage from "react-native-fast-image";
import {musicActions} from "@store/musicSlice";
import {useMusicPlayer} from "@context/MusicPlayerContext";
const Profile = ({ navigation }) => {
    const [showCreateArtistProfile, setShowCreateArtistProfile] = useState(false);
    const [showSignOut, setShowSignOut] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [userVisible, setUserVisible] = useState(false);
    const loginEventEmitter = useLoginEventEmitter()
    const [showProfilePicture, setShowProfilePicture] = useState(false)
    const user = useSelector((state) => state.user);
    const profilePhoto = useSelector((state) => state.user.profile_photo);
    const dispatch = useDispatch();
    const { timeUntilNextStar } = useSelector((state) => state.music);
    const isLoading = useSelector((state) => state.isLoading);
    const {stopMusic} = useMusicPlayer();

    const handleSignOut = () => {
        dispatch(userActions.resetUser());
        dispatch(loginActions.resetUser());
        dispatch(registrationActions.resetUser());
        dispatch(userActions.setLoggedIn(false));
        dispatch(musicActions.reset())
        stopMusic()
        navigation.navigate("Welcome");
    };

    const openChangePassword = () => {
        setShowChangePassword(true)
    };

    const closeChangePassword = () => {
        setShowChangePassword(false)
    }

    const closeUserProfile = () => {
        setUserVisible(false)
    }

    const openUserProfile = () => {
        setUserVisible(true)
    }

    const closeArtistProfile = () => {
        setShowCreateArtistProfile(false)
    }

    const openArtistProfile = () => {
        setShowCreateArtistProfile(true)
    }

    const openSignOut = () => {
        setShowSignOut(true)
    }

    const closeSignOut = () => {
        setShowSignOut(false)
    }

    const openColorPicker = () => {
        setShowColorPicker(true)
    };

    const closeColorPicker = () => {
        setShowColorPicker(false)
    }

    const openImagePicker = () => {
        setShowProfilePicture(true)
    }

    const closeImagePicker = () => {
        setShowProfilePicture(false)
    }

    const handleNotificationToggle = (value) => {
        dispatch(updateNotificationsEnabled(value ? 1 : 0))
        setNotificationsEnabled(value)
    }

    const goToArtist = () => {
        if (user.isArtistMode) {
            switchToListener()
            return
        }

        if (user.artist_profile) {
            switchToArtist()
        } else {
            openArtistProfile()
        }
    }

    const switchToArtist = () => {
        loginEventEmitter.emit('goToArtist')
        dispatch(userActions.setArtistMode(true));

    }

    const switchToListener = () => {
        loginEventEmitter.emit('goToListener')
        dispatch(userActions.setArtistMode(false));
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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} minute${mins === 1 ? '' : 's'} and ${secs} second${secs === 1 ? '' : 's'}`;
    };
    const imageUrl = user.profile_photo ? user.profile_photo.url : 'https://i.imgur.com/OgjjT6T.png';
    console.log('imageUrl', user)
    return (
        <ScreenWithNavigationheader title={"My Profile"} small={true}>
          <View style={styles.outerContainer}>
              <View style={styles.innerContainer}>
                  <View style={styles.infoContainer}>
                      <TouchableOpacity onPress={openImagePicker} style={styles.containerPicture}>
                              <FastImage
                                  source={{uri: imageUrl, priority: FastImage.priority.normal}}
                                  style={styles.picture}
                                  resizeMode="cover"
                              />
                      </TouchableOpacity>
                      <Text style={styles.username}>{user.username}</Text>

                      <ArtistSwitchButton onSubmit={goToArtist} />
                  </View>
                  <View style={styles.containerSettings}>
                      <Text style={styles.subtTitle}>STAR DROPS</Text>
                      <View style={styles.containerOptions}>
                          <ProfileOptionText
                              icon={require("@assets/icons/star-icon.png")}
                              text="Available"
                              secondText={user.star_drops}
                          />

                          <ProfileOptionText
                              icon={require("@assets/icons/clock-icon.png")}
                              text="Time till next"
                              secondText={formatTime(timeUntilNextStar)}
                          />

                      </View>
                  </View>

                  <View style={styles.containerSettings}>
                      <Text style={styles.subtTitle}>PERSONAL SETTINGS</Text>
                      <View style={styles.containerOptions}>
                          <ProfileOption
                              icon={userIcon}
                              text="My Account"
                              method={openUserProfile}
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
                  onPress={openSignOut}
                  style={styles.signOutBtn}
              />
          </View>

            <ChooseImage visible={showProfilePicture} onClose={closeImagePicker}></ChooseImage>
            <MyAccount visible={userVisible} onClose={closeUserProfile} />
            <ChangePassword onClose={closeChangePassword} visible={showChangePassword}/>
            <ColorPicker onClose={closeColorPicker} visible={showColorPicker}/>
            <SignOut onClose={closeSignOut} visible={showSignOut} onSubmit={handleSignOut}/>
            <CreateArtistProfile onClose={closeArtistProfile} onSubmit={switchToArtist} visible={showCreateArtistProfile}/>
        </ScreenWithNavigationheader>

    );
};


export default Profile;
