import React, { useState, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const withSequentialModals = (Modals, navigation, { onFirstModalBack, onLastModalNext } = {}) => {

    return function WrappedComponent(props) {
        const [currentModalIndex, setCurrentModalIndex] = useState(0);
        const [nextModalIndex, setNextModalIndex] = useState(null);
        const fadeOutAnim = useRef(new Animated.Value(1)).current;
        const fadeInAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            if (nextModalIndex !== null) {
                Animated.parallel([
                    Animated.timing(fadeOutAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeInAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    })
                ]).start(() => {
                    setCurrentModalIndex(nextModalIndex);
                    setNextModalIndex(null);
                    fadeOutAnim.setValue(1);
                    fadeInAnim.setValue(0);
                });
            }
        }, [nextModalIndex, fadeOutAnim, fadeInAnim]);

        const transitionToModal = (newIndex) => {
            setNextModalIndex(newIndex);
        };

        const goNext = () => {
            if (currentModalIndex < Modals.length - 1) {
                transitionToModal(currentModalIndex + 1);
            } else {
                if (onLastModalNext) {
                    onLastModalNext();
                }
            }
        };

        const goPrevious = () => {
            if (currentModalIndex > 0) {
                transitionToModal(currentModalIndex - 1);
            } else {
                if (onFirstModalBack) {
                    onFirstModalBack();
                }
            }
        };

        const goToModal = (index) => {
            if (index >= 0 && index < Modals.length) {
                setCurrentModalIndex(index);
            }
        };

        const CurrentModal = Modals[currentModalIndex];
        const NextModal = nextModalIndex !== null ? Modals[nextModalIndex] : null;

        return (
            <View style={{ position: 'relative' }}>
                <Animated.View style={{ opacity: fadeOutAnim }}>
                    <CurrentModal navigation={navigation} goNext={goNext} goToModal={goToModal}  goPrevious={goPrevious} {...props} />
                </Animated.View>
                {NextModal && (
                    <Animated.View style={{ opacity: fadeInAnim, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        <NextModal navigation={navigation} goNext={goNext} goToModal={goToModal} goPrevious={goPrevious} {...props} />
                    </Animated.View>
                )}


            </View>
        );
    };
};

export default withSequentialModals;
