import { Routes, Route, Navigate } from "react-router";

import Root from "./routes/Root";
import PageWrapper from "./components/PageWrapper";
import { AppBar, Container, Toolbar, Typography, Grid, styled } from '@mui/material';

const App = () => (
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
                <Routes>
                    <Route path='/' element={<PageWrapper />}>
                        <Route index element={<Root />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </Container>
        </main>
    </>
);

export default App;