import React, { createContext, useContext, useState } from 'react';

const CurrentSongContext = createContext();

export const CurrentSongProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </CurrentSongContext.Provider>
    );
};

export const useCurrentSong = () => {
    return useContext(CurrentSongContext);
};
