'use client';

import * as React from 'react';
import UiDialog from "@/components/uiDialog";
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
            onCancel={onClose}
            title="My Bags"
            cancelLabel='Cancel'
            confirmLabel='none'
            content={
                <UITable<T> columns={columns} topAlignment='justify' rows={rows}/>
            }/>
    );
}

export default MyBagDialog;

