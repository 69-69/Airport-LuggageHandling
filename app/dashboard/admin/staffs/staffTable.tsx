'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addFlight, addStaff, removeStaff} from "@/actions/endpoints";
import AddPassengerDialog from "@/components/admin/addPassengerDialog";
import {DataRow} from "@/types/dataRow";
import AddStaffDialog from "@/components/admin/addStaffDialog";

interface StaffTableProps {
    staffId: string;
    // onAddFlight: (flightId: string) => void;
}

interface StaffRow extends DataRow {
    name: string;
    role: string;
    airline: string;
    status: string;
    action: string;
}

const columns = ["name", "role", "Airline", "status", "action"];
const rows: StaffRow[] = [
    {
        name: "Mary M.",
        role: "Gate",
        airline: "AA",
        status: "Enabled",
        action: "Remove",
    },
    {
        name: "IP Man",
        role: "Airline",
        airline: "UA",
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

const StaffTable = ({staffId}: StaffTableProps) => {
    const [staffToRemove, setStaffToRemove] = React.useState<string | null>(null);
    const [isConfirm, setConfirm] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);


    const handleOnRemove = async (proceed: boolean) => {
        console.log('proceed', proceed);

        await removeStaff(staffId);
        setConfirm(false); // UI state stays on client
    };

    const handleAddStaff = async (row: DataRow) => {
        const {firstName, lastName} = row;

        console.log('lastName', lastName);
        await addStaff(firstName);
    };

    return (
        <>
            <UITable<StaffRow>
                columns={columns}
                rows={rows}
                title={`Staff Management ${staffId}`}
                topButton={
                    <Button variant="outlined" sx={{textTransform:'none'}} onClick={() => setIsAdd(true)}>
                        Add Staff
                    </Button>
                }
                onActionCallback={(row: StaffRow) => {
                    console.log('row', row.airline);
                    setStaffToRemove(row.airline);
                    setConfirm(true);
                }}
            />
            <ConfirmEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Remove Staff"
                dataId={staffId}
                message={
                    <>
                        Are you sure you want to remove staff <b>IP Man</b> account? This action cannot be undone.
                    </>
                }
                onRemove={handleOnRemove}
            />
            <AddStaffDialog
                open={isAdd}
                onClose={() => setIsAdd(false)}
                onAddStaff={handleAddStaff}
            />
        </>
    );
}

export default StaffTable;
