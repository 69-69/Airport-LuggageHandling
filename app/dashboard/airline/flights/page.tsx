'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Button} from "@mui/material";
import RemoveEntityDialog from "@/components/admin/removeEntityDialog";
import {addFlight, removeStaff} from "@/actions/flight";
import AddFlightDialog from "@/components/admin/addFlightDialog";
import {DataRow} from "@/types/dataRow";

interface FlightTableProps {
    flightId: string;
    // onAddFlight: (flightId: string) => void;
}

interface FlightsRow extends DataRow {
    flight: string;
    gate: string;
    status: string;
}

const columns = ["flight", "gate", "status"];
const rows: FlightsRow[] = [
    {
        flight: "AA3245",
        gate: "G5",
        status: "Boarding",
    },
    {
        flight: "UA9868",
        gate: "G9",
        status: "Open",
    },
];

const TodayFlightTable = ({flightId}: FlightTableProps) => {
    const [isAdd, setIsAdd] = React.useState(false);


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
            <UITable<FlightsRow>
                columns={columns}
                rows={rows}
                // topButton={}
                onActionCallback={(row: FlightsRow) => {
                    console.log('row', row.flight);
                }}
            />
            <AddFlightDialog
                open={isAdd}
                onClose={() => setIsAdd(false)}
                onAddFlight={handleAddFlight}
            />
        </>
    );
}

export default TodayFlightTable;
