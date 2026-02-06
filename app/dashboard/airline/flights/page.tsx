'use client';

import React from "react";
import UITable from "@/components/uiTable";
import {Box, Button, Typography} from "@mui/material";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import {addFlight, removeStaff} from "@/actions/endpoints";
import AddFlightDialog from "@/components/admin/addFlightDialog";
import {DataRow} from "@/types/dataRow";
import {useRouter} from "next/navigation";

interface FlightTableProps {
    flightId: string;
    // onAddFlight: (flightId: string) => void;
}

interface FlightRow extends DataRow {
    flight: string;
    terminal:string;
    gate: string;
    totalPassengers: number;
    action: string;
}

const columns = ["flight", "terminal", "gate", "total passengers", "action"];
const rows: FlightRow[] = [
    {
        flight: "AA3245",
        terminal: "T3",
        gate: "G5",
        totalPassengers: 209,
        action: "View Manifest",
    },
    {
        flight: "UA9868",
        terminal: "T9",
        gate: "G9",
        totalPassengers: 699,
        action: "View Manifest",
    },
];

const AirlineFlightsTable = ({flightId}: FlightTableProps) => {
    const router = useRouter();
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
            <UITable<FlightRow>
                columns={columns}
                rows={rows}
                title='Airline Flight info'
                topAlignment='center'
                topButton={
                    <Typography variant="h6" sx={{fontWeight: 'normal'}} gutterBottom>
                        [ Current Flights ]
                    </Typography>
                }
                onActionCallback={(row: FlightRow) => router.push(`/dashboard/airline/${row.flight}`)}
            />
            <AddFlightDialog
                open={isAdd}
                onClose={() => setIsAdd(false)}
                onAddFlight={handleAddFlight}
            />
        </>
    );
}

export default AirlineFlightsTable;
