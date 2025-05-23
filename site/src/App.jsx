import { Routes, Route, Navigate } from "react-router";
import AppBar from './components/AppBar.jsx';
import Home from './routes/Home.jsx';
import Data from './routes/Data.jsx';
import Application from './routes/Application.jsx';
import About from './routes/About.jsx';
import Support from './routes/Support.jsx';
import { Container } from '@mui/material';
import PageWrapper from "./components/PageWrapper.jsx";

function App() {

  return (
    <>
      <AppBar />
      <Container component='main' maxWidth="md" sx={{ height: 'calc(100% - 56px)', display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>
        <Routes>
          <Route path='/' element={<PageWrapper />}>
            <Route index element={<Home />} />
            <Route path='data' element={<Data />} />
            <Route path='app' element={<Application />} />
            <Route path='about' element={<About />} />
            <Route path='support' element={<Support />} />
            <Route path="*" element={<Navigate to="/" replace />} />
           </Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
