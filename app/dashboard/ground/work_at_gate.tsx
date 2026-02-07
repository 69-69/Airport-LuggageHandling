'use client';

import React from 'react';
import {Button, Container, Typography} from "@mui/material";
import {Grid} from "@mui/system";
import UITable from "@/components/uiTable";
import {DataRow} from "@/types/dataRow";
import LoadBagToPlaneDialog from "@/components/ground/loadBagToPlaneDialog";
import MoveBagToGateDialog from "@/components/ground/moveBagToGateDialog";


interface BagRow extends DataRow {
    flight: string;
    status: string;
    bagId: string;
}

const columns = ["bag id", "flight", "status"];
const rows: BagRow[] = [
    {
        flight: "AA3245",
        status: "Checked-in",
        bagId: "Change Gate"
    },
    {
        flight: "UA9868",
        status: "Flagged",
        bagId: "Change Gate"
    },
];


const WorkAtGateDashboard = () => {
    const [isOpenBoard, setShowMoveDialog] = React.useState(false);
    const [openChangeGate, setShowLoadDialog] = React.useState(false);


    /// Move Bags To Gate Implementation
    const onMoveBagToGate = (row: DataRow) => {
        const {bagId, ticketNumber, newGate, terminal} = row;
        console.log('Move Bags To Gate', bagId, ticketNumber, newGate, terminal);
    }

    /// Load Bags To Plane Implementation
    const onLoadBagToPlane = (row: DataRow) => {
        const {bagId, location, passengerStatus} = row;
        console.log('Load Bags To Plane', bagId, location,
            passengerStatus);
    }

    return (
        <>
            {/*Active's Flight Info*/}
            <UITable<BagRow>
                title='Gate Staff Dashboard'
                name='Last name'
                columns={columns}
                topAlignment='justify'
                rows={rows}
                topButton={
                    <Container sx={{justifyContent: "space-between", mr: 0, pr: 0}}>
                        {/* Buttons */}
                        <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 2}} sx={{
                            justifyContent: "end"
                        }}>
                            <Grid size={{xs: 12, md: 3}}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        textTransform: 'none',
                                        '&': {boxShadow: 3},
                                    }}
                                    onClick={() => setShowMoveDialog(true)}
                                >
                                    Move Bags to Gate
                                </Button>
                            </Grid>
                            <Grid size={{xs: 12, md: 3}}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        textTransform: 'none',
                                        '&': {boxShadow: 3},
                                    }}
                                    onClick={() => setShowLoadDialog(true)}
                                >
                                    Load Bags to Plane
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Quick Actions */}
                        <Typography variant="h6" component="h4" gutterBottom>
                            [ Bags in Transit ]
                        </Typography>
                    </Container>
                }
                onActionCallback={(row: BagRow) => {
                }}
            />

            {/*Move Bags To Gate Dialog*/}
            {isOpenBoard && (<MoveBagToGateDialog
                open={isOpenBoard}
                onClose={() => setShowMoveDialog(false)}
                onMoveBag={onMoveBagToGate}
            />)}

            {/*Load Bags To Plane Dialog*/}
            {openChangeGate && (<LoadBagToPlaneDialog
                open={openChangeGate}
                onClose={() => setShowLoadDialog(false)}
                onLoadBag={onLoadBagToPlane}
            />)}
        </>
    )
}

export default WorkAtGateDashboard
