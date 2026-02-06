'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Container,
    Paper, Typography, Button,
} from '@mui/material';
import React, {ReactNode} from "react";
import {DataRow} from "@/types/dataRow";
import {toCamelCase} from "@/components/util";

interface TableProps<T extends DataRow> {
    name?: string;
    title?: string;
    topButton?: ReactNode;
    topAlignment?: 'left' | 'center' | 'right' | 'justify';
    columns: string[];          // keys, in display order
    rows: T[];
    onActionCallback?: (row: T) => void;
}


const UITable = <T extends DataRow>({
                                        columns,
                                        rows,
                                        title,
                                        name,
                                        topButton,
                                        topAlignment,
                                        onActionCallback
                                    }: TableProps<T>) => {
    return (
        <Container maxWidth="md">
            <>
                {title && (
                    <Typography variant="h4" component="h1" sx={{textAlign: 'center', mb: 1}} gutterBottom>
                        {title}
                    </Typography>
                )}
                {name && (
                    <Typography variant="h6" fontWeight='normal' sx={{textAlign: 'center', mb: 5}} gutterBottom>
                        <b>Welcome</b>, {name}!
                    </Typography>
                )}
            </>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        {/* Full-width button row */}
                        {topButton && (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align={topAlignment ?? 'right'}>
                                    {topButton}
                                </TableCell>
                            </TableRow>
                        )}

                        {/* Column headers */}
                        <TableRow>
                            <TableCell align={"center"}>#</TableCell>
                            {columns.map((col) => (
                                <TableCell key={col} sx={{fontWeight: 'bold'}}
                                           align={"center"}>{col.toUpperCase()}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={i} hover>
                                <TableCell align={"center"}>{i + 1}</TableCell>

                                {columns.map((col) => (
                                    <TableCell key={col} align={"center"}>
                                        {col === "action" ? (
                                            <Button
                                                key={i}
                                                size="small"
                                                color="error"
                                                variant="text"
                                                sx={{textTransform: 'none'}}
                                                onClick={() => onActionCallback?.(row)}
                                            >
                                                {row[col]}
                                            </Button>
                                        ) : (
                                            row[toCamelCase(col)]
                                        )}
                                    </TableCell>

                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
export default UITable;

