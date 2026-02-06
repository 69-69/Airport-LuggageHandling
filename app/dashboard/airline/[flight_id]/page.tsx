'use client';

import React, {useEffect} from "react";
import UITable from "@/components/uiTable";
import {Typography} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {fetchFlightData, removeStaff} from "@/actions/endpoints";
import {DataRow} from "@/types/dataRow";
import {useParams} from "next/navigation";

interface CheckInRow extends DataRow {
    name: string;
    flight:string;
    ticket:string;
    status: string;
    action: string;
}

const columns = ["name", "flight", "ticket", "status", "action"];
const rows: CheckInRow[] = [
    {
        name: "Mary M.",
        flight: "AA3245",
        ticket: "7352841936",
        status: "Checked-in",
        action: "Remove",
    },
    {
        name: "Dan IP",
        flight: "AA3245",
        ticket: "2349263712",
        status: "Checked-in",
        action: "Remove",
    },
];

const CheckInsTable = () => {
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

        fetchFlightData(flight_id)
            .then(setData)
            .catch(console.error);
    }, [flight_id]); // dependency array


    return (
        <>
            <UITable<CheckInRow>
                columns={columns}
                rows={rows}
                title='Passenger Manifest'
                topAlignment='center'
                topButton={
                    <Typography variant="h6" sx={{fontWeight: 'normal'}} gutterBottom>
                        [ Flight: AA3245 ]
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
                title="Undo Check-in"
                dataId={flight_id}
                message={
                    <>
                        This will remove<strong>{selectedRow?.name}</strong> from the check-in list for
                        flight<strong>{selectedRow?.flight}.</strong> Do you want to continue?
                    </>
                }
                onRemove={handleOnRemove}
            />
        </>
    );
}

export default CheckInsTable;
