
import React from 'react';
export const usePlayerPercents = () => {
    const [playerPercents, setPlayerPercents] = React.useState({});

    React.useEffect(() => {
        window.electronAPI.onPlayerPercentChange((percent) => setPlayerPercents(percent));

        const useMockDataIfDevelop = async () => {
            const isProduction = await window.electronAPI.isProduction();
            if (!isProduction) {
                // mock data lmao
                setPlayerPercents({
                    0: 114,
                    1: 28
                })
            }
        }
        // useMockDataIfDevelop();
        

    }, []);

    return playerPercents;
}
