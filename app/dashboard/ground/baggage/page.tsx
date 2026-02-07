'use client';

import React, {useEffect} from "react";
import {useParams} from "next/navigation";
import {DataRow} from "@/types/dataRow";
import UITable from "@/components/uiTable";
import {Grid, TextField, Typography} from "@mui/material";
import {fetchBaggage} from "@/actions/endpoints";

interface BaggageRow extends DataRow {
    bagId: string;
    airline: string;
    ticket: string;
    location: string;
    weight: string;
    terminal: string;
}

const columns = ["bag id", "airline", "ticket", "location", "weight", "terminal"];
let initialRows: BaggageRow[] = [
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

const BaggageManifest = () => {
    const params = useParams();
    const flight_id = params?.flight_id as string;
    const [rows, setRows] = React.useState<BaggageRow[]>(initialRows);
    const [filteredRows, setFilteredRows] = React.useState<BaggageRow[]>(initialRows);

    useEffect(() => {
        if (!flight_id) return;

        fetchBaggage(flight_id)
            .then((remoteRows: BaggageRow[]) => {
                if (remoteRows?.length) {
                    setRows(remoteRows);
                    setFilteredRows(remoteRows);
                }
            })
            .catch(console.error);
    }, [flight_id]); // dependency array

    const filterBy = (term: string) => {
        const searchTerm = term.toLowerCase().trim();

        if (!searchTerm) {
            setFilteredRows(rows);
            return;
        }

        const filtered = initialRows.filter((row) =>
            row.bagId.toLowerCase().includes(term) ||
            row.airline?.toLowerCase().includes(term) ||
            row.ticket.toLowerCase().includes(term) ||
            row.location.toLowerCase().includes(term) ||
            row.weight.toLowerCase().includes(term) ||
            row.terminal?.toLowerCase().includes(term)
        );
        setFilteredRows(filtered);
    }


    return (
        <>
            <UITable<BaggageRow>
                columns={columns}
                rows={filteredRows}
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
                            <TextField
                                size='small'
                                sx={{justifyContent: "end"}}
                                placeholder='Search by any ...'
                                onChange={(e) => filterBy(e.target.value)}
                            />
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
