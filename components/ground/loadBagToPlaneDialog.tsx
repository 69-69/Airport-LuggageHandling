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
import {
    bagLocations,
    clearErrorAndSet, clearErrorAndSetString,
    statuses
} from "@/components/util";

interface LoadBagDialogProps {
    open: boolean;
    onClose: () => void;
    onLoadBag: (row: DataRow) => void;
}

const LoadBagToPlaneDialog = ({
                             open,
                             onClose,
                             onLoadBag,
                         }: LoadBagDialogProps) => {

    const [passengerStatus, setPassengerStatus] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [bagId, setBagId] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = () => {
        if (bagId == '') {
            setError('Bag ID is required');
            return;
        }
        if(location == '') {
            setError('Location is required');
        }
        if(passengerStatus == '') {
            setError('Passenger Status is required');
        }

        setError('');
        onLoadBag({
            bagId: bagId,
            location: location,
            passengerStatus: passengerStatus,
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
            title="Load Bags"
            onConfirm={handleChange}
            cancelLabel={'Cancel'}
            confirmLabel={'Load Bags to Plane'}
            content={
                <>
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
                                startAdornment: inputAdornment,
                            },
                        }}
                    />

                    {/*
                        if (selectLocation === 'loaded')
                            SHOW: (Airlines abbreviation - 2 letters and 4-digit flight number)
                        else if (selectLocation === 'gate')
                            SHOW: (Terminal and gate number)
                        else if (selectLocation === 'Check-in counter')
                            SHOW: (Terminal and counter number)
                    */}
                    <AutocompleteDropdown
                        label="Location" data={bagLocations}
                        onChange={clearErrorAndSetString(setLocation, setError)}
                    />
                    <AutocompleteDropdown
                        label="Passenger Status" data={statuses}
                        onChange={clearErrorAndSetString(setPassengerStatus, setError)}
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

export default LoadBagToPlaneDialog;

