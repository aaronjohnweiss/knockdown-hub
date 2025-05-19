import { Routes, Route, Navigate } from "react-router";

import Root from "./routes/Root";
import PageWrapper from "./components/PageWrapper";
import { AppBar, Container, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import Background from "./components/Background";
import favicon from '../../shared/assets/favicon/favicon-16.png';

const App = () => {
    return (
    <>
        <AppBar position="fixed" sx={{ maxHeight: '31px', appRegion: 'drag', zIndex: (theme) => theme.zIndex.drawer + 1  }}>
            <Toolbar variant="dense" sx={{ minHeight: '31px', marginLeft: -1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src={favicon} />
                <Typography variant='body2'  paddingTop='3px'>
                    KnowYourPercents
                </Typography>
            </Toolbar>
        </AppBar>
        <Toolbar variant='dense' sx={{ minHeight: '31px' }} />
        <main style={{ height: 'calc(100% - 31px)', display: 'flex', alignItems: 'stretch' }}>
            <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', flexDirection: 'column', flex: '1' }}>
                <Routes>
                    <Route path='/' element={<PageWrapper />}>
                        <Route index element={<Root />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </Container>
            <Background />
        </main>
    </>
)};

export default App;