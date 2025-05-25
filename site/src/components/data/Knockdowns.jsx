import React from 'react';
import { 
    Box, 
    IconButton, 
    Paper, 
    Tooltip, 
    Typography, 
    Grid,
    Fade
} from '@mui/material';
import { CharacterSelector } from './CharacterSelector';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { aerials, throws, misc, specials, moveset_list } from '../../../../shared/moveset_list';
import knockdown_data from '../../../../shared/knockdown_data.json';
import cc_knockdown_data from '../../../../shared/cc_knockdown_data.json';
import ys_knockdown_data from '../../../../shared/ys_knockdown_data.json';
import MovesetFilter from './MovesetFilter';
import PresetChip from './PresetChip';
import KnockdownTable from './KnockdownTable';

export const Knockdowns = () => {
    const [offenderId, setOffenderId] = React.useState(0);
    const [recipientId, setRecipientId] = React.useState(0);
    const [allowedMoves, setAllowedMoves] = React.useState([]);
    const [characterSwapHover, setCharacterSwapHover] = React.useState(false);

    const handleSwap = React.useCallback(() => {
        setCharacterSwapHover(false)
        const newOffender = offenderId;
        setOffenderId(recipientId);
        setRecipientId(newOffender);
        setCharacterSwapHover(false)
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
        return ({
            asdi: knockdown_data[`${offenderId}`],
            cc: cc_knockdown_data[`${offenderId}`]
        })
    }, [offenderId]);

    const tableRows = React.useMemo(() => Object.keys(knockdowns.asdi)
        .filter(move => knockdowns.asdi[move][recipientId] > -1)
        .filter(move => allowedMoves.includes(move))
        .sort((a, b) => knockdowns.asdi[a][recipientId] - knockdowns.asdi[b][recipientId])
        .map(move => ({ move, asdi: knockdowns.asdi[move][recipientId], cc: knockdowns.cc[move][recipientId], ys: ys_knockdown_data[offenderId][move] })),
        [recipientId, knockdowns, allowedMoves]
    );

    const presets = React.useMemo(() => ({
        aerials: Object.keys(knockdowns.asdi).filter(item => aerials.includes(item)),
        specials: Object.keys(knockdowns.asdi).filter(item => specials.includes(item)),
        throws: Object.keys(knockdowns.asdi).filter(item => throws.includes(item)),
        misc: Object.keys(knockdowns.asdi).filter(item => misc.includes(item))
    }), [knockdowns])


    return (
        <Grid container spacing={2} >
            <Grid size={{ xs: 12, sm: 12, md: 7 }}>
                <Typography variant='h5' component='h2' sx={{ paddingBottom: 2 }} >
                    Select Characters
                </Typography>
                <Box display='flex' flexDirection='row' justifyContent='center'>
                    <Paper elevation={2} sx={{ display: 'flex', flexShrink: 1, gap: 2, padding: 1 }}>
                        <CharacterSelector title='Offender' characterId={offenderId} selectCharacter={(id) => setOffenderId(id)} />
                        <Tooltip title='Swap Characters'>
                            <IconButton 
                                onClick={handleSwap}
                                onMouseEnter={() => setCharacterSwapHover(true)} 
                                onFocus={() => setCharacterSwapHover(true)}
                                onMouseLeave={() => setCharacterSwapHover(false)}
                                onBlur={() => setCharacterSwapHover(false)}
                            >
                                {characterSwapHover ? <SwapHorizIcon /> : <Fade in><KeyboardDoubleArrowRightIcon /></Fade>}
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
                        preset={presets.aerials}
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
                        preset={presets.specials}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName='Throws' 
                        currentMoves={allowedMoves}  
                        preset={presets.throws}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName='Misc' 
                        currentMoves={allowedMoves}  
                        preset={presets.misc}
                        handleAction={handlePresetClick}
                    />
                    <PresetChip 
                        presetName="All (Offender)"
                        currentMoves={allowedMoves}  
                        preset={Object.keys(knockdowns.asdi)}
                        handleAction={handlePresetClick}
                    />   
                    <PresetChip 
                        presetName="All"
                        currentMoves={allowedMoves}  
                        preset={moveset_list}
                        handleAction={handlePresetClick}
                    />                 
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 5 }} gap={1}>
                <Typography variant='h5' component='h2' sx={{ paddingBottom: 2 }} >
                    Knockdowns
                </Typography>
                <KnockdownTable rows={tableRows} recipientId={recipientId} />
            </Grid>
        </Grid>
    )
}

export default Knockdowns;