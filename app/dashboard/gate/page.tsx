'use client';

import React, {useEffect, useState} from 'react';
import PageTitleUpdater from "@/components/pageTitleUpdater";
import {RoleEnum} from "@/types/userRole";
import RoleGuard from "@/actions/roleGuard";
import {useAuth} from "@/actions/authContext";
import FullScreenLoader from "@/components/fullScreenLoader";
import UITable from "@/components/uiTable";
import {Button, Container, Typography} from "@mui/material";
import {Grid} from "@mui/system";
import ConfirmDepartureDialog from "@/components/gate/confirmDepartureDialog";
import BoardDialog from "@/components/gate/boardDialog";
import ConfirmEntityDialog from "@/components/confirmEntityDialog";
import ChangeGateDialog from "@/components/gate/changeGateDialog";
import {DataRow} from "@/types/dataRow";
import {Flight, MessageBoard, Passenger, UserRole} from "@/types/models";
import {flightService} from "@/actions/services/flightService";
import {OutcomeProps, toTitleCase} from "@/utils/util";
import {formatTime, setOutcomeHelper} from "@/utils/validators";
import {passengerService} from "@/actions/services/passengerService";
import {messageBoardService} from "@/actions/services/messageBoardService";


interface GateFlightRow extends DataRow {
    flight: string;
    terminal: string;
    gate: string;
    destination: string;
    departure: string;
    passengers: number;
    action: string;
}

const columns = ["flight", "terminal", "gate", "destination", "departure", "passengers", "action"];


const GateStaffDashboard = () => {
    const {user, loading} = useAuth();
    const [isConfirm, setConfirm] = useState(false);
    const [isConfirmDeparture, setConfirmDeparture] = useState(false);
    const [isConfirmChanges, setConfirmChanges] = useState(false);
    const [isOpenBoard, setOpenBoard] = useState(false);
    const [openChangeGate, setChangeGate] = useState(false);
    const [selectedRow, setSelectedRow] = useState<DataRow>();
    const [newGate, setNewGate] = useState<DataRow>();
    const [ticketNumber, setTicketNumber] = useState<string>('');
    const [flightRows, setFlightRows] = useState<Flight[]>([]);
    const [passenger, setPassenger] = React.useState<Passenger>();

    const [outcome, setOutcome] = useState<OutcomeProps>();

    // Fetch Flight list
    const fetchFlights = () => {
        try {
            const res: Flight[] = flightService.getAll();
            const gateFlights: Flight[] = res.filter((f: Flight) => f.gate === user?.accessLevel)
            setFlightRows(gateFlights);
        } catch (e) {
            console.error("Error fetching staff rows:", e);
        }
    };

    // Initial fetch
    useEffect(() => fetchFlights(), []);

    /// Confirm Departure Implementation
    const onConfirmDeparture = (success: boolean) => {
        if (success) {

            console.log('Confirm Departure successful', success);
        }
    }

    const handleBoarding = (proceed: boolean) => {

        if (isConfirm) {
            try {
                const passenger = passengerService.board(ticketNumber);
                if (!passenger) {
                    setConfirm(false);
                    setPassenger(undefined);

                    return setOutcomeHelper('error', "Passenger not found or not checked-in", setOutcome);
                }

                setOutcomeHelper('success', "Passenger onboard", setOutcome);
                setPassenger(passenger);

                setConfirm(false);
            } catch (err) {
                setOutcomeHelper('error', err instanceof Error ? err.message : "Passenger must be checked in", setOutcome);
                setConfirm(false);
                setPassenger(undefined);
            }
        }
    }

    const handleGateChanges = (choice: boolean) => {
        console.log('Steve-Change Gate from:', choice, newGate?.terminal, newGate?.newGate);

        if (isConfirm && newGate?.terminal && user) {
            console.log('updating-flight gate');

            try {
                const flight = flightService.changeGate(
                    newGate.flight as string,
                    {
                        gate: newGate.gate as string,
                        terminal: newGate.terminal as string,
                    }
                );

                if (!flight) {
                    setConfirmChanges(false);
                    setPassenger(undefined);

                    return setOutcomeHelper('error', "Flight not found", setOutcome);
                }

                setOutcomeHelper('success', "Flight gate and terminal changed successfully", setOutcome);
                // setPassenger(flight);

                // Inform Ground Staff via MessageBoard
                messageBoardService.post({
                    role: RoleEnum.GROUND as UserRole,
                    msg: {
                        message: "Gate Change Notice:\n" +
                            `Flight ${selectedRow?.flight} moved from ${selectedRow?.terminal + '-' + selectedRow?.gate} to ${newGate?.terminal + '-' + newGate?.newGate}.` +
                            "All future bags must be routed to the new gate.\n",
                        to: RoleEnum.GROUND as UserRole,
                        fromRole: user?.role,
                        airline: user?.airline,
                    } as MessageBoard
                })

                setConfirmChanges(false);
            } catch (err) {
                setOutcomeHelper('error', err instanceof Error ? err.message : "Flight not found", setOutcome);
                setConfirmChanges(false);
                setPassenger(undefined);
            }
        }
    }

    if (loading) return <FullScreenLoader/>

    return (
        <RoleGuard allowedRoles={[RoleEnum.GATE]}>
            <PageTitleUpdater/>

            <UITable<GateFlightRow>
                title='Gate Staff Dashboard'
                name={user?.lastName + (user?.accessLevel ? ' at GATE: ' + user.accessLevel : '')}
                columns={columns}
                topAlignment='justify'
                rows={(Array.isArray(flightRows) ? flightRows : []).map((f: Flight) => (
                    {
                        flight: f.flightNumber,
                        gate: f.gate,
                        terminal: f.terminal,
                        destination: toTitleCase(f.destination),
                        departure: formatTime(f.departureTime),
                        passengers: f.tickets.length ?? 0,
                        action: "Change Gate"
                    }
                )) as GateFlightRow[]}
                topButton={
                    flightRows.length > 0 ? (
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
                                        onClick={() => {
                                            setOpenBoard(true);
                                            setOutcome(undefined);
                                        }}
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
                                        onClick={() => {
                                            setConfirmDeparture(true);
                                            setOutcome(undefined);
                                        }}
                                    >
                                        Confirm Departure
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Quick Actions */}
                            <Typography variant="h6" component="h4" fontWeight='normal' gutterBottom>
                                [ Flights at Gate <b>{user?.accessLevel}</b> ]
                            </Typography>
                        </Container>
                    ) : null
                }
                onActionCallback={(row: GateFlightRow) => {
                    console.log('Set Change Gate', row.flight);
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
                outcome={outcome}
                setOutcome={setOutcome}
                passenger={passenger}
                onBoard={(row) => {
                    setConfirm(true);
                    setTicketNumber(row);
                }}
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
                onRemove={handleBoarding}
            />)}


            {/*Change Passenger Gate Info Dialog*/}
            {openChangeGate && (<ChangeGateDialog
                open={openChangeGate}
                oldFlight={selectedRow?.flight as string}
                oldGate={selectedRow?.terminal + '-' + selectedRow?.gate}
                oldDestination={selectedRow?.destination as string}
                outcome={outcome}
                setOutcome={setOutcome}
                onClose={() => setChangeGate(false)}
                onChangeGate={(row) => {
                    setConfirmChanges(true);
                    setNewGate(row);
                }}
            />)}

            {/*Confirm Change Gate & Terminal Dialog*/}
            {isConfirmChanges && (<ConfirmEntityDialog
                open={isConfirmChanges}
                onClose={() => setConfirmChanges(false)}
                title="Confirm Gate Changes"
                dataId={selectedRow?.flight as string}
                message={
                    <>
                        Are you sure you want to change the gate for Flight<b>{selectedRow?.flight}</b> from:
                        <b style={{color: 'red'}}>{selectedRow?.terminal}-{selectedRow?.gate}</b>
                        to <b style={{color: 'green'}}>{newGate?.terminal}-{newGate?.newGate}</b>
                    </>
                }
                onRemove={handleGateChanges}
            />)}
            {/*</Box>*/}
        </RoleGuard>
    )
}

export default GateStaffDashboard
