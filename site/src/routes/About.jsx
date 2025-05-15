import { Grid, Paper, Typography, styled } from '@mui/material';
import { Link } from 'react-router';

const StlyedBackground = styled(Paper)({
    position: 'absolute',
    top: 0,
    backgroundImage: 'url("./assets/fox-falcon.png")',
    maskImage: 'linear-gradient(180deg,transparent 0%,black 30%,black 80%,transparent 100%), linear-gradient(90deg,transparent 0%,black 40%,black 70%,transparent 100%); mask-composite: intersect',
    backgroundRepeat: 'no-repeat',
    minHeight: '700px',
    left: '30%',
    right: '0',
    backgroundPosition: 'center',
    opacity: '10%',
    overflow: 'hidden',
    zIndex: -5
});

export const Home = () => {
    return (
        <Grid container spacing={2}>
            <StlyedBackground />
        <Grid size={{ xs: 12 }}>
            <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                What is Knockdown?
            </Typography>
            <Typography>
                In Super Smash Bros. Melee, a knockdown occurs when a character is sent into a specific vulnerable state after being hit a strong enough attack. Understanding which attacks reliably induce a knockdown is critical for establishing offensive pressure and setting up guaranteed follow-ups. Furthermore, the absence of a knockdown on certain hits can leave a character vulnerable to immediate retaliation, making the knowledge of these properties essential for both offensive and defensive strategies.
            </Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
        </Grid>
        <Grid container size={{ xs: 12 }} spacing={1}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em'>
                    Where can I learn Knockdown percents?
                </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
                <Typography>
                    On this site - the <Link to='/charts'>charts</Link> page contains comprehensive, matchup-specific breakdowns of moves and their knockdown properties, allowing you to explore frame data and knockback values in detail.
                </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
                <Typography paddingBottom={1}>
                    Externally, the <Link to='https://ikneedata.com/calculator.html' target='_blank' rel='noreferrer noopener'>IKneeData Calculator</Link> - created by Schmoo and GentleFox - is a complete and accurate resource for specific character interactions, and was the basis for the data used in this project.
                </Typography>
            </Grid>      
        </Grid>

        <Grid size={{ xs: 12 }}>
            <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                How can I apply this information?
            </Typography>
            <Typography>
                Go beyond pages of data with the <Link to='/app'>downloadable app</Link> for enhanced features such as real-time knockdown chart updates during Slippi matches. 
            </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
            <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                Show me the data
            </Typography>
            <Typography>
                Visit the <Link to='/data'>data</Link> page to learn about this data - including collection methodology, its caveats and other limitations. Contribute your own findings to help make this resource even more comprehensive and accurate for the Melee community.
            </Typography>
        </Grid>
        </Grid>

    )
}

export default Home;