'use client';

import * as React from 'react';
import {
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {DataRow} from "@/types/dataRow";
import {AutocompleteDropdown} from "@/components/dropdown";

interface WorkPrefDialogProps {
    open: boolean;
    onClose: () => void;
}

const WorkPreferenceDialog = ({
                              open,
                              onClose,
                          }: WorkPrefDialogProps) => {

    const [newGate, setNewGate] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = () => {
        if (newGate == '') {
            setError('New gate is required');
            return;
        }

        setError('');
        // Set preference to localStorage
        onClose();
    };

    const handleLogout = () => {

        // logout
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onClose={handleLogout}
            title="Change Gate Information"
            onConfirmCallback={handleChange}
            cancelLabel={'Logout'}
            submitLabel={'Assign'}
            content={
                <>
                    <AutocompleteDropdown
                        label="Gate Preference" data={["G1", "G2", "G3"]}
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

export default WorkPreferenceDialog;

