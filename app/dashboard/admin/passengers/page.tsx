'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addPassenger, removePassenger} from "@/actions/endpoints";
import AddPassengerDialog from "@/components/admin/addPassengerDialog";
import {DataRow} from "@/types/dataRow";

interface PassengerTableProps {
    passengerId: string;
    // onAddFlight: (flightId: string) => void;
}

interface PassengerRow extends DataRow {
    name: string;
    flight: string;
    ticket: string;
    status: string;
    action: string;
}

const columns = ["name", "ticket", "flight", "status", "action"];
const rows: PassengerRow[] = [
    {
        name: "Mary M.",
        flight: "AA3245",
        ticket: "7352841936",
        status: "Boarded",
        action: "Remove",
    },
    {
        name: "IP Man",
        flight: "UA9868",
        ticket: "1234432123",
        status: "Checked-in",
        action: "Remove",
    },
    {
        name: "Hassan A",
        flight: "SA1234",
        ticket: "9876543212",
        status: "Not-Checked-in",
        action: "Remove",
    }
];

const Passengers = ({passengerId}: PassengerTableProps) => {
    const [isConfirm, setConfirm] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<DataRow>();
    const [isAdd, setIsAdd] = React.useState(false);


    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);
        await removePassenger(passengerId);
        setConfirm(false); // UI state stays on client
    };

    const handleAddPassenger = async (row: DataRow) => {
        const {firstName, lastName} = row;
        console.log('First-Name', firstName);
        await addPassenger(lastName);
    };

    return (
        <>
            <UITable<PassengerRow>
                columns={columns}
                rows={rows}
                title={`Passenger Management ${passengerId}`}
                topButton={
                    <Button variant="outlined" sx={{textTransform:'none'}} onClick={() => setIsAdd(true)}>
                        Add Passenger
                    </Button>
                }
                onActionCallback={(row: PassengerRow) => {
                    console.log('row', row.flight);
                    setSelectedRow(row);
                    setConfirm(true);
                }}
            />
            <ConfirmEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Remove passenger"
                dataId={passengerId}
                message={
                    <>
                        Are you sure you want to remove passenger<b>{selectedRow?.name}</b>from flight<b>{selectedRow?.flight}</b>.This action cannot be undone.
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

export default Passengers;
