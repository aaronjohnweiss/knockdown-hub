import { IconButton, Tooltip, Popover } from '@mui/material';
import React from 'react';
import CharacterSelectPopover from './CharacterSelectPopover';
import characters from '../../../shared/characters.json';

export const CharacterSelector = ({ title, characterId, selectCharacter }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const handleSelect = React.useCallback((id) => {
        setOpen(false);
        selectCharacter(id);
    }, [selectCharacter])

    return (
        <>
            <Tooltip title={title}>
                <IconButton onClick={handleClick}>
                    <img alt={characters[characterId].name} src={`./assets/icons/${characterId}-Default.png`} />
                </IconButton>
            </Tooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={() => setOpen(false)}
            >
                <CharacterSelectPopover selectCharacter={handleSelect} />
            </Popover>
        </>
    )
}

export default CharacterSelector;