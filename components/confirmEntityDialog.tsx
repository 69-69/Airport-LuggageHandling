'use client';
import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography, DialogProps,
} from '@mui/material';
import Info from "@mui/icons-material/Info";
import UiDialog from "@/components/uiDialog";

interface RemoveFlightDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: React.ReactNode;
    flightId: number | string;
    onRemove: (proceed: boolean) => void;
}

const RemoveEntityDialog = ({open, onClose, title, message, flightId, onRemove} : RemoveFlightDialogProps) => {
    // const {open, onClose, flightId} = params;

    const [error, setError] = React.useState('');

    const handleRemoveFlight = () => {
        if (!flightId) {
            setError("Select a flights to remove.");
            return;
        }

        setError('');
        onRemove(true);
    };

    return (
        <UiDialog
            open={open}
            onClose={onClose}
            title={title}
            onConfirmCallback={handleRemoveFlight}
            content={
                <>
                    <Typography
                        id="confirm-dialog-description"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Info fontSize="small" />
                        {message}
                    </Typography>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </>
            }/>
    );
}

export default RemoveEntityDialog;
