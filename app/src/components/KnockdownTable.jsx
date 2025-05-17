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
    TableRow,
    alpha
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

export const KnockdownTable = ({ rows, recipientPercent=0 }) => {

  const getTableRowColor = React.useCallback((theme, row, percent) => {
    let color = 'inherit';
    console.log(percent, row.cc)

    if (percent >= row.asdi) {
      color = alpha(theme.palette.warning.main, 0.5);
    }
    if (percent >= row.cc) {
      color = alpha(theme.palette.success.main, 0.5);
    }
    
    return color;
  }, []);
    return (
    <TableContainer component={Paper} elevation={5}>
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
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                'backgroundColor': theme => getTableRowColor(theme, row, recipientPercent)
              }}
            >
              <TableCell component="th" scope="row">
                {row.move}
              </TableCell>
              <TableCell align="right">{row.asdi}</TableCell>
              <TableCell align="right">{row.cc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
}

export default KnockdownTable;
