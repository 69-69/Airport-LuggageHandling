'use client';
import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography, Box,
} from '@mui/material';
import Info from "@mui/icons-material/Info";


interface UIDialogProps {
    title: string;
    open: boolean;
    onCancel: () => void;
    optionLabel?: string;
    cancelLabel?: string;
    confirmLabel?: string;
    content: React.ReactNode;
    confirmDisabled?: boolean;
    onOption?: () => void | Promise<void>;
    onConfirm?: () => void | Promise<void>;
}

const UiDialog = ({
                      open,
                      title,
                      onCancel,
                      content,
                      optionLabel,
                      cancelLabel,
                      confirmLabel,
                      onOption,
                      confirmDisabled,
                      onConfirm,
                  }: UIDialogProps) => {

    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm();
        }
    };

    const handleOptional = async () => {
        if (onOption) {
            await onOption();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title" align="center">{title}</DialogTitle>
            <DialogContent id="dialog-description" sx={{display: 'flex', width: 500, flexDirection: 'column', gap: 2, mt: 1}}>
                <Box sx={{flexGrow: 1}}></Box>
                {content}
            </DialogContent>
            <DialogActions sx={{mx: 2}}>
                <Button onClick={onCancel} color="error" variant="outlined"
                        size="small" sx={{textTransform: 'none'}}>
                    {cancelLabel ?? 'No'}
                </Button>
                {optionLabel && (
                    <Button onClick={handleOptional} size="small" variant="outlined"
                            color="inherit" sx={{textTransform: 'none'}}>
                        {optionLabel}
                    </Button>
                )}
                {confirmLabel != 'none' && (
                    <Button onClick={handleConfirm} disabled={confirmDisabled} size="small"
                            variant="outlined"
                            color="primary" sx={{textTransform: 'none'}}>
                        {confirmLabel ?? 'Yes, Confirm'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default UiDialog;
