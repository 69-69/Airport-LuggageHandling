'use client';

import React from 'react';
import {Button, Container, Typography} from "@mui/material";
import {Grid} from "@mui/system";
import UITable from "@/components/uiTable";
import {DataRow} from "@/types/dataRow";
import PageTitleUpdater from "@/components/pageTitleUpdater";
import BoardDialog from "@/components/gate/boardDialog";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import ChangeGateDialog from "@/components/gate/changeGateDialog";
import ConfirmDepartureDialog from "@/components/gate/confirmDepartureDialog";
import {RoleEnum} from "@/types/userRole";
import RoleGuard from "@/actions/roleGuard";


interface TodayFlightRow extends DataRow {
    flight: string;
    terminal: string;
    gate: string;
    status: string;
    totalPassengers: number;
    action: string;
}

const columns = ["flight", "terminal", "gate", "status", "total passengers", "action"];
const rows: TodayFlightRow[] = [
    {
        flight: "AA3245",
        terminal: "T5",
        gate: "G5",
        status: "Boarding",
        totalPassengers: 234,
        action: "Change Gate"
    },
    {
        flight: "UA9868",
        terminal: "T9",
        gate: "G9",
        status: "Open",
        totalPassengers: 234,
        action: "Change Gate"
    },
];


const GateStaffDashboard = () => {
    const [isConfirm, setConfirm] = React.useState(false);
    const  [isConfirmDeparture, setConfirmDeparture] = React.useState(false);
    const [isConfirmChanges, setConfirmChanges] = React.useState(false);
    const [isOpenBoard, setOpenBoard] = React.useState(false);
    const [openChangeGate, setChangeGate] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<DataRow>();
    const [newGate, setNewGate] = React.useState<DataRow>();
    const [ticketNumber, setTicketNumber] = React.useState<string>('');


    /// Confirm Departure Implementation
    const onConfirmDeparture = (success: boolean) => {
        if (success) {

        console.log('Confirm Departure successful', success);
        }
    }

    /// Passenger OnBoarding Implementation
    const handleBoarding = (row: DataRow) => {
        setConfirm(true);
        setTicketNumber(row.ticketNumber as string);

        const {ticketNumber, flightNumber} = row;
        console.log(ticketNumber, flightNumber);
    }

    const onConfirmedBoarding = (choice: boolean) => {
        console.log('Boarding choice', choice);
        if (isConfirm) {
            // @ TODO API integration here
            console.log('on boarding passenger with ticket Number:', ticketNumber);
        }
    }


    /// Change Gate Implementation
    const handleChangeGate = (row: DataRow) => {
        setConfirmChanges(true);
        setNewGate(row);

        const {ticketNumber, flightNumber} = row;
        console.log(ticketNumber, flightNumber);
    }

    const onConfirmedGateChanges = (choice: boolean) => {
        console.log('Change Gate choice', choice);
        if (isConfirm) {
            // @ TODO API integration here
            console.log('Change Gate from:', newGate?.terminal, newGate?.newGate);
        }
    }

    return (
        <>
            {/*Active's Flight Info*/}
            <UITable<TodayFlightRow>
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
                                    onClick={() => setOpenBoard(true)}
                                >
                                    Board Passenger
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
                                    onClick={() => setConfirmDeparture(true)}
                                >
                                    Confirm Departure
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Quick Actions */}
                        <Typography variant="h6" component="h4" fontWeight='normal' gutterBottom>
                            [ <b>Active Flight</b> (AA) ]
                        </Typography>
                    </Container>
                }
                onActionCallback={(row: TodayFlightRow) => {
                    console.log('set Change Gate', row.flight);
                    setChangeGate(true);
                    setSelectedRow(row);
                }}
            />

            {/*Confirm Departure Dialog*/}
            {isConfirmDeparture && (<ConfirmDepartureDialog
                open={isConfirmDeparture}
                recipientId={'1'}
                onClose={() => setConfirmDeparture(false)}
                onConfirmDeparture={onConfirmDeparture}
            />)}

            {/*Boarding Dialog*/}
            {isOpenBoard && (<BoardDialog
                open={isOpenBoard}
                onClose={() => setOpenBoard(false)}
                onBoard={handleBoarding}
            />)}

            {/*Confirm Boarding Dialog*/}
            {isConfirm && (<ConfirmEntityDialog
                open={isConfirm}
                onClose={() => setConfirm(false)}
                title="Confirm Boarding"
                dataId={ticketNumber}
                message={
                    <>
                        Confirm boarding for passenger with Ticket<strong>{ticketNumber}</strong>
                    </>
                }
                onRemove={onConfirmedBoarding}
            />)}


            {/*Change Passenger Gate Info Dialog*/}
            {openChangeGate && (<ChangeGateDialog
                open={openChangeGate}
                oldFlight={selectedRow?.flight as string}
                oldGate={selectedRow?.terminal + '-' + selectedRow?.gate}
                onClose={() => setChangeGate(false)}
                onChangeGate={handleChangeGate}
            />)}

            {/*Confirm Passenger's Change Gate Dialog*/}
            {isConfirmChanges && (<ConfirmEntityDialog
                open={isConfirmChanges}
                onClose={() => setConfirmChanges(false)}
                title="Confirm Gate Changes"
                dataId={selectedRow?.flight as string}
                message={
                    <>
                        Are you sure you want to change the gate for Flight<b>{selectedRow?.flight}</b> from:
                        <b style={{color:'red'}}>{selectedRow?.terminal}-{selectedRow?.gate}</b>
                        to <b style={{color:'green'}}>{newGate?.terminal}-{newGate?.newGate}</b>
                    </>
                }
                onRemove={onConfirmedGateChanges}
            />)}
        </>
    )
}

export default GateStaffDashboard
