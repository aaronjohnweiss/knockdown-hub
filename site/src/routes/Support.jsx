import { Grid, Typography, Link} from '@mui/material';
import PageBackground from '../components/PageBackground';

export const Support = () => {
    return (
        <Grid container>
            <PageBackground imgSrc='./assets/sheik-falco.png' />
            <Grid size={{ xs: 12 }}>
                <Typography>
                    Please consider supporting those in the community who make tools like this possible:
                </Typography>
                <Typography variant='h2' fontSize='1.5em' paddingTop={1}>
                    Slippi
                </Typography>
                    <ul>
                        <li>
                        <Link to='https://slippi.gg/support' target='_blank' rel='noreferrer noopener'>
                            slippi.gg/support
                        </Link>
                        </li>
                    </ul>
                <Typography paddingBottom={2}>
                    An additional thanks to the <Link to='https://github.com/project-slippi/slippi-js' target='_blank' rel='noreferrer noopener'>
                        slippi-js
                    </Link> project contributors to help enable the real-time app features.
                </Typography>
                
                
                <Typography variant='h2' fontSize='1.5em'>
                    IKneeData
                </Typography>
                     <ul>
                        <li>
                            <Link to='https://ikneedata.com/donate.html' target='_blank' rel='noreferrer noopener'>
                                ikneedata.com/donate
                            </Link>
                        </li>
                    </ul>
            </Grid>
        </Grid>
    )
}

export default Support;