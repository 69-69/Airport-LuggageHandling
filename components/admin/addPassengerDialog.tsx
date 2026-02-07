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
import Info from "@mui/icons-material/Info";
import {clearErrorAndSet, clearErrorAndSetString} from "@/components/util";

interface AddPassengerDialogProps {
    open: boolean;
    onClose: () => void;
    onAddPassenger: (row: DataRow) => void;
}

const AddPassengerDialog = ({
                                open,
                                onClose,
                                onAddPassenger,
                            }: AddPassengerDialogProps) => {

    const [flight, setFlight] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [ticketNumber, setTicketNumber] = React.useState('');
    const [idNumber, setIdNumber] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = () => {
        if (firstName == '') {
            setError('First name is required');
            return;
        }
        if (lastName == '') {
            setError('Last name is required');
            return;
        }

        setError('');
        onAddPassenger({
            firstName: firstName,
            lastName: lastName,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Add Passenger"
            onConfirm={handleSubmit}
            cancelLabel={'Cancel'}
            confirmLabel={'Add'}
            content={
                <>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="First Name"
                                type="text"
                                fullWidth
                                size="small"
                                value={firstName}
                                onChange={clearErrorAndSet(setFirstName, setError)}
                                slotProps={{input: {id: 'first-name'},}}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Last Name"
                                type="text"
                                fullWidth
                                size="small"
                                value={lastName}
                                onChange={clearErrorAndSet(setLastName, setError)}
                                slotProps={{input: {id: 'last-name'}}}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="ID Number"
                        type="text"
                        fullWidth
                        size="small"
                        value={idNumber}
                        onChange={clearErrorAndSet(setIdNumber, setError)}
                        slotProps={{
                            input: {id: 'id-number', inputProps: {maxLength: 6}}
                        }}
                        helperText="Passport or Driver License Number"
                    />
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
                                inputProps: {maxLength: 10},
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{bgcolor: 'rgba(109,184,236,0.8)', py: 0.1, px: 1, borderRadius: 1}}
                                    >
                                        <Typography color="error">Auto</Typography>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <AutocompleteDropdown
                        label="Flight" data={["AA1234", "AA4321", "AA9876"]}
                        onChange={clearErrorAndSetString(setFlight, setError)}
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

export default AddPassengerDialog;

