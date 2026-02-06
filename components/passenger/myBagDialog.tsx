'use client';
import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import Info from "@mui/icons-material/Info";
import UiDialog from "@/components/uiDialog";
import {Check} from "@mui/icons-material";


interface ConfirmDepartureDialogProps {
    open: boolean;
    onClose: () => void;
    recipientId: string;
    onConfirmDeparture: (success: boolean) => void;
}

const ConfirmDepartureDialog = ({
                                    open,
                                    onClose,
                                    recipientId,
                                    onConfirmDeparture,
                                }: ConfirmDepartureDialogProps) => {
    const [error, setError] = React.useState('');

    const handlePasswordChange = () => {
        if (!recipientId) {
            setError('Recipient is missing');
            return;
        }

        setError('');
        onConfirmDeparture(true);
        onClose();
    };

    return (
        <UiDialog
            open={open}
            onClose={onClose}
            title="Confirm Departure"
            cancelLabel='Cancel'
            submitLabel='Notify Administrator'
            confirmDisabled={error.length > 0}
            onConfirmCallback={handlePasswordChange}
            content={
                <>
                    <Typography
                        id="confirm-dialog-description"
                        sx={{textDecorationLine: 'underline', display: 'flex', alignItems: 'center', gap: 1}}
                    >
                        <Info fontSize="small"/>
                        Confirm all passengers and their baggage are onboard
                    </Typography>
                    <Typography sx={{mt: 2}}>
                        [ <b>Flight:</b> AA4321 ]<br/><br/>
                        <Check fontSize="small"/>All passengers boarded<br/>
                        <Check fontSize="small"/>All bags loaded<br/>
                    </Typography>

                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </>
            }/>
    );
}

export default ConfirmDepartureDialog;

