function formatNamesWithAnd(array) {
    if (array.length === 0) {
        return '';
    }

    const names = array.map(obj => obj.username);

    if (names.length === 1) {
        return names[0];
    }

    const allButLast = names.slice(0, -1).join(", ");
    const lastName = names[names.length - 1];

    return `${allButLast} & ${lastName}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${paddedSeconds}`;
}


export {
    formatNamesWithAnd, formatTime
}