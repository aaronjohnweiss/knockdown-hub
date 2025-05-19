import React from 'react';
import { AppBar, Toolbar, Container, Typography, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Link } from "react-router";

const pages = ['Charts', 'App', 'Data', 'Support'];


const CustomAppBar = () => {
  const { mode, setMode } = useColorScheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleColorMode = React.useCallback(() => {
      mode === 'dark' ? setMode('light') : setMode('dark');
  }, [mode])


  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Container maxWidth="lg" sx={{ paddingX: { xs: 0 }}}>
            <Box flexDirection='row' alignItems='center' justifyContent={'center'} sx={{ display: 'flex' }}>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  <MenuItem
                    component={Link}
                    to={'/'}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                  </MenuItem>
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      component={Link}
                      to={`/${page.toLocaleLowerCase()}`}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box flexDirection='row' alignItems='center' flexGrow={1} sx={{ display: { xs: 'none', md: 'flex' } }} gap={1}>
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
                      sx={{ color: 'white', display: 'block', marginTop: '2px' }}
                      component={Link}
                      to={`/${page.toLocaleLowerCase()}`}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 1 }} />
              </Box>
              <IconButton
                aria-label="Theme Settings"
                color="inherit"
                onClick={handleColorMode}
              >
                <SettingsBrightnessIcon />
              </IconButton>
              <IconButton
                aria-label="Project on Github"
                color="inherit"
                component={Link}
                to={`https://github.com/aaronjohnweiss/know-your-percents`}
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