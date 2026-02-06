'use client';
import * as React from 'react';
import {
    TextField,
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {DataRow} from "@/types/dataRow";
import {AutocompleteDropdown} from "@/components/dropdown";

interface AddFlightDialogProps {
    open: boolean;
    onClose: () => void;
    onAddFlight: (row: DataRow) => void;
}

const AddFlightDialog = ({
                             open,
                             onClose,
                             onAddFlight,
                         }: AddFlightDialogProps) => {

    const [airlineCode, setAirlineCode] = React.useState('');
    const [flightNumber, setFlightNumber] = React.useState('');
    const [error, setError] = React.useState('');

    const handlePasswordChange = () => {
        if (airlineCode == '') {
            setError('Airline Code is required');
            return;
        }
        if (flightNumber == '') {
            setError('Flight Number is required');
            return;
        }

        setError('');
        onAddFlight({
            airlineCode: airlineCode,
            flightNumber: flightNumber,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onClose={onClose}
            title="Add Flight"
            onConfirmCallback={handlePasswordChange}
            cancelLabel={'Cancel'}
            submitLabel={'Add'}
            content={
                <>
                    <TextField
                        label="Airline Code"
                        type="text"
                        fullWidth
                        size="small"
                        value={airlineCode}
                        onChange={(e) => setAirlineCode(e.target.value)}
                        slotProps={{input: {id: 'airline-code', autoFocus: true},}}
                    />
                    <TextField
                        label="Flight Number"
                        type="text"
                        fullWidth
                        size="small"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        slotProps={{input: {id: 'flight-number'}}}
                    />
                    <AutocompleteDropdown label="Terminal" data={["T1", "T2", "T3"]}/>
                    <AutocompleteDropdown label="Gate Number" data={["G1", "G2", "G3"]}/>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </>
            }/>
    );
}

export default AddFlightDialog;

