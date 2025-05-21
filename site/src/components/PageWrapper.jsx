import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, Outlet } from 'react-router';
import Footer from './Footer';

const breadcrumbNameMap = {
  '/': 'Welcome',
  '/app': 'App',
  '/charts': 'Charts',
  '/data': 'Data',
  '/support': 'Support',
};

export const PageWrapper = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/');

    React.useEffect(() => {
        document.title = `KnowYourPercents - ${breadcrumbNameMap[`/${pathnames[pathnames.length - 1]}`]}`
    }), [pathnames];

    return (
        <Box display='flex' flexDirection='column' sx={{ flexGrow: 1, alignItems: 'stretch' }} >
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