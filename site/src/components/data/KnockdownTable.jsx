import React from 'react';
import { 
    Paper, 
    Tooltip, 
    TableSortLabel, 
    Typography, 
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled
} from '@mui/material';

const TableCell = styled(MuiTableCell)({
  padding: '8px 0px 8px 0px !important',
  '&:first-of-type': {
    padding: '8px 0px 8px 8px !important',
  },
  '&:last-child': {
    padding: '8px 8px 8px 0px !important',
  }
})

export const KnockdownTable = ({ rows, recipientId }) => {
    const [sortBy, setSortBy] = React.useState('asdi');
    const [sortAsc, setSortAsc] = React.useState(true);

    const sortedRows = React.useMemo(() => {
      const sortField = sortBy;
      return rows.sort((a, b) => sortAsc ? a[sortField] - b[sortField] : -(a[sortField] - b[sortField]))
    }, [rows, sortAsc, sortBy]);

    const handleSort = React.useCallback((sortLabel) => {
          if (sortBy === sortLabel) { 
             setSortAsc(!sortAsc)
          } else {
            setSortAsc(true);
            setSortBy(sortLabel)
          }
    }, [sortBy, sortAsc]);

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
            <TableCell align="right" sortDirection={sortAsc ? 'asc' : 'desc'} sx={{ paddingX: 0 }}>
                <Tooltip title='The earliest percentage at which the recipient will be knocked down'>
                  <TableSortLabel 
                    active={sortBy === 'asdi'}
                    direction={sortBy === 'asdi' && sortAsc ? 'asc' : 'desc'}
                    onClick={() => handleSort('asdi')}
                  >
                    ASDI %
                  </TableSortLabel>
                </Tooltip>
            </TableCell>
            <TableCell align="right" sx={{ paddingX: 0, paddingRight: recipientId !== 17 ? 1 : 0 }}>
                <Tooltip title={`The percentage at which the recipient will be knocked down while crouching ${recipientId === 17 ? ' / break Yoshi DJ armor' : ''}`}>
                    <TableSortLabel 
                      active={sortBy === 'cc'}
                      direction={sortBy === 'cc' && sortAsc ? 'asc' : 'desc'}
                      onClick={() => handleSort('cc')}
                    >
                      CC %
                  </TableSortLabel>
                </Tooltip>
            </TableCell>
            {recipientId === 17 && (
              <TableCell align="right" sx={{ paddingLeft: 0, paddingRight: 1 }}>
                  <Tooltip title='The percentage at which the move will put Yoshi directly into knockdown while having doublejump armor'>
                      <TableSortLabel 
                        active={sortBy === 'ys'}
                        direction={sortBy === 'ys' && sortAsc ? 'asc' : 'desc'}
                        onClick={() => handleSort('ys')}
                      >
                        DJA %
                    </TableSortLabel>
                  </Tooltip>
              </TableCell>
            )}
            
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
              {recipientId === 17 && (
                <TableCell align="right">{!row.ys ? 'N/A' : row.ys}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
}

export default KnockdownTable;
