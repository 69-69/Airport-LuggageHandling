'use client';

import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import {DataRow} from "@/types/dataRow";
import UITable from "@/components/uiTable";
import {Grid, TextField, Typography} from "@mui/material";

interface BaggageRow extends DataRow {
    bagId: string;
    airline: React.ReactNode;
    ticket: string;
    location: string;
    weight: string;
    terminal: string;
}

const columns = ["bag id", "airline", "ticket", "location", "weight", "terminal"];
const rows: BaggageRow[] = [
    {
        bagId: "123456",
        airline: "UA",
        ticket: '7352841936',
        location: "Check-in Counter ",
        weight: "45",
        terminal: "T3"
    },
    {
        bagId: "654321",
        airline: "AA",
        ticket: '9876543212',
        location: "Gate 5",
        weight: "145",
        terminal: "T9"
    },
];

const fetchBaggage = async (flight_id: string) => {
    const res = await fetch(`/api/baggage/${flight_id}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
};

const BaggageManifest = () => {
    const params = useParams();
    const flight_id = params?.flight_id as string;
    const [data, setData] = React.useState([]);


    useEffect(() => {
        if (!flight_id) return;

        fetchBaggage(flight_id)
            .then(setData)
            .catch(console.error);
    }, [flight_id]); // dependency array


    return (
        <>
            <UITable<BaggageRow>
                columns={columns}
                rows={rows}
                title='Baggage Manifest'
                topAlignment='justify'
                topButton={
                    <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 2}} sx={{
                        justifyContent: "space-between",
                    }}>
                        <Grid size={{xs: 12, md: 3}}>
                            <Typography variant="h6" component="h4" gutterBottom sx={{justifyContent: "start"}}>
                                [ List of Baggage ]
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 12, md: 3}}>
                            {/* Search/Filter */}
                            <TextField size='small' placeholder='Search by bag id...' sx={{justifyContent: "end"}}/>
                        </Grid>
                    </Grid>
                }
                onActionCallback={(row) => {
                }}
            />
        </>
    );
}
export default BaggageManifest
