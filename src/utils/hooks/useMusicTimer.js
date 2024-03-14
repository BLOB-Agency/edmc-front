import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setTimer} from "@store/musicSlice";
import useAppState from "@utils/hooks/useAppState";
import {useClaimStarDropsMutation} from "@store/api/user";

const useMusicTimer = () => {
    const dispatch = useDispatch();
    const { timer, isPlaying, timeUntilNextStar } = useSelector((state) => state.music);
    const appState = useAppState();
    const [claimStarDrops, { isLoading, isSuccess, isError, data, error }] = useClaimStarDropsMutation();

    useEffect(() => {
        let interval = null;

        // if (isPlaying && appState === 'active') {
        if (isPlaying) {
            interval = setInterval(() => {
                dispatch(setTimer(timer + 1));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isPlaying, appState, timer, dispatch]);

    // This effect handles when a star is awarded
    useEffect(() => {
        // Define an async function inside the effect
        const awardStar = async () => {
            if (timer > 0 && timer % 300 === 0) {
                console.log('Award a star!');
                try {
                    await claimStarDrops().unwrap(); // Call the async operation
                    // Handle success if needed
                } catch (err) {
                    // Handle error if needed
                }
            }
        };

        awardStar(); // Call the async function
    }, [timer, claimStarDrops]);

    return { timer, isPlaying, timeUntilNextStar };
};

export default useMusicTimer;