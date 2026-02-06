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
import {manualGates, manualTerminals} from "@/components/util";

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
    const [terminal, setTerminal] = React.useState('');
    const [newGate, setNewGate] = React.useState('');
    const [flightId, setFlightId] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = () => {
        if (airlineCode == '') {
            setError('Airline Code is required');
            return;
        }
        if (flightNumber == '') {
            setError('Flight Number is required');
            return;
        }
        if(newGate == '') {
            setError('Gate is required');
        }
        if(terminal == '') {
            setError('Terminal is required');
        }

        setError('');
        onAddFlight({
            airlineCode: airlineCode,
            flightNumber: flightNumber,
        });
        onClose();
    };

    let inputAdornment = <><InputAdornment
        position="start"
        sx={{bgcolor: 'rgba(109,184,236,0.8)', py: 0.1, px: 1, borderRadius: 1}}
    >
        <Typography color="error">Auto</Typography>
    </InputAdornment></>;
    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Add Flight"
            onConfirm={handleChange}
            cancelLabel={'Cancel'}
            confirmLabel={'Add'}
            content={
                <>
                    <TextField
                        label="Airline Name"
                        type="text"
                        fullWidth
                        size="small"
                        value={airlineCode}
                        onChange={(e) => setAirlineCode(e.target.value)}
                        slotProps={{input: {id: 'airline-code', autoFocus: true},}}
                    />

                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Flight Number"
                                type="text"
                                fullWidth
                                size="small"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                                slotProps={{
                                    input: {
                                        id: 'flight-number',
                                        startAdornment: inputAdornment,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Flight ID"
                                type="text"
                                fullWidth
                                size="small"
                                value={flightId}
                                onChange={(e) => setFlightId(e.target.value)}
                                slotProps={{
                                    input: {
                                        id: 'flight-id',
                                        startAdornment: inputAdornment,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <AutocompleteDropdown
                        label="Terminal" data={manualTerminals}
                        onChange={(e) => setTerminal(e)}
                    />
                    <AutocompleteDropdown
                        label="Gate Number" data={manualGates}
                        onChange={(e) => setNewGate(e)}
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

export default AddFlightDialog;

