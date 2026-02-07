'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addStaff, removeStaff} from "@/actions/endpoints";
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
    action: string;
}

const columns = ["name", "role", "Airline", "action"];
const rows: StaffRow[] = [
    {
        name: "Mary M.",
        role: "Gate",
        airline: "AA",
        action: "Remove",
    },
    {
        name: "IP Man",
        role: "Airline",
        airline: "UA",
        action: "Remove",
    },
    {
        name: "Hassan A",
        airline: "SA",
        role: "Ground",
        action: "Remove",
    }
];

const Staffs = ({staffId}: StaffTableProps) => {
    const [selectedRow, setSelectedRow] = React.useState<DataRow>();
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
                    setSelectedRow(row);
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
                        Are you sure you want to remove staff<b>{selectedRow?.name}</b>account? This action cannot be undone.
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

export default Staffs;
