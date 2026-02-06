'use client';
import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import Info from "@mui/icons-material/Info";
import UiDialog from "@/components/uiDialog";
import {Check} from "@mui/icons-material";
import UITable from "@/components/uiTable";
import {DataRow} from "@/types/dataRow";


interface MyBagDialogProps<T extends DataRow> {
    open: boolean;
    onClose: () => void;
    columns: string[];          // keys, in display order
    rows: T[];
}

const MyBagDialog = <T extends DataRow>({
                                            open,
                                            onClose,
                                            rows,
                                            columns,
                                        }: MyBagDialogProps<T>) => {

    return (
        <UiDialog
            open={open}
            onClose={onClose}
            title="My Bags"
            cancelLabel='Cancel'
            submitLabel='none'
            content={
                <UITable<T> columns={columns} topAlignment='justify' rows={rows}/>
            }/>
    );
}

export default MyBagDialog;

