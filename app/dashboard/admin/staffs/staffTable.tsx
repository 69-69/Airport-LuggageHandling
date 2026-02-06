'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import RemoveEntityDialog from "@/components/admin/removeEntityDialog";
import {addFlight, removeFlight} from "@/actions/flight";
import AddPassengerDialog from "@/components/admin/addPassengerDialog";
import {DataRow} from "@/types/dataRow";

interface StaffTableProps {
    passengerId: string;
    // onAddFlight: (flightId: string) => void;
}

interface StaffRow extends DataRow {
    name: string;
    role: string;
    airline: string;
    status: string;
    action: string;
}

const columns = ["name", "role", "Airline Assigned", "status", "action"];
const rows: StaffRow[] = [
    {
        name: "Mary M.",
        airline: "AA",
        role: "Gate",
        status: "Enabled",
        action: "Remove",
    },
    {
        name: "IP Man",
        airline: "UA",
        role: "Airline",
        status: "Enabled",
        action: "Remove",
    },
    {
        name: "Hassan A",
        airline: "SA",
        role: "Ground",
        status: "Disabled",
        action: "Remove",
    }
];

const StaffTable = ({passengerId}: StaffTableProps) => {
    const [passengerToRemove, setPassengerToRemove] = React.useState<string | null>(null);
    const [isConfirm, setConfirm] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);


    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);
        await removeFlight(passengerId);
        setConfirm(false); // UI state stays on client
    };

    const handleAddPassenger = async (row: DataRow) => {
        const {airlineCode, flightNumber} = row;
        console.log('Airline', flightNumber);
        await addFlight(airlineCode);
    };

    return (
        <>
            <UITable<StaffRow>
                columns={columns}
                rows={rows}
                title={`Passenger Management ${passengerId}`}
                topButton={
                    <Button variant="outlined" onClick={() => setIsAdd(true)}>
                        Add Passenger
                    </Button>
                }
                onActionCallback={(row: StaffRow) => {
                    console.log('row', row.airline);
                    setPassengerToRemove(row.airline);
                    setConfirm(true);
                }}
            />
            <RemoveEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Remove passenger"
                flightId={passengerId}
                message={
                    <>
                        Are you sure you want to remove passenger Mary M. from <strong>Flight AA1234?</strong> This action cannot be undone.
                    </>
                }
                onRemove={handleOnRemove}
            />
            <AddPassengerDialog
                open={isAdd}
                onClose={() => setIsAdd(false)}
                onAddPassenger={handleAddPassenger}
            />
        </>
    );
}

export default StaffTable;
