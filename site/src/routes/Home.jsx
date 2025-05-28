import { Grid, Typography, Link } from '@mui/material';
import PageBackground from '../components/PageBackground';

export const Home = () => {
    return (
        <Grid container spacing={2}>
        <PageBackground imgSrc='./assets/fox-falcon.png' />
        <Grid size={{ xs: 12 }}>
            <Typography paddingBottom={1}>
                Welcome to KnowYourPercents! A specialized site and companion app for learning Knockdown percentages in Super Smash Bros. Melee.
            </Typography>
            <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                What is Knockdown?
            </Typography>
            <Typography>
                In Super Smash Bros. Melee, a knockdown occurs when a character is sent into a specific vulnerable state (DamageFall, also known as tumble) after being hit a strong enough attack alongside other factors such as recipient character weight. Understanding which attacks reliably induce a knockdown is critical for establishing offensive pressure and setting up guaranteed follow-ups. Furthermore, the absence of a knockdown on certain hits can leave a character vulnerable to immediate retaliation, making the knowledge of these properties essential for both offensive and defensive strategies.
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
                    On this site - the <Link to='/data'>data</Link> page contains comprehensive, matchup-specific breakdowns of moves and their knockdown properties, allowing you to explore frame data and knockback values in detail.
                </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
                <Typography paddingBottom={1}>
                    Externally, the <Link to='https://ikneedata.com/calculator.html' target='_blank' rel='noreferrer noopener'>IKneeData Calculator</Link> - created by Schmoo and GentleFox - is a complete and accurate resource for specific character interactions, and was the basis for the data used in this project.
                </Typography>
                <Typography paddingBottom={1}>
                    This smashboards post by Kadano explains the in-depth mechanics behind knockback & tumble: <Link to='https://smashboards.com/threads/kadanos-perfect-marth-class-advanced-frame-data-application.337035/' target='_blank' rel='noreferrer noopener'>Kadano's perfect Marth class -- advanced frame data application</Link>
                </Typography>
                <Typography paddingBottom={1}>
                    <Link to='https://www.fightcore.gg/' target='_blank' rel='noreferrer noopener'>FightCore</Link> is an in-depth melee frame data resource which includes a "Crouch Cancel Calculator" that breaks down knockdown percentages across all hitboxes and even offers move staleness considerations.
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
                Tell me more
            </Typography>
            <Typography>
                Visit the <Link to='/about'>about</Link> page to learn about this data - including collection methodology, its caveats and other limitations. Contribute your own findings to help make this resource even more comprehensive and accurate for the Melee community.
            </Typography>
        </Grid>
        </Grid>

    )
}

export default Home;