'use client';

import * as React from 'react';
import {
    Typography,
} from '@mui/material';
import UiDialog from "@/components/uiDialog";
import {DataRow} from "@/types/dataRow";
import {AutocompleteDropdown} from "@/components/dropdown";
import {manualGates, manualTerminals} from "@/components/util";

interface ChangeGateDialogProps {
    open: boolean;
    onClose: () => void;
    oldGate: string;
    oldFlight: string;
    onChangeGate: (row: DataRow) => void;
}

const ChangeGateDialog = ({
                              open,
                              onClose,
                              oldGate,
                              oldFlight,
                              onChangeGate,
                          }: ChangeGateDialogProps) => {

    const [terminal, setTerminal] = React.useState('');
    const [newGate, setNewGate] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChange = () => {
        if (terminal == '') {
            setError('Terminal is required');
            return;
        }
        if (newGate == '') {
            setError('New gate is required');
            return;
        }

        setError('');
        onChangeGate({
            terminal: terminal,
            newGate: newGate,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title="Change Gate Information"
            onConfirm={handleChange}
            cancelLabel={'Cancel'}
            confirmLabel={'Save Changes'}
            content={
                <>
                    <Typography>
                        <b>Flight:</b> {oldFlight}<br/>
                        <b>Current Gate:</b> {oldGate}
                    </Typography>
                    <AutocompleteDropdown
                        label="New Terminal" data={manualTerminals}
                        onChange={(e) => setTerminal(e)}
                    />
                    <AutocompleteDropdown
                        label="New Gate" data={manualGates}
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

export default ChangeGateDialog;

