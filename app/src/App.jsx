import React from 'react';
import Idle from './components/Idle';
import { AppBar, Container, Toolbar, Typography, Grid, styled } from '@mui/material';

const StyledMain = styled('main')({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    }
});

const Root = () => (
    <>
        <AppBar position="fixed" sx={{ maxHeight: '31px', appRegion: 'drag'  }}>
            <Toolbar variant="dense" sx={{ minHeight: '31px', marginLeft: -1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src='/assets/favicon/favicon-16.png' />
                <Typography variant='body2'  paddingTop='3px'>
                    KnowYourPercents
                </Typography>
            </Toolbar>
        </AppBar>
        <Toolbar variant='dense' sx={{ minHeight: '31px' }} />
        <main style={{ height: 'calc(100% - 31px)' }}>
            <Container maxWidth="md" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Idle sx={{ justifySelf: 'center', alignSelf: 'center' }} />
            </Container>
        </main>
    </>
);

export default Root;