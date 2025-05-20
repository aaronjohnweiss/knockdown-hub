import { Grid, Typography, Link } from '@mui/material';

export const App = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    Know your percents - in real time
                </Typography>
                <Typography>
                    Download the companion app to learn and implement the percents you learn during Slippi matches. 
                    <br />
                    <br />
                    Once playing, the app will automatically:
                </Typography>
                    <ul>
                        <li>Adjust the charts to the current matchup</li>
                        <li>Highlight percent thresholds as percents change</li>
                    </ul>
                <Typography>
                    Want to practice your defensive game? Switch characters to see your opponent's knockdown windows against you.
                </Typography>
                <Typography variant='h2' fontSize='1.5em' paddingBottom={1} paddingTop={3}>
                    Download
                </Typography>
                <Typography>
                    Visit the project's <Link to='https://github.com/aaronjohnweiss/know-your-percents/releases' target='_blank' rel='noreferrer noopener'>
                        Github Releases
                    </Link> page to download the app!
                </Typography>
            </Grid>
        </Grid>
    )
}

export default App;