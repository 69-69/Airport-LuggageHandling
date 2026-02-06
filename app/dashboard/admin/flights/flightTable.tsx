'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addFlight, removeStaff} from "@/actions/endpoints";
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
        await removeStaff(flightId);
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
                title={`Flight Management ${flightId}`}
                topButton={
                    <Button variant="outlined" sx={{textTransform:'none'}} onClick={() => setIsAdd(true)}>
                        Add Flight
                    </Button>
                }
                onActionCallback={(row: FlightRow) => {
                    console.log('row', row.flight);
                    setFlightToRemove(row.flight);
                    setConfirm(true);
                }}
            />
            <ConfirmEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Remove Flight"
                dataId={flightId}
                message={
                    <>
                        Are you sure you want to remove <strong>Flight AA3245</strong> from the system?
                    </>
                }
                onRemove={handleOnRemove}
            />
            {isAdd && (<AddFlightDialog
                open={isAdd}
                onClose={() => setIsAdd(false)}
                onAddFlight={handleAddFlight}
            />)}
        </>
    );
}

export default FlightTable;
