'use client';

import React, {useEffect} from "react";
import UITable from "@/components/uiTable";
import {Typography} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addFlight, fetchOnBoardData, removeStaff} from "@/actions/endpoints";
import {DataRow} from "@/types/dataRow";
import {useParams} from "next/navigation";

interface ClearanceRow extends DataRow {
    bagId: string;
    flight: string;
    ticket: string;
    status: string;
    action: string;
}

const columns = ["bag id", "flight", "ticket", "status", "action"];
const rows: ClearanceRow[] = [
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

const WorkAtClearanceDashboard = () => {
    const params = useParams();
    const flight_id = params?.flight_id as string;

    const [data, setData] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState<ClearanceRow>();
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
            <UITable<ClearanceRow>
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
                title="Security Clearance"
                dataId={flight_id}
                message={
                    <>
                        Are you sure you want to proceed with the selected?
                    </>
                }
                onRemove={handleOnRemove}
            />
        </>
    );
}

export default WorkAtClearanceDashboard;
