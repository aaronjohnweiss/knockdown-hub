import React from 'react';

export const useNewGame = () => {
    const [players, setPlayers] = React.useState([]);
    const [user, setUser] = React.useState('');

    React.useEffect(() => {
        window.electronAPI.onNewGame((game_info) => {
            setUser(game_info.tag)
            setPlayers(game_info.players)
        });

        // mock data lmao
        setUser('aSig#701')
        setPlayers([
            { characterId: 0, connectCode: 'asig#701', user: true, displayName: 'aSig', playerIndex: 0, characterColor: 0 },
            { characterId: 15, connectCode: 'abc#1', user: false, displayName: 'Truest Guy That YK', playerIndex: 1, characterColor: 1 }
        ])

    }, []);

    const player = players.find(u => u.connectCode.toLocaleLowerCase() === user.toLocaleLowerCase());
    if (player) {
        const opponent = players.find(u => u.connectCode.toLocaleLowerCase() !== user.toLocaleLowerCase());
        return ([
            player, 
            opponent
        ])
    } else {
        return (
            players.sort((a, b) => a.playerIndex < b.playerIndex ? -1 : 1)
        )
    }
};