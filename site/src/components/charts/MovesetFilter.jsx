import React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { moveset_list } from '../../../../shared/moveset_list';

const MovesetFilter = ({ value, setValue }) => {

  return (
    <Autocomplete
      multiple
      required
      fullWidth
      id="moveset-filter-autocomplete"
      value={value}
      onChange={(_, newValue) => {
        setValue([
          ...newValue,
        ]);
      }}
      options={moveset_list}
      getOptionLabel={(option) => option}
      renderValue={(values, getItemProps) =>
        values.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <Chip
              key={key}
              label={option}
              {...itemProps}
              size='small'
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField 
            {...params} 
            label="Moveset Allowlist" 
            placeholder={value.length === 0 ? "Select moves to include.." : null }
            fullWidth
            required
            helperText='At least one move required.'
         />
      )}
    />
  );
}

export default MovesetFilter;