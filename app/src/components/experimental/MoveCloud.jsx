import React from 'react';
import { 
    Box, 
    IconButton, 
    Paper, 
    Tooltip, 
    useMediaQuery, 
    Typography, 
    Grid,
    Fade
} from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import knockdown_data from '../../../../shared/knockdown_data.json';
import cc_knockdown_data from '../../../../shared/cc_knockdown_data.json';
import characters from '../../../../shared/characters.json';



export const MoveCloud = ({ offender, recipient, allowedMoves, playerPercents }) => {

    const offenderWeights = React.useMemo(() => {
        const weights = {};
        const moves = Object.keys(knockdown_data[`${offender.characterId}`]);
        moves.forEach((mv) => weights[mv] = Math.floor(Math.random() * 4) + 1);
        return weights;
    }, [offender])

    const offenderMoves = React.useMemo(() => Object.keys(knockdown_data[`${recipient.characterId}`])
        .filter(move => {
            return knockdown_data[`${recipient.characterId}`][move][offender.characterId] > -1
        })
        .filter(move => allowedMoves.includes(move))
        .sort((a, b) => {
            return knockdown_data[`${recipient.characterId}`][a][offender.characterId] - knockdown_data[`${recipient.characterId}`][b][offender.characterId]
        })
        .map(move => ({ move, asdi: knockdown_data[`${recipient.characterId}`][move][offender.characterId], weight: offenderWeights[move] })),
        [offender, recipient, allowedMoves, offenderWeights]
    );

    // const spiralMoves = React.useMemo(() => {
    //     const sortedMoves = offenderMoves.sort((a, b) => b.weight - a.weight);
    //     const spiralSortedArray = [];
    //     let side = 1;

    //     sortedMoves.forEach((mv) => {
    //         if (side > 0) {
    //             spiralSortedArray.push(mv)
    //         } else {
    //             spiralSortedArray.unshift(mv)
    //         }
    //         side *= -1
    //     })

    //     return (spiralSortedArray)
    // }, [offenderMoves]);

    const recipientWeights = React.useMemo(() => {
        const weights = {};
        // test
        const moves = Object.keys(knockdown_data[`${recipient.characterId}`]);
        moves.forEach((mv) => weights[mv] = Math.floor(Math.random() * 4) + 1);
        return weights;
    }, [offender])

    const recipientMoves = React.useMemo(() => Object.keys(knockdown_data[`${offender.characterId}`])
        .filter(move => {
            return knockdown_data[`${offender.characterId}`][move][recipient.characterId] > -1
        })
        .filter(move => allowedMoves.includes(move))
        .sort((a, b) => {
            return knockdown_data[`${offender.characterId}`][a][recipient.characterId] - knockdown_data[`${offender.characterId}`][b][recipient.characterId]
        })
        .map(move => ({ move, asdi: knockdown_data[`${offender.characterId}`][move][recipient.characterId], weight: recipientWeights[move] })),
        [offender, recipient, allowedMoves, recipientWeights]
    );

    // const spiralRecipientMoves = React.useMemo(() => {
    //     const sortedMoves = recipientMoves.sort((a, b) => b.weight - a.weight);
    //     const spiralSortedArray = [];
    //     let side = 1;

    //     sortedMoves.forEach((mv) => {
    //         if (side > 0) {
    //             spiralSortedArray.push(mv)
    //         } else {
    //             spiralSortedArray.unshift(mv)
    //         }
    //         side *= -1
    //     })

    //     return (spiralSortedArray)
    // }, [recipientMoves]);

    return (
        <Grid container spacing={2} >
            <Grid size={{ xs: 12 }}>
                <Box display='flex'  flexDirection='row' alignItems='center'>
                    <IconButton>
                        <img src={`./assets/icons/${recipient.characterId}-${characters[recipient.characterId].colors[recipient.characterColor]}.png`} />
                    </IconButton>
                    <IconButton>
                        <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                    <IconButton>
                        <img src={`./assets/icons/${offender.characterId}-${characters[offender.characterId].colors[offender.characterColor]}.png`} />
                    </IconButton>
                    <Typography variant='h2' component='p' fontSize='1.75em' minWidth='75px' textAlign='left'>
                        {Math.round(playerPercents[offender.playerIndex])}%
                    </Typography>
                </Box>         
                <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='center'>
                    {offenderMoves.map((mv) => (
                        <Paper 
                        key={`move-cloud-${mv.move}`} 
                        data-testid={mv.weight} 
                        elevation={5}
                        sx={{
                            height: theme =>  theme.spacing(6 + (2 * mv.weight)),
                            width: theme => theme.spacing(6 + (2 * mv.weight)),
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundColor: theme => playerPercents[offender.playerIndex] > mv.asdi ? theme.palette.error.main : null
                        }}>
                            <Typography>
                                {mv.move}
                            </Typography>
                            <Typography>
                                {mv.asdi}%
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Box display='flex'  flexDirection='row' alignItems='center'>
                    <IconButton>
                        <img src={`./assets/icons/${offender.characterId}-${characters[offender.characterId].colors[offender.characterColor]}.png`} />
                    </IconButton>
                    <IconButton>
                        <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                    <IconButton>
                        <img src={`./assets/icons/${recipient.characterId}-${characters[recipient.characterId].colors[recipient.characterColor]}.png`} />
                    </IconButton>
                    <Typography variant='h2' component='p' fontSize='1.75em' minWidth='75px'>
                        {Math.round(playerPercents[recipient.playerIndex])}%
                    </Typography>
                </Box>
                <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='center'>
                    {recipientMoves.map((mv) => (
                        <Paper 
                        key={`move-cloud-${mv.move}`} 
                        data-testid={mv.weight} 
                        elevation={5}
                        sx={{
                            height: theme =>  theme.spacing(6 + (2 * mv.weight)),
                            width: theme => theme.spacing(6 + (2 * mv.weight)),
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundColor: theme => playerPercents[recipient.playerIndex] > mv.asdi ? theme.palette.success.main : null
                        }}>
                            <Typography>
                                {mv.move}
                            </Typography>
                            <Typography>
                                {mv.asdi}%
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Grid>
        </Grid>
    )
}

export default MoveCloud;