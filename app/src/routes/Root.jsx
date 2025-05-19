import React from 'react';
import { Box, IconButton, Badge } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Idle from '../components/Idle';
import RealtimeKnockdowns from '../components/RealtimeKnockdowns';
import Configure from '../components/Configure';
import { useNewGame } from '../hooks/useNewGame';
import { usePlayerPercents } from '../hooks/usePlayerPercents';
import { set } from 'lodash';

export const Root = () => {
    const players = useNewGame();
    const playerPercents = usePlayerPercents();
    const [swapCharacters, setSwapCharacters] = React.useState(false);
    const [allowedMoves, setAllowedMoves] = React.useState(['uair', 'dair', 'fair', 'nair']);
    const [configured, setConfigured] = React.useState(false);
    const [configureOpen, setConfigureOpen] = React.useState(false);
    const [ offender, recipient ] = React.useMemo(() => swapCharacters ? players : [...players].reverse(), [players, swapCharacters]);
    
    React.useEffect(() => {
        window.electronAPI.onUpdateFilters(({ moveset }) => setAllowedMoves(moveset));
    }, []);

    return (
        <Box display='flex' flexDirection='column' alignContent='stretch' justifyContent='flex-start' sx={{ flexGrow: 1, paddingTop: 2 }}>
            {!players.length ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <Idle context={configured ? 'game' : 'setup'} />
                </Box>
            ) : (
                <RealtimeKnockdowns 
                    offender={offender} 
                    recipient={recipient} 
                    handleSwap={() => setSwapCharacters(!swapCharacters)} 
                    allowedMoves={allowedMoves} 
                    playerPercents={playerPercents}
                />
            )}
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    paddingY: 1
                }}
            >
                <IconButton onClick={() => setConfigureOpen(true)}>
                    <Badge badgeContent={configured ? null : '!'} color={'warning'} >
                        <SettingsIcon />
                    </Badge>
                </IconButton>
            </Box>
            <Configure open={configureOpen} onClose={() => setConfigureOpen(false)} onFulfilled={(val) => setConfigured(val)} allowedMoves={allowedMoves} setAllowedMoves={setAllowedMoves} />
        </Box>
    )
}

export default Root;