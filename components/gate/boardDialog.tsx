'use client';

import * as React from 'react';
import {
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {DataRow} from "@/types/dataRow";
import {clearErrorAndSet} from "@/components/util";

interface BoardDialogProps {
    open: boolean;
    onClose: () => void;
    onBoard: (row: DataRow) => void;
}

const BoardDialog = ({
                             open,
                             onClose,
                             onBoard,
                         }: BoardDialogProps) => {

    const [ticketNumber, setTicketNumber] = React.useState('');
    const [error, setError] = React.useState<string|null>(null);

    const handleChange = () => {
        if (ticketNumber == '') {
            setError('Ticket number is required');
            return;
        }
        setError('');
        onBoard({
            ticketNumber: ticketNumber,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Board Passenger"
            onConfirm={handleChange}
            cancelLabel={'Cancel'}
            confirmLabel={'Board Passenger'}
            content={
                <>
                    <TextField
                        label="Ticket Number"
                        type="text"
                        fullWidth
                        size="small"
                        value={ticketNumber}
                        onChange={clearErrorAndSet(setTicketNumber, setError)}
                        slotProps={{input: {id: 'ticket-number', autoFocus: true},}}
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

export default BoardDialog;

