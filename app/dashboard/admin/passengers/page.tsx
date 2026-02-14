'use client';

import React, {useEffect} from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import AddPassengerDialog from "@/components/admin/addPassengerDialog";
import {DataRow} from "@/types/dataRow";
import {toTitleCase} from "@/utils/util";
import {Passenger} from "@/types/models";
import {passengerService} from "@/actions/services/passengerService";
import {bagService} from "@/actions/services/bagService";
import {RoleEnum} from "@/types/userRole";
import PageTitleUpdater from "@/components/pageTitleUpdater";
import RoleGuard from "@/actions/roleGuard";

interface PassengerRow extends DataRow {
    name: string;
    flight: string;
    ticket: string;
    status: string;
    bags: number;
    action: string;
}

const columns = ["name", "ticket", "flight", "status", "bags", "action"];

const Passengers = () => {

    // const [outcome, setOutcome] = React.useState<OutcomeProps>();
    const [isConfirm, setConfirm] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<DataRow>();
    const [isAdd, setIsAdd] = React.useState(false);
    const [passengerRows, setPassengerRows] = React.useState<Passenger[]>([]);

    // Fetch Passenger list
    const fetchPassengers = () => {
        try {
            const res: Passenger[] = passengerService.getAll();

            console.log('Before: Fetched passenger data:', res);
            setPassengerRows(res);
        } catch (e) {
            console.error("Error fetching passenger rows:", e);
        }
    };

    // Initial fetch
    useEffect(() => fetchPassengers(), []);

    const handleOnRemove = (proceed: boolean) => {
        if (proceed && selectedRow?.ticket !== null) {
            const ticket = selectedRow?.ticket as string;
            passengerService.remove(ticket);
            bagService.remove(ticket);
            fetchPassengers();
            setConfirm(false); // UI state stays on client
        }
    };

    return (
        <RoleGuard allowedRoles={[RoleEnum.ADMIN]}>
            <PageTitleUpdater />
            <UITable<PassengerRow>
                columns={columns}
                rows={(Array.isArray(passengerRows) ? passengerRows : []).map(p => ({
                    name: toTitleCase(`${p.firstName} ${p.lastName}`),
                    flight: p.flightNumber,
                    ticket: p.ticketNumber,
                    status: p.status,
                    bags: bagService.getBagsByTicket(p.ticketNumber),
                    action: "Remove",
                }))}
                title="Passenger Management"
                topButton={
                    <Button variant="outlined" sx={{textTransform: 'none'}} onClick={() => setIsAdd(true)}>
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
                dataId={selectedRow?.ticket as string}
                message={
                    <>
                        Are you sure you want to remove passenger<b>{selectedRow?.name}</b>from
                        flight<b>{selectedRow?.flight}</b>.This action cannot be undone.
                    </>
                }
                onRemove={handleOnRemove}
            />
            <AddPassengerDialog
                open={isAdd}
                onClose={() => setIsAdd(false)}
                refreshPassengers={fetchPassengers}
                // outcome={outcome}
                // setOutcome={setOutcome}
                // onAddPassenger={handleAddPassenger}
            />
        </RoleGuard>
    );
}

export default Passengers;


/*
const handleAddPassenger = (row: DataRow) => {
    const result: SendResult = addPassenger(row);

    if (result.success) {
        fetchPassengers();
        setOutcome({status: 'success', message: 'Passenger added successfully',});
        console.log("Passenger added!");
    } else {
        setOutcome({status: 'error', message: result.error ?? ''});
        console.log(result.error);
    }
};

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
];*/
