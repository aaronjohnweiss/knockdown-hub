import { Box, Breadcrumbs, Typography, Link, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router';
import BlueskyIcon from './BlueskyIcon';
import DiscordIcon from './DiscordIcon';

const breadcrumbNameMap = {
  '/': 'Home',
  '/app': 'App',
  '/charts': 'Charts',
  '/data': 'Data',
  '/support': 'Support',
};

export const Footer = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box display='flex' flexDirection='row' alignItems='center'>
            <Breadcrumbs aria-label="breadcrumb" separator="-" sx={{ paddingY: 3, color: theme => theme.palette.text.primary }}>
                <Link 
                    underline="hover" 
                    color="inherit" 
                    to="/"
                    component={RouterLink}
                >
                    <Typography sx={{ color: theme => theme.palette.text.primary }}>
                        Home
                    </Typography>
                </Link>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                    <Typography key={to} sx={{ color: theme => theme.palette.text.primary }}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                    ) : (
                    <Link 
                    underline="hover" 
                    color="inherit" 
                    to={to} 
                    key={to}
                    component={RouterLink}
                    >
                        {breadcrumbNameMap[to]}
                    </Link>
                    );
                })}
            </Breadcrumbs>
            <Box flexGrow={1} />
            <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
                <Link 
                    underline="hover" 
                    color="inherit" 
                    to="/support"
                    component={RouterLink}
                >
                    <Typography sx={{ color: theme => theme.palette.text.primary }}>
                        Support
                    </Typography>
                </Link>
                <IconButton
                    aria-label="Bluesky Social Account"
                    color="inherit"
                    component={Link}
                    to={`https://bsky.app/profile/aaronjohnweiss.bsky.social`}
                    target='_blank'
                >
                    <BlueskyIcon />
                </IconButton>
                <IconButton
                    aria-label="Project Discord"
                    color="inherit"
                    component={Link}
                    to={`https://discord.gg/dkq87bwwwE`}
                    target='_blank'
                >
                    <DiscordIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Footer;