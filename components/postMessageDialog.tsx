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

interface PostDialogProps {
    open: boolean;
    onClose: () => void;
    onPost: (row: DataRow) => void;
}

const MessageDialog = ({
                             open,
                             onClose,
                             onPost,
                         }: PostDialogProps) => {

    const [message, setMessage] = React.useState('');
    const [recipient, setRecipient] = React.useState('');
    const [error, setError] = React.useState('');
    const staffs: string[] = ["Ella Brown", "Jackie M.", "IP Man"];

    const handleChange = () => {
        if (message == '') {
            setError('Message is required');
            return;
        }
        if (recipient == '') {
            setError('Recipient is required');
            return;
        }

        setError('');
        onPost({
            message: message,
            recipient: recipient,
        });
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onClose={onClose}
            title="Post Message"
            confirmDisabled={error.length>0}
            onConfirmCallback={handleChange}
            cancelLabel={'Cancel'}
            submitLabel={'Send'}
            content={
                <>
                    <TextField
                        label="Message..."
                        type="text"
                        multiline
                        size="small"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        slotProps={{input: {id: 'message', autoFocus: true},}}
                    />
                    <AutocompleteDropdown label="Recipient (Staffs)" data={staffs}/>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </>
            }/>
    );
}

export default MessageDialog;

