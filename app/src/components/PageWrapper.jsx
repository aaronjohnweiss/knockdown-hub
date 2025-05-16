import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';


export const PageWrapper = () => {
    return (
        <Outlet />
    )
}

export default PageWrapper;