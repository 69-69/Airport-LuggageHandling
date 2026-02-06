import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Button, Typography,
} from '@mui/material';
import React from "react";

type tableProps = {
    columns: string[];
    rows: (number | string)[][];
    title: string;
};

const UITable =  ({columns, rows, title}: tableProps) => {

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" component="h1" sx={{textAlign: 'center'}} gutterBottom>
                {title}
            </Typography>
            <Table>
                <TableHead>
                    {/* Full-width button row */}
                    <TableRow>
                        <TableCell colSpan={6} align="right">
                            <Button variant="outlined" color="primary">
                                Add Flight
                            </Button>
                        </TableCell>
                    </TableRow>

                    {/* Column headers */}
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col}>{col}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell key={i+1}>{i+1}</TableCell>
                            {row.map((cell) => (
                                <TableCell key={cell}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default UITable;
