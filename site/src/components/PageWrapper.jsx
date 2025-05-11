
import { Box, Typography } from '@mui/material';
import { useLocation, Outlet } from 'react-router';
import Footer from './Footer';

const breadcrumbNameMap = {
  '/': 'Knockdown Hub',
  '/app': 'App',
  '/charts': 'Charts',
  '/data': 'Data',
  '/support': 'Support',
};

export const PageWrapper = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/');
    console.log(pathnames);

    return (
        <Box display='flex' flexDirection='column' sx={{ flexGrow: 1 }}>
            <Typography variant='h1' component='h1' fontSize={'2em'} sx={{ marginY: 3 }}>
                {breadcrumbNameMap[`/${pathnames[pathnames.length - 1]}`]}
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}

export default PageWrapper;