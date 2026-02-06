'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import RemoveFlightDialog from "@/components/admin/removeFlightDialog";
import {addFlight, removeFlight} from "@/actions/flight";
import AddFlightDialog from "@/components/admin/addFlightDialog";
import {DataRow} from "@/types/dataRow";

interface FlightTableProps {
    flightId: string;
    // onAddFlight: (flightId: string) => void;
}

interface FlightRow extends DataRow {
    airline: string;
    flight: string;
    terminal: string;
    gate: string;
    action: string;
}

const columns = ["airline", "flight", "terminal", "gate", "action"];
const rows: FlightRow[] = [
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

const FlightTable = ({flightId}: FlightTableProps) => {
    const [flightToRemove, setFlightToRemove] = React.useState<string | null>(null);
    const [isConfirm, setConfirm] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);


    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);
        await removeFlight(flightId);
        setConfirm(false); // UI state stays on client
    };

    const handleAddFlight = async (row: DataRow) => {
        const {airlineCode, flightNumber} = row;
        console.log('Airline', flightNumber);
        await addFlight(airlineCode);
    };

    return (
        <>
            <UITable<FlightRow>
                columns={columns}
                rows={rows}
                title={`Passenger Management ${flightId}`}
                topButton={
                    <Button variant="outlined" onClick={() => setIsAdd(true)}>
                        Add Flight
                    </Button>
                }
                onActionCallback={(row: FlightRow) => {
                    console.log('row', row.flight);
                    setFlightToRemove(row.flight);
                    setConfirm(true);
                }}
            />
            <RemoveFlightDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                flightId={flightId}
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
export default FlightTable;
