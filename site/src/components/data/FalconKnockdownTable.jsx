import React from 'react';
import knockdown_data from '../../../../shared/knockdown_data.json';
import characters from '../../../../shared/characters.json';
import { 
    Box, 
    IconButton, 
    Paper, 
    Tooltip, 
    Typography, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

export const FalconKnockdownTable = () => {
    const rows = Object.keys(knockdown_data[0])
    const columns = Array.from({ length: 26 }, (_, index) => index);
    return (
    <TableContainer component={Paper} sx={{ maxWidth: 'min(calc(100vw - 48px), 894px)', margin: 1 }} elevation={3}>
      <Table sx={{ overflow: 'auto' }} size="small" aria-label="Knockdown Table for Captain Falcon">
        {
            !rows.length && (
                <caption>
                    <Typography textAlign='center'>
                        Captain Falcon's knockdown spread against the cast.
                    </Typography>
                </caption>
            )
        }
        <TableHead>
          <TableRow>
            <TableCell>
              Move
            </TableCell>
            {columns.map((id, idx) => (
                <TableCell key={`column-${id}-${idx}`}>
                    <Tooltip title={characters[id].name} placement='top'>
                        <IconButton>
                            <img alt={characters[id].name} src={`./assets/icons/${id}-Default.png`} />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((move, idx) => (
            <TableRow
              key={`row-${move}-${idx}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {move}
                </TableCell>
                {columns.map((id) => (
                    <TableCell 
                      key={`cell-${move}-${id}`} 
                      align='center'
                    >
                      {knockdown_data[0][move][id]}
                    </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
}

export default FalconKnockdownTable;