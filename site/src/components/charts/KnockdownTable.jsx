import React from 'react';
import { 
    Paper, 
    Tooltip, 
    TableSortLabel, 
    Typography, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

export const KnockdownTable = ({ rows }) => {
    const [sortByCc, setSortByCc] = React.useState(false);
    const [sortAsc, setSortAsc] = React.useState(true);

    const sortedRows = React.useMemo(() => {
      const sortField = `${sortByCc ? 'cc' : 'asdi'}`;
      return rows.sort((a, b) => sortAsc ? a[sortField] - b[sortField] : -(a[sortField] - b[sortField]))
    }, [rows, sortAsc, sortByCc]);

    const handleSort = React.useCallback((sortLabel) => {
      if (sortLabel === 'cc') {
        if (sortByCc) {
          setSortAsc(!sortAsc);
        } else {
          setSortAsc(true);
          setSortByCc(!sortByCc)
        }
      } else {
        if (!sortByCc) {
          setSortAsc(!sortAsc);
        } else {
          setSortAsc(true);
          setSortByCc(!sortByCc)
        }
      }
    }, [sortByCc, sortAsc]);

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
            <TableCell align="right" sortDirection={sortAsc ? 'asc' : 'desc'}>
                <Tooltip title='The earliest percentage at which the recipient will be knocked down'>
                  <TableSortLabel 
                    direction={sortByCc ? 'asc' : sortAsc ? 'asc' : 'desc'}
                    onClick={() => handleSort('asdi')}
                  >
                    ASDI %
                  </TableSortLabel>
                </Tooltip>
            </TableCell>
            <TableCell align="right">
                <Tooltip title='The percentage at which the recipient will be knocked down while crouching'>
                    <TableSortLabel 
                      direction={!sortByCc ? 'asc' : sortAsc ? 'asc' : 'desc'}
                      onClick={() => handleSort('cc')}
                    >
                      CC %
                  </TableSortLabel>
                </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
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
