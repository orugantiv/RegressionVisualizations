import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


export default function DataTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '95%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'      }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props.tableRows.map((rows, index) => {
                                return <TableCell
                                         key={index}
                                         align= "right"
                                         style={{ minWidth: 20 }} >{rows}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                {props.values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {value.map((val, i) => {
                  return <TableCell key={i} align="right">{val}</TableCell>;
                })}
              </TableRow>
            );
          })}
          </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.values.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>


    );
}