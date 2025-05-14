import { Routes, Route } from "react-router";
import AppBar from './components/AppBar.jsx';
import About from './routes/About.jsx';
import Charts from './routes/Charts.jsx';
import Application from './routes/Application.jsx';
import Data from './routes/Data.jsx';
import Support from './routes/Support.jsx';
import { Container } from '@mui/material';
import PageWrapper from "./components/PageWrapper.jsx";

function App() {

  return (
    <>
      <AppBar />
      <Container maxWidth="md" sx={{ height: 'calc(100% - 56px)', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        <Routes>
          <Route path='/' element={<PageWrapper />}>
            <Route index element={<About />} />
            <Route path='charts' element={<Charts />} />
            <Route path='app' element={<Application />} />
            <Route path='data' element={<Data />} />
            <Route path='support' element={<Support />} />
           </Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
