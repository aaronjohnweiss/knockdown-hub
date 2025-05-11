import { Grid, Paper, Typography, styled } from '@mui/material';
import React from 'react';

const StlyedBackground = styled(Paper)({
    position: 'absolute',
    top: 0,
    backgroundPosition: 'center',
    backgroundImage: 'url("./assets/fox-falcon.png")',
    'mask-image': 'linear-gradient(180deg,transparent 0%,black 10%,black 80%,transparent 100%), linear-gradient(90deg,transparent 0%,black 30%,black 90%,transparent 100%); mask-composite: intersect',
    backgroundRepeat: 'none',
    minHeight: '700px',
    minWidth: '100%',
    // backgroundPosition: '-150px -180px',
    opacity: '20%',
    overflow: 'hidden'
});

export const Home = () => {
    return (
        <Grid container spacing={2}>
            <StlyedBackground />
        <Grid size={{ xs: 12 }}>
            <Typography>
                In Super Smash Bros. Melee, a knockdown occurs when a character is sent into a specific vulnerable state after being hit by certain attacks. Understanding which attacks reliably induce a knockdown is critical for establishing offensive pressure, setting up guaranteed follow-ups, and mitigating an opponent's counterplay. Furthermore, the absence of a knockdown on certain hits can leave a character vulnerable to immediate retaliation, making precise knowledge of these properties essential for both offensive and defensive strategies.
            </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
            
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
            <Typography>
                Want to dive deeper into the specifics of which moves cause knockdown for each character? Head over to our interactive "Charts" page. There, you'll find comprehensive, character-specific breakdowns of moves and their knockdown properties, allowing you to explore frame data and knockback values in detail.
            </Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
            
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
            <Typography>
                Go beyond pages of data with the downloadable app for enhanced features such as real-time chart updates during Slippi matches. 
            </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
            <Typography>
                Visit the Data page to learn about this data - including collection methodology, its caveats and other limitations. Contribute your own findings to help make this resource even more comprehensive and accurate for the Melee community.
            </Typography>
        </Grid>
        </Grid>

    )
}

export default Home;