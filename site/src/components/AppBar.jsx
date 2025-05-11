import { AppBar, Toolbar, Container, Typography, IconButton, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router";

const pages = ['Charts', 'App', 'Data',  'Support'];


const CustomAppBar = () => {

    return (
        <>
          <AppBar position="fixed">
          <Toolbar variant="dense">
            <Container maxWidth="lg">
              <Box display='flex' flexDirection='row' alignItems='center'>
                <IconButton
                  aria-label="home"
                  color="inherit"
                  component={Link}
                  to={`/`}
                >
                  <HomeIcon />
                </IconButton>
                <Box sx={{ display: 'flex', textAlign: 'center' }}>
                  {pages.map((page) => (
                      <Button
                        key={page}
                        sx={{ color: 'white', display: 'block' }}
                        component={Link}
                        to={`/${page.toLocaleLowerCase()}`}
                      >
                        {page}
                      </Button>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  aria-label="Project on Github"
                  color="inherit"
                  component={Link}
                  to={`https://github.com/aaronjohnweiss/percents-hud`}
                  target='_blank'
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <Toolbar variant='dense' sx={{ marginBottom: '8px' }} />
      </>
    )
}

export default CustomAppBar;