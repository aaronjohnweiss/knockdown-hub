import React from 'react';
import { 
    Box, 
    IconButton, 
    Paper, 
    Tooltip, 
    Divider, 
    Typography, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

export const KnockdownTable = ({ rows }) => {
    return (
    <TableContainer component={Paper}>
      <Table sx={{ maxHeight: '600px', overflow: 'auto' }} size="small" aria-label="Knockdown Table">
        {
            !rows.length && (
                <caption>
                    <Typography textAlign='center'>
                        No information available to display.
                    </Typography>
                </caption>
            )
        }
        <TableHead>
          <TableRow>
            <TableCell>Move</TableCell>
            <TableCell align="right">
                <Tooltip title='The earliest percentage at which the recipient will be knocked down'>
                    ASDI % 
                </Tooltip>
            </TableCell>
            <TableCell align="right">
                <Tooltip title='The percentage at which the recipient will be knocked down while crouching'>
                    CC % 
                </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.move}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.move}
              </TableCell>
              <TableCell align="right">{row.asdi}</TableCell>
              <TableCell align="right">{row.cc === -1 ? 'N/A' : row.cc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
}

export default KnockdownTable;
