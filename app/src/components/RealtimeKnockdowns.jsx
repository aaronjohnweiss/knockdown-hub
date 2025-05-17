import React from 'react';
import { 
    Box, 
    IconButton, 
    Paper, 
    Tooltip, 
    useMediaQuery, 
    Typography, 
    Grid
} from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import knockdown_data from '../../../shared/knockdown_data.json';
import cc_knockdown_data from '../../../shared/cc_knockdown_data.json';
import characters from '../../../shared/characters.json';
import KnockdownTable from './KnockdownTable';


export const RealtimeKnockdowns = ({ offender, recipient, handleSwap, allowedMoves, playerPercents }) => {

    const condenseView = useMediaQuery('(max-width: 320px)');
    const knockdowns = React.useMemo(() => {
        return ({
            asdi: knockdown_data[`${offender.characterId}`],
            cc: cc_knockdown_data[`${offender.characterId}`]
        })
    }, [offender]);

    const tableRows = React.useMemo(() => Object.keys(knockdowns.asdi)
        .filter(move => knockdowns.asdi[move][recipient.characterId] > -1)
        .filter(move => allowedMoves.includes(move))
        .sort((a, b) => knockdowns.asdi[a][recipient.characterId] - knockdowns.asdi[b][recipient.characterId])
        .map(move => ({ move, asdi: knockdowns.asdi[move][recipient.characterId], cc: knockdowns.cc[move][recipient.characterId] })),
        [recipient, knockdowns, allowedMoves]
    );

    return (
        <Grid container spacing={2} >
            <Grid size={{ xs: 12 }}>

                <Box display='flex' flexDirection='row' justifyContent='center'>
                    <Paper elevation={5} sx={{ display: 'flex', flexShrink: 1, gap: 0.5, padding: 1, alignItems: 'center' }}>
                        <Typography variant='h2' component='p' fontSize='1.75em' minWidth='75px' textAlign='left' sx={{ display: condenseView ? 'none' : 'inherit' }}>
                            {playerPercents[offender.playerIndex]}%
                        </Typography>
                        <IconButton>
                            <img src={`./assets/icons/${offender.characterId}-${characters[offender.characterId].colors[offender.characterColor]}.png`} />
                        </IconButton>
                        <Tooltip title='Swap Characters'>
                            <IconButton onClick={handleSwap}>
                                <KeyboardDoubleArrowRightIcon />
                            </IconButton>
                        </Tooltip>
                        <IconButton>
                            <img src={`./assets/icons/${recipient.characterId}-${characters[recipient.characterId].colors[recipient.characterColor]}.png`} />
                        </IconButton>
                        <Typography variant='h2' component='p' fontSize='1.75em' minWidth='75px' textAlign='right'>
                            {playerPercents[recipient.playerIndex]}%
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <KnockdownTable rows={tableRows} recipientPercent={playerPercents[recipient.playerIndex]} />
            </Grid>
        </Grid>
    )
}

export default RealtimeKnockdowns;