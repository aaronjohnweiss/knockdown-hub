
import React from 'react';
export const usePlayerPercents = () => {
    const [playerPercents, setPlayerPercents] = React.useState({});

    React.useEffect(() => {
        window.electronAPI.onPlayerPercentChange((percent) => setPlayerPercents(percent));

        // mock data lmao
        setPlayerPercents({
            0: 114,
            1: 28
        })

    }, []);

    return playerPercents;
}
