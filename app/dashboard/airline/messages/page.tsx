'use client';

import React, {useEffect} from "react";
import UITable from "@/components/uiTable";
import {Typography} from "@mui/material";
import RemoveEntityDialog from "@/components/removeEntityDialog";
import {addFlight, removeStaff} from "@/actions/flight";
import AddFlightDialog from "@/components/admin/addFlightDialog";
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

const fetchFlightData = async (flight_id: string) => {
    const res = await fetch(`/api/flights/${flight_id}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
};

const CheckInsTable = () => {
    const params = useParams();
    const flight_id = params?.flight_id as string;

    const [data, setData] = React.useState([]);
    const [isAdd, setIsAdd] = React.useState<boolean>(false);
    const [selectedRow, setSelectedRow] = React.useState<CheckInRow>();
    const [isConfirm, setConfirm] = React.useState<boolean>(false);

    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);
        await removeStaff(flight_id);
    };

    const handleAddFlight = async (row: DataRow) => {
        const {airlineCode, flightNumber} = row;
        console.log('Flight', flightNumber);
        await addFlight(airlineCode);
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
                title='Checked-in Passengers'
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
            <RemoveEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Undo Check-in"
                flightId={flight_id}
                message={
                    <>
                        This will remove<strong>{selectedRow?.name}</strong> from the check-in list for
                        flight<strong>{selectedRow?.flight}.</strong> Do you want to continue?
                    </>
                }
                onRemove={handleOnRemove}
            />
            <AddFlightDialog
                open={isAdd}
                onClose={() => setIsAdd(false)}
                onAddFlight={handleAddFlight}
            />
        </>
    );
}

export default CheckInsTable;
