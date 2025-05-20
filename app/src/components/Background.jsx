import React from 'react';
import bg from '/assets/main_menu.webm';
import { Paper, styled } from '@mui/material';

const StyledBg = styled(Paper)({
    display: 'inline',
    position: 'fixed',
    right: 0,
    bottom: 0,
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: '#000119DD',
    zIndex: -100,
});

const StyledVideo = styled('video')({
    margin: '-8px',
    zIndex: -50,
    opacity: 0.88,
    filter: `contrast(105%)`
});

const Background = ({ showVideo=false }) => {
    return (
        <StyledBg>
            {showVideo &&
                <StyledVideo 
                    autoPlay 
                    loop muted 
                    playsInline
                >
                    <source src={bg} type="video/webm" />
                </StyledVideo>
            }
        </StyledBg>
    );
}

export default Background;