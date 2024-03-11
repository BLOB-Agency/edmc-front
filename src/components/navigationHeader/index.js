import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Platform, Animated, Dimensions, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from "./styles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BlurView} from "expo-blur";
import PrimaryBtn from "@components/PrimaryBtn";
import PrimaryBtnSmall from "@components/PrimaryBtnSmall";


const NavigationHeader = ({ title, scrollY, onHeaderLayout, onBack, xsmall = false, small = false }) => {
    const insets = useSafeAreaInsets();
    const screenWidth = Dimensions.get('window').width;

    // Animation for fading out the title as the user scrolls
    const titleOpacity = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [1, 0], // Fully visible at 0 scrollY and fully transparent at 70 scrollY
        extrapolate: 'clamp',
    });

    const smallTitleOpacity = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, 1], // Fully visible at 0 scrollY and fully transparent at 70 scrollY
        extrapolate: 'clamp',
    });

    const titleTranslateY = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -50], // Adjust the -50 value as needed to control how much the title moves up
        extrapolate: 'clamp',
    });


    const blurOpacity = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, 1], // Blur effect based on scroll position
        extrapolate: 'clamp',
    });

    return (
        <View style={{...styles.headerContainer}} onLayout={onHeaderLayout}>
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: blurOpacity }]}>
                <BlurView
                    style={{...StyleSheet.absoluteFill, borderBottomWidth: StyleSheet.hairlineWidth}}
                    blurType="dark"
                    blurAmount={10} // Adjust blur amount as needed
                />
            </Animated.View>
            <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 24, width: '100%' }}>
                {!xsmall && (
                    <Animated.Text
                        style={[
                            small ? styles.headerTitle : styles.headerTitleLarge,
                            {
                                opacity: titleOpacity,
                                transform: [{ translateY: titleTranslateY }]
                            }, // Apply the animated opacity here
                        ]}
                    >
                        {title}
                    </Animated.Text>
                )}

                {!xsmall && (
                    <View style={styles.smallTitleContainer}>

                        <Animated.Text style={[
                            styles.headerTitleSmall,
                            {
                                opacity: smallTitleOpacity,
                            }
                        ]}>{title}</Animated.Text>
                    </View>
                )}

                {xsmall && (
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity onPress={onBack} style={[styles.backButton, {
                            zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute',
                        }]}>
                            <Image source={require("../../../assets/icons/back-icon.png")} style={styles.backIcon} />
                        </TouchableOpacity>

                        <Text style={styles.headerTitleSmall}>{title}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

// const ScreenWithNavigationHeader = ({ children, title, small = false, hasFilters = false, onFilterSelect }) => {
//     const scrollY = new Animated.Value(0);
//     const [headerHeight, setHeaderHeight] = useState(0);
//     const [selectedFilter, setSelectedFilter] = useState(null); // New state for selected filter
//
//     const handleFilterSelect = (filter) => {
//         setSelectedFilter(filter); // Update the selected filter state
//         // Here you can also do things like fetching data based on the selected filter
//     };
//
//     const onHeaderLayout = (event) => {
//         const height = event.nativeEvent.layout.height;
//         setHeaderHeight(height);
//     };
//
//     return (
//         <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
//             <NavigationHeader onFilterSelect={handleFilterSelect} filterSelected={selectedFilter} hasFilters={hasFilters} small={small} title={title} scrollY={scrollY} onHeaderLayout={onHeaderLayout} />
//             <Animated.ScrollView
//                 style={{ paddingTop: headerHeight,  }}
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { y: scrollY }}}],
//                     { useNativeDriver: true }
//                 )}
//                 scrollEventThrottle={16}
//             >
//                 {children}
//             </Animated.ScrollView>
//         </View>
//     );
// };


const ScreenWithNavigationHeader = ({ children, title, small = false, xsmall = false, hasFilters = false, onFilterSelect, useScrollView = true, onBack}) => {
    const scrollY = new Animated.Value(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        if (onFilterSelect) {
            onFilterSelect(filter);
        }
    };

    const onHeaderLayout = (event) => {
        const height = event.nativeEvent.layout.height;
        setHeaderHeight(height);
    };

    // Conditionally choose the container component based on useScrollView prop
    const Container = useScrollView ? Animated.ScrollView : View;
    const containerProps = useScrollView
        ? {
            style: { paddingTop: headerHeight, paddingBottom: 72 },
            onScroll: Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            ),
            scrollEventThrottle: 16,
        }
        : {
            style: { paddingTop: headerHeight },
        };

    return (
        <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
            <NavigationHeader
                xsmall={xsmall}
                onFilterSelect={handleFilterSelect}
                filterSelected={selectedFilter}
                hasFilters={hasFilters}
                small={small}
                title={title}
                scrollY={scrollY}
                onHeaderLayout={onHeaderLayout}
                onBack={onBack}
            />
            <Container {...containerProps}>
                {children}
            </Container>
        </View>
    );
};

export default ScreenWithNavigationHeader;

