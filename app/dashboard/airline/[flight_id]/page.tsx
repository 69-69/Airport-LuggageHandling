'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Box, Button, Typography} from "@mui/material";
import RemoveEntityDialog from "@/components/removeEntityDialog";
import {addFlight, removeStaff} from "@/actions/flight";
import AddFlightDialog from "@/components/admin/addFlightDialog";
import {DataRow} from "@/types/dataRow";
import {useRouter} from "next/navigation";

interface CheckInTableProps {
    flightId: string;
    // onAddFlight: (flightId: string) => void;
}

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

const CheckInsTable = ({flightId}: CheckInTableProps) => {
    const [isAdd, setIsAdd] = React.useState<boolean>(false);
    const [selectedRow, setSelectedRow] = React.useState<CheckInRow>();
    const [isConfirm, setConfirm] = React.useState<boolean>(false);


    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);
        await removeStaff(flightId);
    };

    const handleAddFlight = async (row: DataRow) => {
        const {airlineCode, flightNumber} = row;
        console.log('Flight', flightNumber);
        await addFlight(airlineCode);
    };

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
                flightId={flightId}
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
