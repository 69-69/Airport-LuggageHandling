'use client';

import React, {useEffect} from "react";
import UITable from "@/components/uiTable";
import {Typography} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addFlight, fetchOnBoardData, removeStaff} from "@/actions/endpoints";
import {DataRow} from "@/types/dataRow";
import {useParams} from "next/navigation";

interface CheckInRow extends DataRow {
    bagId: string;
    flight: string;
    ticket: string;
    status: string;
    action: string;
}

const columns = ["bag id", "flight", "ticket", "status", "action"];
const rows: CheckInRow[] = [
    {
        bagId: "123654",
        flight: "AA3245",
        ticket: "7352841936",
        status: "Pending",
        action: "Remove",
    },
    {
        bagId: "543212",
        flight: "AA3245",
        ticket: "2349263712",
        status: "Cleared",
        action: "Remove",
    },
];

const SecurityClearanceDashboard = () => {
    const params = useParams();
    const flight_id = params?.flight_id as string;

    const [data, setData] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState<CheckInRow>();
    const [isConfirm, setConfirm] = React.useState<boolean>(false);

    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);
        await removeStaff(flight_id);
    };

    useEffect(() => {
        if (!flight_id) return;

        fetchOnBoardData()
            .then(setData)
            .catch(console.error);
    }, [flight_id]); // dependency array


    return (
        <>
            <UITable<CheckInRow>
                columns={columns}
                rows={rows}
                title='Security Clearance Dashboard'
                topAlignment='center'
                topButton={
                    <Typography variant="h6" sx={{fontWeight: 'normal'}} gutterBottom>
                        [ Bags at Gate ]
                    </Typography>
                }
                onActionCallback={(row) => {
                    setSelectedRow(row);
                    setConfirm(true);
                }}
            />
            <ConfirmEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Undo Onboard"
                dataId={flight_id}
                message={
                    <>
                        This will remove<strong>{selectedRow?.bagId}</strong> from the onboard list for
                        flight<strong>{selectedRow?.flight}.</strong> Do you want to continue?
                    </>
                }
                onRemove={handleOnRemove}
            />
        </>
    );
}

export default SecurityClearanceDashboard;
