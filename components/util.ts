import React from "react";

const clearErrorAndSet =
    (
        setter: (v: string) => void,
        setError: React.Dispatch<React.SetStateAction<string | null>>
    ) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            setError(null);
        };

const clearErrorAndSetString =
    (
        setter: (v: string) => void,
        setError: React.Dispatch<React.SetStateAction<string | null>>
    ) =>
        (value: string) => {
            setter(value);
            setError(null);
        };

const toCamelCase = (str: string) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+(.)/g, (_, c) => c.toUpperCase());

const isNumeric = (value: unknown): boolean => {
    if (typeof value === 'number') {
        return !Number.isNaN(value);
    }

    if (typeof value === 'string') {
        return value.trim() !== '' && !Number.isNaN(Number(value));
    }

    return false;
};

const manualAirlines: string[] = [
    "AC - Air Canada",
    "AF - Air France",
    "NH - All Nippon Airways",
    "AA - American Airlines",
    "AZ - ITA Airways",
    "BA - British Airways",
    "CX - Cathay Pacific",
    "DL - Delta Air Lines",
    "EK - Emirates",
    "IB - Iberia",
    "JL - Japan Airlines",
    "KL - KLM Royal Dutch Airlines",
    "LH - Lufthansa",
    "QR - Qatar Airways",
    "QF - Qantas",
    "SA - South African Airways",
    "SQ - Singapore Airlines",
    "SW - Southwest Airlines",
    "TK - Turkish Airlines",
    "UA - United Airlines"
];


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

// generate Gates: G1, G2, etc
const manualGates: string[] = Array.from({length: 100}, (_, i) => `G${i+1}`);


// generate Gates: T1, T2, etc
const manualTerminals: string[] = Array.from({length: 100}, (_, i) => `T${i+1}`);

// generate Counters: C1, C2, etc
const manualCounters: string[] = Array.from({length: 100}, (_, i) => `C${i+1}`);

const statuses: string[] = ["Not-Check-in", "Checked-in", "Boarded"];
const bagLocations: string[] = [
    "Check-in counter", // (Terminal and counter number)
    "Gate", // (Terminal and gate number)
    "Loaded" // (Airlines abbreviation - 2 letters and 4-digit flight number)
];

const numberOfBags: string[] = Array.from({length: 100}, (_, i) => i.toString());

export {
    toCamelCase,
    isNumeric,
    clearErrorAndSet,
    clearErrorAndSetString,
    emailRegex,
    passwordRegex,
    numberOfBags,
    manualCounters,
    manualAirlines,
    manualGates,
    manualTerminals,
    statuses,
    bagLocations
};
