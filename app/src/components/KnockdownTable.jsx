import React from 'react';
import {
  Chip,
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

export const KnockdownTable = ({ rows, recipientPercent = 0, useCcPercents=false }) => {

  const getTableRowColor = React.useCallback((theme, row, percent) => {
    let color = 'inherit';

    if (useCcPercents) {
      if (percent > row.cc) {
      color = theme.palette.success.main
      }
    } else {
      if (percent > row.asdi) {
        color = theme.palette.success.main
      }
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
            {useCcPercents ? (
              <TableCell align="right">
                <Tooltip title='The percentage at which the recipient will be knocked down even while crouching'>
                  CC %
                </Tooltip>
              </TableCell>
            ) : (
              <TableCell align="right">
                <Tooltip title='The earliest percentage at which the recipient could be knocked down (no CC)'>
                  ASDI %
                </Tooltip>
              </TableCell>
            )}
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
              <TableCell align="right">
                {useCcPercents ? row.cc : row.asdi}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default KnockdownTable;
