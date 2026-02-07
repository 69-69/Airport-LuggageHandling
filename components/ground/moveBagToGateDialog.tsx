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
import {clearErrorAndSet, clearErrorAndSetString, manualGates, manualTerminals} from "@/components/util";

interface MoveBagDialogProps {
    open: boolean;
    onClose: () => void;
    onMoveBag: (row: DataRow) => void;
}

const MoveBagToGateDialog = ({
                             open,
                             onClose,
                             onMoveBag,
                         }: MoveBagDialogProps) => {

    const [ticketNumber, setTicketNumber] = React.useState('');
    const [terminal, setTerminal] = React.useState('');
    const [newGate, setNewGate] = React.useState('');
    const [bagId, setBagId] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = () => {
        if (bagId == '') {
            setError('Bag ID is required');
            return;
        }
        if (ticketNumber == '') {
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
        onMoveBag({
            bagId: bagId,
            ticketNumber: ticketNumber,
            newGate: newGate,
            terminal: terminal,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Move Bags"
            onConfirm={handleChange}
            cancelLabel={'Cancel'}
            confirmLabel={'Move Bags to Gate'}
            content={
                <>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Ticket Number"
                                type="text"
                                fullWidth
                                size="small"
                                value={ticketNumber}
                                onChange={clearErrorAndSet(setTicketNumber, setError)}
                                slotProps={{
                                    input: {
                                        id: 'ticket-number',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Bag ID"
                                type="text"
                                fullWidth
                                size="small"
                                value={bagId}
                                onChange={clearErrorAndSet(setBagId, setError)}
                                slotProps={{
                                    input: {
                                        id: 'bag-id',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <AutocompleteDropdown
                        label="Terminal" data={manualTerminals}
                        onChange={clearErrorAndSetString(setTerminal, setError)}
                    />
                    <AutocompleteDropdown
                        label="Gate Number" data={manualGates}
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

export default MoveBagToGateDialog;

