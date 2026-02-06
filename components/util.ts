import React from "react";

const clearErrorAndSet =
    (setter: (v: string) => void, setError: React.Dispatch<React.SetStateAction<string | null>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

// generate Gates: G1, G2, etc
const manualGates: string[] = Array.from({length: 100}, (_, i) => `G${i}`);

// generate Gates: T1, T2, etc
const manualTerminals: string[] = Array.from({length: 100}, (_, i) => `G${i}`);

const numberOfBags: string[] = Array.from({length: 100}, (_, i) => i.toString());

export {toCamelCase, isNumeric, clearErrorAndSet, emailRegex, passwordRegex, numberOfBags, manualGates, manualTerminals};
