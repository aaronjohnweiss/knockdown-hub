import { Grid, Typography, Link, Alert, Box, useTheme, useMediaQuery, styled, Chip, Paper } from '@mui/material';

const ImgContainer = styled(Box)({
    display: 'flex', 
    justifyContent: 'center',
    marginLeft: '-56px', 
    padding: '16px'
});

const imgStyle = ({ borderRadius: '3px', filter: 'drop-shadow(3px 3px 3px #00000066)'});

export const App = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h2' fontSize='1.5em' paddingY={1}>
                    KnowYourPercents - in real time!
                </Typography>
                <Typography>
                    Download the companion app to learn and implement knockdown percents during Slippi matches. 
                    <br />
                    <br />
                    Once playing, the app will automatically:
                </Typography>
                    <ul>
                        <li>Adjust the charts to the current matchup</li>
                        <li>Highlight available moves that knockdown as percents change</li>
                    </ul>
                <Typography variant='h2' fontSize='1.5em' paddingBottom={1} paddingTop={3}>
                    Getting Started
                </Typography>
                <Alert severity="warning" sx={{ alignItems: 'center' }}>
                    Due to Slippi requiring exclusive fullscreen for best performance, this app is designed to sit on an adjacent monitor. 
                    Any attempt to overlay the application on top of gameplay will result in degraded game performance.
                </Alert>
                <ol style={{ paddingLeft: '24px' }}>
                    <li>
                        <Typography variant='p' component='h3'>
                            Install
                        </Typography>
                        <Typography>
                            Download and install the app from the <Link to='https://github.com/aaronjohnweiss/know-your-percents/releases' target='_blank' rel='noreferrer noopener'>
                                Github Releases
                            </Link> page.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='p' component='h3'>
                            Configure
                        </Typography>
                        <Typography>
                            On initial start, you will need to configure the app. This is denoted by the warning icon on the configure button in the lower corner.
                        </Typography>
                        <ImgContainer>
                            <img src='/assets/configure-1.png' width={isMobile ? '80%' : '400px'} alt='The application showing it needs configuring on start-up.' style={imgStyle} />
                        </ImgContainer>
                        <Typography>
                            Within the Configuration drawer, you can set the following values:
                        </Typography>
                        <ul>
                            <li>
                                <Box display='flex' flexDirection='row' gap={1} paddingTop={2}>
                                    <Typography>
                                        <b>Slippi Tag</b>
                                    </Typography>
                                    <Chip color="primary" size="small" label="Optional" />
                                </Box>
                                <Typography>
                                    When a game loads, the app will set the player with the slippi tag as the "Offender" automatically.
                                </Typography>
                            </li>
                            <li>
                                <Box display='flex' flexDirection='row' gap={1} paddingTop={2}>
                                    <Typography>
                                        <b>Slippi Replay Directory</b>
                                    </Typography>
                                    <Chip color="warning" size="small" label="Required" />
                                </Box>
                                <Typography>
                                    The Slippi Replay Directory where new game files are created.
                                </Typography>
                                <Alert severity="warning" sx={{ alignItems: 'center' }}>
                                    It is highly recommended you configure Slippi to separate replays based on calendar month to avoid large directory performance degredation. 
                                    In doing so, you will need to update this configuration as the calendar month changes.
                                </Alert>

                            </li>
                            <li>
                                <Box display='flex' flexDirection='row' gap={1} paddingTop={2}>
                                    <Typography>
                                        <b>Moveset Allowlist</b>
                                    </Typography>
                                    <Chip color="warning" size="small" label="Required" />
                                </Box>
                                <Typography>
                                    The moves that will appear on the realtime charts.
                                </Typography>
                                <Alert severity="info" sx={{ alignItems: 'center' }}>
                                    Despite being visually similar, the presets behave differently than the online chart due to not having character context. 
                                    Be sure to manually search for any moves that may not be covered by the presets. 
                                </Alert>
                            </li>
                        </ul>
                        <ImgContainer>
                            <img src='/assets/configure-2.png' width={isMobile ? '80%' : '400px'} alt='The application configuration page.' style={imgStyle} />
                        </ImgContainer>
                        <Typography>
                            Once configured correctly, you will see the idle state update to be "Waiting for a game..."
                        </Typography>
                        <ImgContainer>
                            <img src='/assets/configure-3.png' width={isMobile ? '80%' : '400px'} alt='The is configured.' style={imgStyle} />
                        </ImgContainer>
                    </li>
                    <li>
                        <Typography variant='p' component='h3' >
                            Gameplay
                        </Typography>
                        <Typography>
                            You're ready to play! Hop into any Slippi game to see knockdown charts. They will update in realtime in green when the recipient's percent threshold exceeds the entry.
                        </Typography>
                        <Alert severity="info" sx={{ alignItems: 'center' }}>
                            Doubles matches not supported.
                        </Alert>
                        <ImgContainer>
                            <img src='/assets/gameplay.png' width={isMobile ? '80%' : '400px'} alt='The app during live gameplay.' style={imgStyle} />
                        </ImgContainer>
                        <Typography variant='p' component='h4'>
                            Adjustments
                        </Typography>
                        <Box p={1}>
                            <Alert severity="info" sx={{ alignItems: 'center' }}>
                                These setting will be remembered between games, but not saved on app exit.
                            </Alert>
                        </Box>
                        <ul style={{ paddingLeft: '32px' }}>
                            <li>
                                <Typography>
                                    You can switch characters just as you can in the online charts. 
                                </Typography>
                                <ImgContainer sx={{ marginLeft: '-90px'}}>
                                    <img src='/assets/adjust-1.png' alt='The app showing an option to swap characters.' style={imgStyle} />
                                </ImgContainer>
                            </li>
                            <li>
                                <Typography>
                                    You can switch to true CC values in the table header. 
                                </Typography>
                                <ImgContainer sx={{ marginLeft: '-90px'}}>
                                    <img src='/assets/adjust-2.png' alt='The app showing an option to swap what data is charted.' style={imgStyle} />
                                </ImgContainer>
                            </li>
                            <li>
                                <Typography>
                                    Yoshi DJA values currently cannot be toggled to in-app. Please use the data page for now.
                                </Typography>
                            </li>
                        </ul>
                        
                    </li>
                </ol>
                <Typography variant='h2' fontSize='1.5em' paddingBottom={1} paddingTop={3}>
                    Enjoy!
                </Typography>
                <Typography>
                    Please report issues you find either in the <Link to='https://discord.gg/dkq87bwwwE' target='_blank' rel='noreferrer noopener'>
                    discord server
                    </Link> or the project <Link to='https://github.com/aaronjohnweiss/know-your-percents/issues' target='_blank' rel='noreferrer noopener'>
                    issues
                    </Link> page.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default App;