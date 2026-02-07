'use client';
import * as React from 'react';
import {
    TextField,
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {DataRow} from "@/types/dataRow";
import {AutocompleteDropdown} from "@/components/dropdown";
import {Grid} from "@mui/system";
import {clearErrorAndSet, clearErrorAndSetString, manualAirlines} from "@/components/util";

interface AddStaffDialogProps {
    open: boolean;
    onClose: () => void;
    onAddStaff: (row: DataRow) => void;
}

const AddStaffDialog = ({
                                open,
                                onClose,
                            onAddStaff,
                            }: AddStaffDialogProps) => {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [role, setRole] = React.useState('');
    const [airline, setAirline] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [error, setError] = React.useState<string |null>(null);

    const handleSubmit = () => {
        if (firstName == '') {
            setError('First name is required');
            return;
        }
        if (lastName == '') {
            setError('Last name is required');
            return;
        }
        if (role == '') {
            setError('Role is required');
        }
        if (airline == '') {
            setError('Airline is required');
        }

        setError('');
        onAddStaff({
            firstName: firstName,
            lastName: lastName,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Add Staff"
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
                        label="Email"
                        type="email"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={clearErrorAndSet(setEmail, setError)}
                        slotProps={{input: {id: 'email'}}}
                    />
                    <TextField
                        label="Phone"
                        type="phone"
                        fullWidth
                        size="small"
                        value={phone}
                        slotProps={{input: {id: 'phone'}}}
                        onChange={clearErrorAndSet(setPhone, setError)}
                    />
                    <AutocompleteDropdown
                        label="Role" data={["Airline", "Gate", "Ground"]}
                        onChange={clearErrorAndSetString(setRole, setError)}
                    />
                    <AutocompleteDropdown
                        label="Airline"
                        data={manualAirlines}
                        onChange={clearErrorAndSetString(setAirline, setError)}
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

export default AddStaffDialog;

