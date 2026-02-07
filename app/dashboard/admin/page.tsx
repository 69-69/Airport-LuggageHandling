'use client';

import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Grid, Stack} from "@mui/system";
import AddFlightDialog from "@/components/admin/addFlightDialog";
import {DataRow} from "@/types/dataRow";
import {addFlight} from "@/actions/endpoints";
import AddPassengerDialog from "@/components/admin/addPassengerDialog";
import AddStaffDialog from "@/components/admin/addStaffDialog";
import PageTitleUpdater from "@/components/pageTitleUpdater";
import {RoleEnum} from "@/types/userRole";
import RoleGuard from "@/actions/roleGuard";

const AdminDashboard = () => {
    const [isOpenFlight, setOpenFlight] = React.useState(false);
    const [isOpenPassenger, setOpenPassenger] = React.useState(false);
    const [isOpenStaff, setOpenStaff] = React.useState(false);

    const handleAddFlight = async (row: DataRow) => {
        const {airlineCode, flightNumber} = row;
        console.log('Airline', flightNumber);
        await addFlight(airlineCode);
    };

    return (
        <RoleGuard allowedRoles={[RoleEnum.ADMIN]}>
            <Box component="section" sx={{p: 2, ml: {md:40}, width: {xs: '100%', sm: '80%', md: '80%',}}}>
                <PageTitleUpdater/>

                {/* Page title */}
                <Typography variant="h4" component="h1" sx={{textAlign: 'center'}} gutterBottom>
                    Administrator Dashboard
                </Typography>

                <Typography variant="body1" sx={{mb: 3, textAlign: 'center'}}>
                    <b>Welcome</b>, Admin!
                </Typography>

                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    {/* Quick Actions */}
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography variant="h6" component="h4" gutterBottom>
                            [ Quick Actions ]
                        </Typography>

                        <Stack spacing={2} component="ul" sx={{listStyle: 'none', p: 0, m: 0}}>
                            {[
                                {label: 'Add Flight', open: () => setOpenFlight(true)},
                                {label: 'Add Passenger', open: () => setOpenPassenger(true)},
                                {label: 'Add Staff Account', open: () => setOpenStaff(true)},
                            ].map((action) => (
                                <li key={action.label}>
                                    <Button
                                        variant='outlined'
                                        size="large"
                                        sx={{
                                            width: '100%',
                                            textTransform: 'none',
                                            '&': {boxShadow: 3},
                                        }}
                                        onClick={action.open}
                                    >
                                        {action.label}
                                    </Button>
                                </li>
                            ))}
                        </Stack>
                    </Grid>

                    {/* System Overview */}
                    <Grid size={{xs: 12, md: 4}}>
                        <Typography variant="h6" component="h4" gutterBottom>
                            [ System Overview ]
                        </Typography>
                        {/* Add your system info here */}
                        <Stack spacing={2} component="ul" sx={{listStyle: 'none', p: 0, m: 0, alignItems: 'start'}}>
                            {[
                                {label: 'Active Flights', data: 267},
                                {label: 'Passengers Today', data: 800},
                                {label: 'Staff Accounts', data: 30},
                            ].map((action) => (
                                <li key={action.label}>
                                    <Button
                                        variant="text"
                                        size="large"
                                        sx={{
                                            width: '100%',
                                            fontWeight: 'normal',
                                            textTransform: 'none',
                                            justifyContent: 'flex-start',
                                            '&:hover': {textDecorationLine: 'underline'},
                                        }}
                                    >
                                        <b style={{marginRight: 8}}>{action.label}:</b>{action.data}
                                    </Button>
                                </li>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
                {isOpenFlight && (<AddFlightDialog
                    open={isOpenFlight}
                    onClose={() => setOpenFlight(false)}
                    onAddFlight={handleAddFlight}
                />)}
                {isOpenPassenger && (<AddPassengerDialog
                    open={isOpenPassenger}
                    onClose={() => setOpenPassenger(false)}
                    onAddPassenger={handleAddFlight}
                />)}
                {isOpenStaff && (<AddStaffDialog
                    open={isOpenStaff}
                    onClose={() => setOpenStaff(false)}
                    onAddStaff={handleAddFlight}
                />)}
            </Box>
        </RoleGuard>
    )
}
export default AdminDashboard
