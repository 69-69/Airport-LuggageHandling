'use client';

import React from "react";
import UITable, {TableRow} from "@/components/uiTable";
import {Button} from "@mui/material";
import RemoveFlightDialog from "@/components/admin/removeFlightDialog";
import {addFlight, removeFlight} from "@/actions/flight";

interface FlightTableProps {
 flightId: string;
 // onAddFlight: (flightId: string) => void;
}
const columns = ["airline", "flight", "terminal", "gate", "action"];

const rows = [
    {
        airline: "AA",
        flight: "AA3245",
        terminal: "T2",
        gate: "G5",
        action: "Remove",
    },
    {
        airline: "UA",
        flight: "UA9868",
        terminal: "T9",
        gate: "G9",
        action: "Remove",
    },
    {
        airline: "SA",
        flight: "SA1234",
        terminal: "T7",
        gate: "G4",
        action: "Remove",
    }
];

const FlightTable =  ({flightId}: FlightTableProps) => {
    const [isConfirm, setConfirm] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);
    const handleOnRemove = async () => {
        await removeFlight(flightId);
        setConfirm(false); // UI state stays on client
    };

    const handleAddFlight = async (row: TableRow) => {
        await addFlight(row);
    };

    return (
        <>
            <UITable
                columns={columns}
                rows={rows}
                title={`Flight Management ${flightId}`}
                topButton={
                    <Button variant="outlined" onClick={() => setIsAdd(true)}>
                        Add Flight
                    </Button>
                }
                onCallback={handleAddFlight}
            />
            {
                isConfirm && (<RemoveFlightDialog
                    open={isConfirm}
                    onClose={() => setConfirm(false)}
                    flightId={flightId}
                    onRemove={handleOnRemove}
                />)
            }
        </>
    );
}
export default FlightTable;
