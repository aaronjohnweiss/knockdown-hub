import React from 'react';
import { Box, IconButton, Paper, Tooltip, Divider, Typography, Grid } from '@mui/material';
import { CharacterSelector } from './CharacterSelector';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import knockdown_data from '../../../../shared/knockdown_data.json';
import MovesetFilter from './MovesetFilter';
import PresetChip from './PresetChip';

export const Knockdowns = () => {
    const [offenderId, setOffenderId] = React.useState(0);
    const [recipientId, setRecipientId] = React.useState(0);
    const [allowedMoves, setAllowedMoves] = React.useState([]);


    const handleSwap = React.useCallback(() => {
        const newOffender = offenderId;
        setOffenderId(recipientId);
        setRecipientId(newOffender);
    }, [offenderId, recipientId]);

    const handlePresetClick = React.useCallback((preset, add) => {
        let newAllowedMoves = [];
        if (add) {
            newAllowedMoves = [...new Set([ ...allowedMoves, ...preset ])]
        } else {
            newAllowedMoves = allowedMoves.filter(mv => !preset.includes(mv));
        }
        setAllowedMoves(newAllowedMoves);
    }, [allowedMoves])

    const knockdowns = React.useMemo(() => {
        return knockdown_data[`${offenderId}`]
    }, [offenderId]);

    const rows = React.useMemo(() => Object.keys(knockdowns)
        .filter(move => knockdowns[move][recipientId] > -1)
        .filter(move => allowedMoves.includes(move))
        .sort((a, b) => knockdowns[a][recipientId] - knockdowns[b][recipientId]),
        [recipientId, knockdowns, allowedMoves]
    );

    return (
        <Grid container spacing={2} >
            <Grid size={{ xs: 12, sm: 8 }}>
                <Typography variant='h5' component='h2' sx={{ paddingBottom: 2 }} >
                    Select Characters
                </Typography>
                <Box display='flex' flexDirection='row' justifyContent='center'>
                    <Paper elevation={2} sx={{ display: 'flex', flexShrink: 1, gap: 2, padding: 1 }}>
                        <CharacterSelector title='Offender' characterId={offenderId} selectCharacter={(id) => setOffenderId(id)} />
                        <Tooltip title='Swap Characters'>
                            <IconButton onClick={handleSwap}>
                                <KeyboardDoubleArrowRightIcon />
                            </IconButton>
                        </Tooltip>
                        <CharacterSelector title='Recipient' characterId={recipientId} selectCharacter={(id) => setRecipientId(id)} />
                    </Paper>
                </Box>
                <Typography variant='h5' component='h2' sx={{ paddingY: 2 }} >
                    Filters
                </Typography>
                <MovesetFilter value={allowedMoves} setValue={setAllowedMoves} />
                <Typography variant='subtitle2' component='h3' sx={{ paddingY: 2 }} >
                    Presets
                </Typography>
                <Box display='flex' gap={1} flexDirection='row' flexWrap='wrap'>
                    <PresetChip 
                        presetName='Aerials' 
                        currentMoves={allowedMoves}  
                        preset={['upair', 'fair', 'bair', 'dair', 'nair', 'zair']}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName='Tilts' 
                        currentMoves={allowedMoves}  
                        preset={['dtilt', 'utilt', 'ftilt']}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName='Smashes' 
                        currentMoves={allowedMoves}  
                        preset={['dsmash', 'usmash', 'fsmash']}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName='Specials' 
                        currentMoves={allowedMoves}  
                        preset={['upSpecial', 'neutralSpecial', 'sideSpecial', 'downSpecial']}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName='Throws' 
                        currentMoves={allowedMoves}  
                        preset={['uthrow', 'dthrow', 'fthrow', 'bthrow']}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName="All (Offender)"
                        currentMoves={allowedMoves}  
                        preset={Object.keys(knockdowns)}
                        handleAction={handlePresetClick}
                    />
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant='h5' component='h2' sx={{ paddingY: 2 }} >
                    Knockdowns
                </Typography>
                <Paper key={`knockdowns-${offenderId}-${recipientId}`} elevation={3} sx={{ maxHeight: '600px', overflow: 'auto' }}>
                    {rows.map((key, idx) => (
                        <div key={idx}>
                            <Box
                                display='flex'
                                flexDirection='row'
                                p={1}
                            >
                                <Typography sx={{ flexGrow: 1 }} >
                                    {key}
                                </Typography>
                                <Typography sx={{ paddingRight: 2 }}>
                                    {knockdowns[key][recipientId]}%
                                </Typography>
                            </Box>
                            {idx !== rows.length - 1 && <Divider flexItem orientation='horizontal' />}
                        </div>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Knockdowns;