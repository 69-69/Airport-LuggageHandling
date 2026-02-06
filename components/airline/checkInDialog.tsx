'use client';

import * as React from 'react';
import {
    TextField,
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {DataRow} from "@/types/dataRow";
import {AutocompleteDropdown} from "@/components/dropdown";
import {numberOfBags} from "@/components/util";

interface CheckInDialogProps {
    open: boolean;
    onClose: () => void;
    onCheckIn: (row: DataRow) => void;
}

const CheckInDialog = ({
                             open,
                             onClose,
                             onCheckIn,
                         }: CheckInDialogProps) => {

    const [ticketNumber, setTicketNumber] = React.useState('');
    const [numberBags, setNumberBags] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = () => {
        if (ticketNumber == '') {
            setError('Ticket number is required');
            return;
        }
        if (numberBags == '') {
            setError('Enter the number of bags');
            return;
        }

        setError('');
        onCheckIn({
            ticketNumber: ticketNumber,
            numberBags: numberBags,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Check In"
            onConfirm={handleChange}
            cancelLabel={'Cancel'}
            confirmLabel={'Check-In'}
            content={
                <>
                    <TextField
                        label="Ticket Number"
                        type="text"
                        fullWidth
                        size="small"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        slotProps={{input: {id: 'ticket-number', autoFocus: true},}}
                    />
                    <AutocompleteDropdown
                        label="Number of Bags" data={numberOfBags}
                        onChange={(e) => setNumberBags(e)}
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

export default CheckInDialog;

