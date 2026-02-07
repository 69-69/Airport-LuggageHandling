'use client';

import * as React from 'react';
import {
    TextField,
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {clearErrorAndSet} from "@/components/util";

interface ClearanceDialogProps {
    open: boolean;
    onClose: () => void;
    onClearance: (bagId: string) => void;
}

const ClearanceDialog = ({
                             open,
                             onClose,
                             onClearance,
                         }: ClearanceDialogProps) => {

    const [bagId, setBagId] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const handleApprove = () => {
        if (bagId == '') {
            setError('Bag ID is required');
            return;
        }
        setError('');
        onClearance(bagId);
        onClose();
    };

    const handleFlag = () => {
        if (bagId == '') {
            setError('Bag ID is required');
            return;
        }
        setError('');
    };

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Security Clearance"
            cancelLabel={'Cancel'}
            onOption={handleFlag}
            optionLabel={'Flag/Review'}
            onConfirm={handleApprove}
            confirmLabel={'Approve'}
            content={
                <>
                    <TextField
                        label="Bag ID..."
                        type="text"
                        fullWidth
                        size="small"
                        value={bagId}
                        onChange={clearErrorAndSet(setBagId, setError)}
                        slotProps={{
                            input: {
                                id: 'bag-id',
                                autoFocus: true,
                                inputProps: {maxLength: 6}
                            }
                        }}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </>
            }/>
    );
}

export default ClearanceDialog;

