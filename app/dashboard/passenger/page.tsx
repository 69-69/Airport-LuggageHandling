'use client';

import React from 'react';
import {Button, Container, Typography} from "@mui/material";
import {Grid} from "@mui/system";
import UITable from "@/components/uiTable";
import {DataRow} from "@/types/dataRow";
import PageTitleUpdater from "@/components/pageTitleUpdater";
import MyBagDialog from "@/components/passenger/myBagDialog";
import MyGateDialog from "@/components/passenger/myGateDialog";
import {RoleEnum} from "@/types/userRole";
import RoleGuard from "@/actions/roleGuard";


interface SummaryRow extends DataRow {
    flight: string;
    gate: string;
    bag: number;
}

interface MyGateRow extends DataRow {
    flight: string;
    gate: string;
    terminal: string;
}

interface MyBagRow extends DataRow {
    id: string;
    currentLocation: string;
}

const columns = ["flight", "gate", "bag"];
const rows: SummaryRow[] = [
    {
        flight: "AA3245",
        gate: "G5",
        bag: 234,
    },
    {
        flight: "UA9868",
        gate: "G9",
        bag: 234,
    },
];

const gateColumns = ["flight", "terminal", "gate"];
const gateRows: MyGateRow[] = [
    {
        flight: "AA3245",
        terminal: "T3",
        gate: "G5",
    },
];

const bagColumns = ["id", "current location"];
const bagRows: MyBagRow[] = [
    {
        id: "AA3245",
        currentLocation: "T5-G5",
    },
    {
        id: "UA9868",
        currentLocation: "T3-G9",
    },
];


const PassengerDashboard = () => {
    const [openMyBags, setMyBags] = React.useState(false);
    const  [openMyGate, setMyGate] = React.useState(false);


    return (
        <RoleGuard allowedRoles={[RoleEnum.PASSENGER]}>
            <PageTitleUpdater/>

            {/*Active's Flight Info*/}
            <UITable<SummaryRow>
                title='Passenger Dashboard'
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
                            <Grid size={{xs: 12, md: 2}}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        textTransform: 'none',
                                        '&': {boxShadow: 3},
                                    }}
                                    onClick={() => setMyBags(true)}
                                >
                                    My Bags
                                </Button>
                            </Grid>
                            <Grid size={{xs: 12, md: 2}}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        textTransform: 'none',
                                        '&': {boxShadow: 3},
                                    }}
                                    onClick={() => setMyGate(true)}
                                >
                                    My Gate
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Quick Actions */}
                        <Typography variant="h6" component="h4" gutterBottom>
                            [ Summary ]
                        </Typography>
                    </Container>
                }
            />

            {/*My Bags Dialog*/}
            {openMyBags && (<MyBagDialog<MyBagRow>
                open={openMyBags}
                columns={bagColumns}
                rows={bagRows}
                onClose={() => setMyBags(false)}
            />)}

            {/*My Gate Dialog*/}
            {openMyGate && (<MyGateDialog<MyGateRow>
                open={openMyGate}
                columns={gateColumns}
                rows={gateRows}
                onClose={() => setMyGate(false)}
            />)}
        </RoleGuard>
    )
}
export default PassengerDashboard
