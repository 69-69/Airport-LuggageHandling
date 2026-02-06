'use client';

import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Grid} from "@mui/system";
import UITable from "@/components/uiTable";
import CheckInDialog from "@/components/airline/checkInDialog";
import {DataRow} from "@/types/dataRow";
import PageTitleUpdater from "@/components/pageTitleUpdater";
import {RoleEnum} from "@/types/userRole";
import RoleGuard from "@/actions/roleGuard";


interface TodayFlightRow extends DataRow {
    flight: string;
    gate: string;
    status: string;
}

const columns = ["flight", "gate", "status"];
const rows: TodayFlightRow[] = [
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


const AirlineStaffDashboard = () => {
    const [isOpenCheckIn, setOpenCheckIn] = React.useState(false);

    const handleCheckIn = (row: DataRow) => {
        const {ticketNumber, flightNumber} = row;
        console.log(ticketNumber, flightNumber);
    }

    return (
        <RoleGuard allowedRoles={[RoleEnum.AIRLINE]}>
            <PageTitleUpdater />

            {/*Today's Flight Info*/}
            <UITable<TodayFlightRow>
                title='Airline Staff Dashboard'
                name='Last name'
                columns={columns}
                topAlignment ='justify'
                rows={rows}
                topButton={
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                        justifyContent: "space-between",
                    }}>
                        {/* Quick Actions */}
                        <Grid size={{ xs:12, md:4}}>
                            <Typography variant="h6" component="h4" fontWeight='normal' gutterBottom>
                                [ <b>Today's Flight</b> (AA) ]
                            </Typography>
                        </Grid>

                        {/* System Overview */}
                        <Grid size={{ xs:12, md:4}}>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    width: '100%',
                                    textTransform: 'none',
                                    '&': {boxShadow: 3},
                                }}
                                onClick={() => setOpenCheckIn(true)}
                            >
                                Check-in Passenger
                            </Button>
                        </Grid>
                    </Grid>
                }
                onActionCallback={(row: TodayFlightRow) => {
                    console.log('row', row.flight);
                }}
            />

            {/*Check-In Dialog*/}
            {isOpenCheckIn && (<CheckInDialog
                open={isOpenCheckIn}
                onClose={() => setOpenCheckIn(false)}
                onCheckIn={handleCheckIn}
            />)}
        </RoleGuard>
    )
}
export default AirlineStaffDashboard
