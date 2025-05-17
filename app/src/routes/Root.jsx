import React from 'react';
import { useNavigate } from 'react-router';
import { Box, IconButton, Badge } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Idle from '../components/Idle';
import RealtimeKnockdowns from '../components/RealtimeKnockdowns';
import Configure from '../components/Configure';
import { useNewGame } from '../hooks/useNewGame';
import { usePlayerPercents } from '../hooks/usePlayerPercents';

export const Root = () => {
    const navigate = useNavigate();
    const players = useNewGame();
    const playerPercents = usePlayerPercents();
    const [swapCharacters, setSwapCharacters] = React.useState(false);
    const [allowedMoves, setAllowedMoves] = React.useState(['uair', 'dair', 'fair', 'nair']);
    const [configureOpen, setConfigureOpen] = React.useState(false);
    const [ offender, recipient ] = React.useMemo(() => swapCharacters ? players : [...players].reverse(), [players, swapCharacters]);
    

    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start' sx={{ flexGrow: 1, paddingTop: 2 }}>
            {!players.length ? (
                <Idle sx={{ justifySelf: 'center', alignSelf: 'center' }} />
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
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    paddingBottom: 1
                }}
            >
                <IconButton onClick={() => setConfigureOpen(true)}>
                    <Badge badgeContent={'!'} color={'warning'} >
                        <SettingsIcon />
                    </Badge>
                </IconButton>
            </Box>
            <Configure open={configureOpen} onClose={() => setConfigureOpen(false)} />
        </Box>
    )
}

export default Root;