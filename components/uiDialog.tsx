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


interface ConfirmDialogProps {
    title: string;
    open: boolean;
    cancelLabel?: string;
    submitLabel?: string;
    onClose: () => void;
    content: React.ReactNode;
    confirmDisabled?: boolean;
    onConfirmCallback: () => void | Promise<void>;
}

const ConfirmDialog = ({
                           open,
                           title,
                           onClose,
                           content,
                           cancelLabel,
                           submitLabel,
                           onConfirmCallback,
                       }: ConfirmDialogProps) => {
    const handleSubmit = async () => {
        await onConfirmCallback();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="change-password-dialog-title"
            aria-describedby="change-password-dialog-description"
        >
            <DialogTitle id="change-password-dialog-title" align="center">{title}</DialogTitle>
            <DialogContent sx={{display: 'flex', width: 460, flexDirection: 'column', gap: 2, mt: 1}}>
                <Typography
                    id="change-password-dialog-description"
                    sx={{textDecorationLine: 'underline', display: 'flex', alignItems: 'center', gap: 1}}
                >
                    <Info fontSize="small"/>{content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    {cancelLabel ?? 'No'}
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" sx={{textTransform: 'none'}}>
                    {submitLabel ?? 'Yes, Confirm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
