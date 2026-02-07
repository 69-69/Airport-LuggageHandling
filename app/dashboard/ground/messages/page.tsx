'use client';

import React, {useEffect} from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addFlight, removeStaff} from "@/actions/endpoints";
import {DataRow} from "@/types/dataRow";
import {useParams} from "next/navigation";
import MessageDialog from "@/components/postMessageDialog";

interface MessageRow extends DataRow {
    id: string;
    message: React.ReactNode;
    status: string;
    action: string;
}

const columns = ["message", "status", "action"];
const rows: MessageRow[] = [
    {
        message: <><b>[ 05:40 AM ]</b> Security or bag issues visible <b>[ from: Gina ]</b></>,
        id: "123",
        status: 'Read',
        action: "Delete"
    },
    {
        message: <><b>[ 01:40 PM ]</b> Missing passenger bag <b>[ from: Tina ]</b></>,
        id: "321",
        status: 'Unread',
        action: "Delete"
    },
];

const fetchMessages = async (flight_id: string) => {
    const res = await fetch(`/api/message/${flight_id}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
};

const MessageBoardTable = () => {
    const params = useParams();
    const flight_id = params?.flight_id as string;

    const [data, setData] = React.useState([]);
    const [openMsgDialog, setOpenMsgDialog] = React.useState<boolean>(false);
    const [selectedRow, setSelectedRow] = React.useState<MessageRow>();
    const [isConfirm, setConfirm] = React.useState<boolean>(false);

    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);
        await removeStaff(flight_id);
    };

    const handlePostMessage = async (row: DataRow) => {
        const {airlineCode, flightNumber} = row;
        console.log('Flight', flightNumber);
        await addFlight(airlineCode);
    };

    useEffect(() => {
        if (!flight_id) return;

        fetchMessages(flight_id)
            .then(setData)
            .catch(console.error);
    }, [flight_id]); // dependency array


    return (
        <>
            <UITable<MessageRow>
                columns={columns}
                rows={rows}
                title='Message Board'
                topButton={
                    <Button variant="outlined" sx={{textTransform: 'none'}} onClick={() => setOpenMsgDialog(true)}>
                        Post Message
                    </Button>
                }
                onActionCallback={(row) => {
                    setSelectedRow(row);
                    setConfirm(true);
                }}
            />
            <ConfirmEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Delete Message"
                dataId={flight_id}
                message={
                    <>
                        Are you sure you want to delete this message? Once deleted, recipient will no longer be able see it.
                    </>
                }
                onRemove={handleOnRemove}
            />
            <MessageDialog
                open={openMsgDialog}
                onClose={() => setOpenMsgDialog(false)}
                onPost={handlePostMessage}
            />
        </>
    );
}

export default MessageBoardTable;
