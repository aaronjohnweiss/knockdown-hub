import React, { useCallback } from 'react';
import { IconButton, Box, Tooltip, Popover } from '@mui/material';
import characters from '../../../../shared/characters.json';

const characterRows = [
    [22, 8, 7, 5, 12, 17, 1, 0, 25],
    [20, 2, 11, 14, 4, 16, 18, 6, 21],
    [24, 13, 15, 10, 3, 9, 23]
];

export const CharacterSelectPopover = ({ selectCharacter }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [initialized, setInitialized] = React.useState(false);

    const handleClick = (event, value) => {
        if (!open && value === 18) {
            setAnchorEl(event.currentTarget);
            setOpen(true);
        } else {
            setOpen(false);
            selectCharacter(value);
        }
    };

    React.useEffect(() => !initialized && setInitialized(true), []);

    return (
        <Box display={initialized ? 'inherit' : 'null'} minWidth={'360px'}>
            {characterRows.map((row, idx) => (
                <Box 
                    key={`characters-row-${idx}`} 
                    display='flex' 
                    justifyContent='center'
                    sx={{ opacity: open ? 0.2 : 1 }}
                >
                    {row.map((characterId) => (
                        <Tooltip title={characters[characterId].name} key={`character-${characterId}`} disableInteractive> 
                            <IconButton onClick={(event) => handleClick(event, characterId)} >
                                <img aria-hidden='true' src={`./assets/icons/${characterId}-Default.png`} />
                            </IconButton>
                        </Tooltip>
                    ))}
                </Box>
            ))}
            <Popover
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                sx={{ minWidth: '80px' }}
                onClose={() => setOpen(false)}
            >
                {[18, 19].map((subCharacter) => (
                    <Tooltip title={characters[subCharacter].name} key={`character-${subCharacter}`}>
                        <IconButton onClick={(event) => handleClick(event, subCharacter)} >
                            <img src={`./assets/icons/${subCharacter}-Default.png`} />
                        </IconButton>
                    </Tooltip>
                ))}
            </Popover>
        </Box>
    )
}

export default CharacterSelectPopover;