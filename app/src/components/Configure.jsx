import React from 'react';
import { Box, Typography, IconButton,  Drawer, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';

const Configure = ({ open, onClose }) => {

    const [tag, setTag] = React.useState('');
    const [replayDirectory, setReplayDirectory] = React.useState('');
    const [movesetFilter, setMovesetFilter] = React.useState([]);

    const folderBrowse = React.useCallback(async () => {
        const fileDirectory = await window.electronAPI.openDirectory()
        if (fileDirectory) {
            setReplayDirectory(fileDirectory);
        }
    }, []);

    const handleSave = React.useCallback(async () => {
        await window.electronAPI.setSlippiData({ tag, replayDirectory })
        await window.electronAPI.setFilterData({ moveset: movesetFilter })
    }, [tag, replayDirectory, movesetFilter]);


    return (
        <Drawer 
            open={open} 
            onClose={() => onClose(false)} 
            anchor='right'
            aria-labelledby="configure-title"
            aria-describedby="configure-description"
        >
            <Box display='flex' flexDirection='column' alignItems='center' height='100%' p={2} gap={2} sx={{ maxWidth: '350px', paddingTop: '38px' }} >
                <Box display='flex' flexDirection='row' flexWrap='noWrap' width='100%'>
                    <Typography id='configure-title' variant='h4' component='h2' sx={{ flexGrow: 1, textAlign: 'center' }}>Configure</Typography>
                    <IconButton title='Close' onClick={() => onClose(false)}>
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
                <Button onClick={handleSave} sx={{ alignSelf: 'flex-end' }}>Save</Button>
            </Box>
        </Drawer>
    );
}

export default Configure;