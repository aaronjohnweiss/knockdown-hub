import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import Slide from '@mui/material/Slide';

export const PageWrapper = () => {
    return (
        <>
            <Slide direction="left" >
                <Outlet />
            </Slide>
        </>
    )
}

export default PageWrapper;