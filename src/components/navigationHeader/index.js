import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Platform, Animated, Dimensions} from 'react-native';
import styles from "./styles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BlurView} from "expo-blur";

const NavigationHeader = ({ title, scrollY, onHeaderLayout, small = false }) => {
    const isIOS = Platform.OS === 'ios';
    const insets = useSafeAreaInsets();
    const titleRef = useRef(null);
    const [titleWidth, setTitleWidth] = useState(0);
    const startFontSize = small ? 24 : 36;
    const endFontSize = 16;
    const screenWidth = Dimensions.get('window').width;

    const titleTranslateX = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, small ? ((screenWidth / 2) * (endFontSize / startFontSize) +titleWidth/2) : (screenWidth/2) + (titleWidth/2)],
        extrapolate: 'clamp',
    });

    const titleTranslateY = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -insets.top+42],
        extrapolate: 'clamp',
    });

    const onTitleLayout = (event) => {
        if (titleRef.current) {
            titleRef.current.measure((fx, fy, width, height, px, py) => {
                setTitleWidth(width);
            });
        }
    };

    const scale = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [1, endFontSize / startFontSize], // Scale down as you scroll
        extrapolate: 'clamp',
    });

    const blurOpacity = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={{...styles.headerContainer}}  onLayout={onHeaderLayout}>
            <Animated.View
                style={[StyleSheet.absoluteFill, { opacity: blurOpacity }]}
            >
                <BlurView
                    style={{...StyleSheet.absoluteFill,  borderBottomWidth: StyleSheet.hairlineWidth,}}
                    blurType="dark"
                    blurAmount={10} // Set your desired blur amount
                />
            </Animated.View>
            <View style={{paddingTop: insets.top+12, paddingHorizontal: 24}}>
                <Animated.Text
                    ref={titleRef}
                    onLayout={onTitleLayout}
                    style={[
                        small ? styles.headerTitle : styles.headerTitleLarge,
                        {
                            transform: [
                                { scale },
                                { translateY: titleTranslateY },
                                { translateX: titleTranslateX }
                            ],
                        }
                    ]}
                >
                    {title}
                </Animated.Text>
            </View>

        </View>
    );
};


const ScreenWithNavigationHeader = ({ children, title, small = false }) => {
    const scrollY = new Animated.Value(0);
    const [headerHeight, setHeaderHeight] = useState(0);

    const onHeaderLayout = (event) => {
        const height = event.nativeEvent.layout.height;
        setHeaderHeight(height);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
            <NavigationHeader small={small} title={title} scrollY={scrollY} onHeaderLayout={onHeaderLayout} />
            <Animated.ScrollView
                style={{ paddingTop: headerHeight,  }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {children}
            </Animated.ScrollView>
        </View>
    );
};

export default ScreenWithNavigationHeader;

