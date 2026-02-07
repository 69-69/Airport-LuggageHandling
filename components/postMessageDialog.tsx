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
import {clearErrorAndSet} from "@/components/util";

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
    const [error, setError] = React.useState<string | null>(null);
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
            onCancel={onClose}
            title="Post Message"
            confirmDisabled={(error?.length ?? 0) > 0}
            onConfirm={handleChange}
            cancelLabel={'Cancel'}
            confirmLabel={'Send Message'}
            content={
                <>
                    <TextField
                        label="Message..."
                        type="text"
                        multiline
                        size="small"
                        rows={3}
                        value={message}
                        onChange={clearErrorAndSet(setMessage, setError)}
                        slotProps={{
                            input: {
                                id: 'message',
                                autoFocus: true,
                                inputProps: {maxLength: 200}
                            },
                        }}
                    />
                    <AutocompleteDropdown
                        label="Recipient (Staffs)" data={staffs}
                        onChange={(e) => setRecipient(e)}
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

export default MessageDialog;

