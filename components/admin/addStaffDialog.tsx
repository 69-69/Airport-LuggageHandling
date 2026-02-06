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

    const [airlineCode, setAirlineCode] = React.useState('');
    const [flightNumber, setFlightNumber] = React.useState('');
    const [error, setError] = React.useState('');

    const handlePasswordChange = () => {
        if (airlineCode == '') {
            setError('First name is required');
            return;
        }
        if (flightNumber == '') {
            setError('Last name is required');
            return;
        }

        setError('');
        onAddPassenger({
            airlineCode: airlineCode,
            flightNumber: flightNumber,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onClose={onClose}
            title="Add Passenger"
            onConfirmCallback={handlePasswordChange}
            cancelLabel={'Cancel'}
            submitLabel={'Add'}
            content={
                <>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="First Name"
                                type="text"
                                fullWidth
                                size="small"
                                value={airlineCode}
                                onChange={(e) => setAirlineCode(e.target.value)}
                                slotProps={{input: {id: 'first-name', autoFocus: true},}}
                            />
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <TextField
                                label="Last Name"
                                type="text"
                                fullWidth
                                size="small"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                                slotProps={{input: {id: 'last-name'}}}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="ID Number"
                        type="text"
                        fullWidth
                        size="small"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        slotProps={{input: {id: 'id-number'}}}
                        helperText="Passport or Driver License Number"
                    />
                    <TextField
                        label="Ticket Number"
                        type="text"
                        fullWidth
                        size="small"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        slotProps={{
                            input: {
                                id: 'ticket-number',
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
                    <AutocompleteDropdown label="Flight" data={["AA1234", "AA4321", "AA9876"]}/>
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

