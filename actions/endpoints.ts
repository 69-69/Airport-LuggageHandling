'use server';


// Staff
export async function addStaff(data: any) {
    // await db.insert('staff', row);
    console.log('staff', data);
    return { success: true };
}
export async function removeStaff(staffId: string | number) {
    // server-side logic
    console.log('staff-id', staffId);
    // await db.delete('staff', staffId);
    return { success: true };
}

// Flight
export async function addFlight(data: any) {
    // await db.insert('flight', row);
    console.log('flight', data);
    return { success: true };
}
export async function removeFlight(flightId: string | number) {
    // server-side logic
    console.log('flight-id', flightId);
    // await db.delete('flight', flightId);
    return { success: true };
}

// Passenger
export async function addPassenger(data: any) {
    // await db.insert('passenger', row);
    console.log('passenger', data);
    return { success: true };
}
export async function removePassenger(passengerId: string | number) {
    // server-side logic
    console.log('passenger-id', passengerId);
    // await db.delete('passenger', passengerId);
    return { success: true };
}

export const fetchFlightData = async (flight_id: string) => {
    const res = await fetch(`/api/flights/${flight_id}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
};

export const fetchOnBoardData = async () => {
    const res = await fetch(`/api/onboard/flight`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
};
