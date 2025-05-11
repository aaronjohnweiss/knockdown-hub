import { Breadcrumbs, Typography, Link } from '@mui/material';
import {
  Link as RouterLink, useLocation
} from 'react-router';

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
        <Breadcrumbs aria-label="breadcrumb" separator="-" sx={{ position: "fixed", bottom: 15, color: theme => theme.palette.text.primary }}>
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
    )
}

export default Footer;