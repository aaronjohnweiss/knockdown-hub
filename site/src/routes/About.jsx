import { Box, Paper, Typography, styled } from '@mui/material';
import React from 'react';

const StlyedPaper = styled(Paper)({
    backgroundImage: 'url("fox-falcon.png")',
    'mask-image': 'linear-gradient(180deg,transparent 0%,black 10%,black 80%,transparent 100%), linear-gradient(90deg,transparent 0%,black 30%,black 90%,transparent 100%); mask-composite: intersect',
    minHeight: '300px',
    backgroundPosition: '-150px -180px',
    opacity: '20%'
});

export const Home = () => {
    return (
        <Box>
            <Typography variant='h1' textAlign='center'>Knockdown.data</Typography>
            <StlyedPaper>
            </StlyedPaper>
        </Box>
    )
}

export default Home;