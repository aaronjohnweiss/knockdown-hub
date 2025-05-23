import React from 'react';
import { Box, Typography, IconButton,  Drawer, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import MovesetFilter from './MovesetFilter';
import PresetChip from './PresetChip';
import CharacterSelector from './CharacterSelector';

import knockdown_data from '../../../shared/knockdown_data.json';
import characters from '../../../shared/characters.json';
import { aerials, throws, misc, specials, moveset_list } from '../../../shared/moveset_list';

const Configure = ({ open, onClose, onFulfilled, allowedMoves, setAllowedMoves }) => {

    const [tag, setTag] = React.useState('');
    const [presetCharacterId, setPresetCharacterId] = React.useState(0);
    const [replayDirectory, setReplayDirectory] = React.useState('');

    const folderBrowse = React.useCallback(async () => {
        const fileDirectory = await window.electronAPI.openDirectory()
        if (fileDirectory) {
            setReplayDirectory(fileDirectory);
        }
    }, []);

    const handleSave = React.useCallback(async () => {
        await window.electronAPI.setSlippiData({ tag, replayDirectory })
        await window.electronAPI.setFilterData({ moveset: allowedMoves })
    }, [tag, replayDirectory, allowedMoves]);

    React.useEffect(() => {
        const asyncFetch = async () => {
            const { tag, replayDirectory } = await window.electronAPI.getSlippiData();
            const { moveset } = await window.electronAPI.getFilterData();
            setTag(tag)
            setReplayDirectory(replayDirectory)
            setAllowedMoves(moveset)
        };
        asyncFetch();
    }, []);

    React.useEffect(() => {
        onFulfilled(allowedMoves.length && replayDirectory);
    }, [replayDirectory, allowedMoves]);

    const handleClose = React.useCallback(async () => {
        await handleSave();
        onClose();
    }, [handleSave, onClose])


    const handlePresetClick = React.useCallback((preset, add) => {
        let newAllowedMoves = [];
        if (add) {
            newAllowedMoves = [...new Set([ ...allowedMoves, ...preset ])]
        } else {
            newAllowedMoves = allowedMoves.filter(mv => !preset.includes(mv));
        }
        setAllowedMoves(newAllowedMoves);
    }, [allowedMoves, presetCharacterId])

    const presets = React.useMemo(() => {
        const presetCharacterMoves = Object.keys(knockdown_data[presetCharacterId]);
        return ({
            all: presetCharacterMoves,
            aerials: presetCharacterMoves.filter(item => aerials.includes(item)),
            specials: presetCharacterMoves.filter(item => specials.includes(item)),
            throws: presetCharacterMoves.filter(item => throws.includes(item)),
            misc: presetCharacterMoves.filter(item => misc.includes(item))
        })
    }, [presetCharacterId])

    return (
        <Drawer 
            open={open} 
            onClose={handleClose} 
            anchor='right'
            aria-labelledby="configure-title"
            aria-describedby="configure-description"
        >
            <Box display='flex' flexDirection='column' alignItems='center' height='100%' p={1} gap={1} sx={{ maxWidth: '350px', paddingTop: '38px' }} >
                <Box display='flex' flexDirection='row' flexWrap='noWrap' width='100%' alignItems='center'>
                    <Typography id='configure-title' component='h2' sx={{ flexGrow: 1, textAlign: 'center', fontSize: '1.5em' }}>Configure</Typography>
                    <IconButton title='Close' onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant='overline' alignSelf={'flex-start'}>Slippi</Typography>
                <TextField 
                    fullWidth
                    label='Slippi Tag (Optional)'
                    placeholder='XX#02'
                    id='tag-input'
                    value={tag}
                    size='small'
                    onChange={(e) => setTag(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: <PersonIcon />
                        }
                    }}
                    sx={{ 
                        "& .MuiInputBase-input": {
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        } 
                    }}
                    helperText={'Correctly detect your character on game load.'}
                />
                <TextField 
                    fullWidth
                    key={replayDirectory} 
                    label='Slippi Replay Directory'
                    id='diretory-input'
                    required 
                    value={replayDirectory} 
                    size='small'
                    helperText='Required for detecting Slippi games.'
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton onClick={folderBrowse}>
                                    <FolderIcon />
                                </IconButton>
                        ),
                            readOnly: true
                        }
                    }}
                    sx={{ 
                        "& .MuiInputBase-input": {
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        } 
                    }}
                />
                <Typography variant='overline' alignSelf={'flex-start'}>Filters</Typography>
                <MovesetFilter value={allowedMoves} setValue={setAllowedMoves} />
                <Typography variant='overline' alignSelf={'flex-start'}  >
                    Presets
                </Typography>
                <Box display='flex' flexDirection='row' gap={1}>
                    <Box>
                        <CharacterSelector title={`Preset Character (${characters[presetCharacterId].name})`} characterId={presetCharacterId} selectCharacter={(id) => setPresetCharacterId(id)} />
                    </Box>
                    <Box display='flex' gap={1} flexDirection='row' flexWrap='wrap'>     
                        <PresetChip 
                            presetName='Aerials' 
                            currentMoves={allowedMoves}  
                            preset={presets.aerials}
                            handleAction={handlePresetClick}
                        />
                        <PresetChip 
                            presetName='Tilts' 
                            currentMoves={allowedMoves}  
                            preset={['dtilt', 'utilt', 'ftilt']}
                            handleAction={handlePresetClick}
                        />
                        <PresetChip 
                            presetName='Smashes' 
                            currentMoves={allowedMoves}  
                            preset={['dsmash', 'usmash', 'fsmash']}
                            handleAction={handlePresetClick}
                        />
                        <PresetChip 
                            presetName='Specials' 
                            currentMoves={allowedMoves}  
                            preset={presets.specials}
                            handleAction={handlePresetClick}
                        />
                        <PresetChip 
                            presetName='Throws' 
                            currentMoves={allowedMoves}  
                            preset={presets.throws}
                            handleAction={handlePresetClick}
                        />
                        <PresetChip 
                            presetName='Misc' 
                            currentMoves={allowedMoves}  
                            preset={presets.misc}
                            handleAction={handlePresetClick}
                        />
                        <PresetChip 
                            presetName="All (Selected Character)"
                            currentMoves={allowedMoves}
                            preset={presets.all}
                            handleAction={handlePresetClick}
                        />   
                        <PresetChip 
                            presetName="All"
                            currentMoves={allowedMoves}  
                            preset={moveset_list}
                            handleAction={handlePresetClick}
                        />          
                    </Box>
                </Box>
                <Box flexGrow={1} />
                <Button onClick={handleClose} sx={{ alignSelf: 'flex-end' }}>Save</Button>
            </Box>
        </Drawer>
    );
}

export default Configure;