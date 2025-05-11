
import { Box, Typography } from '@mui/material';
import { useLocation, Outlet } from 'react-router';
import Footer from './Footer';

const breadcrumbNameMap = {
  '/': 'Home',
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
        <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1' fontSize={'2em'} sx={{ marginY: 3 }}>
                {breadcrumbNameMap[`/${pathnames[pathnames.length - 1]}`]}
            </Typography>
            <Outlet />
            <Footer />
        </Box>
    )
}

export default PageWrapper;