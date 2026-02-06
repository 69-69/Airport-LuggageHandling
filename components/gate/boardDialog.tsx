'use client';

import * as React from 'react';
import {
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {DataRow} from "@/types/dataRow";
import {AutocompleteDropdown} from "@/components/dropdown";
import {fontWeight, Grid} from "@mui/system";

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
    const counters: string[] = Array.from({length: 100}, (_, i) => i.toString());

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
            onClose={onClose}
            title="Check In"
            onConfirmCallback={handleChange}
            cancelLabel={'Cancel'}
            submitLabel={'Check-In'}
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
                    <AutocompleteDropdown label="Number of Bags" data={counters}/>
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

