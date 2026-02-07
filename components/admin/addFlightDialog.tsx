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
import {Grid} from "@mui/system";
import {clearErrorAndSet, clearErrorAndSetString, isNumeric, manualGates, manualTerminals} from "@/components/util";

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

    const [airlineName, setAirlineName] = React.useState('');
    const [flightNumber, setFlightNumber] = React.useState('');
    const [terminal, setTerminal] = React.useState('');
    const [newGate, setNewGate] = React.useState('');
    const [flightId, setFlightId] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = () => {
        if (airlineName.length < 2) {
            setError('Enter a valid airline name');
            return;
        }
        if (!flightId || !isNumeric(flightId)) {
            setError('Flight ID is required');
            return;
        }
        if (!flightNumber) {
            setError('Flight Number is required');
            return;
        }
        if (newGate.length < 2) {
            setError('Gate is required');
            return;
        }
        if (terminal.length < 2) {
            setError('Terminal is required');
            return;
        }

        setError('');
        onAddFlight({
            airlineName: airlineName,
            flightNumber: flightNumber,
            flightId: flightId,
            newGate: newGate,
            terminal: terminal,
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
            confirmDisabled={!airlineName || !flightId || !flightNumber || !newGate || !terminal}
            confirmLabel={'Add'}
            content={
                <>
                    <TextField
                        label="Airline Name"
                        type="text"
                        fullWidth
                        size="small"
                        value={airlineName}
                        onChange={clearErrorAndSet(setAirlineName, setError)}
                        slotProps={{input: {id: 'airline-name', autoFocus: true},}}
                    />

                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Flight ID"
                                type="text"
                                fullWidth
                                size="small"
                                value={flightId}
                                disabled={flightId.length>0}
                                onChange={clearErrorAndSet(setFlightId, setError)}
                                slotProps={{
                                    input: {
                                        id: 'flight-id',
                                        startAdornment: inputAdornment,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Flight Number"
                                type="text"
                                fullWidth
                                size="small"
                                value={flightNumber}
                                disabled={flightNumber.length>3}
                                onChange={clearErrorAndSet(setFlightNumber, setError)}
                                slotProps={{
                                    input: {
                                        id: 'flight-number',
                                        startAdornment: inputAdornment,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <AutocompleteDropdown
                        label="Terminal" data={[' ',...manualTerminals]}
                        onChange={clearErrorAndSetString(setTerminal, setError)}
                    />
                    <AutocompleteDropdown
                        label="Gate Number" data={[' ',...manualGates]}
                        onChange={clearErrorAndSetString(setNewGate, setError)}
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

