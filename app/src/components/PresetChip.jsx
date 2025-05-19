import React from 'react';
import { Chip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add';;

export const PresetChip = ({ presetName, currentMoves=[], preset=[], handleAction }) => {
    const [shouldAdd, setShouldAdd] = React.useState(true);

    React.useEffect(() => {
        setShouldAdd(!preset.every(v => currentMoves.includes(v)))
    }, [preset, currentMoves]);

    const handlePresetClick = React.useCallback(() => {
        handleAction(preset, shouldAdd);
    }, [handleAction, shouldAdd]);
    return (
        <Chip 
            size='small'
            label={presetName}
            variant="outlined" 
            onDelete={handlePresetClick}
            deleteIcon={shouldAdd ? <AddIcon /> : <ClearIcon />}
        />
    )
}

export default PresetChip;