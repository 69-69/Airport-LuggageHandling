'use client';

import * as React from 'react';
import UiDialog from "@/components/uiDialog";
import UITable from "@/components/uiTable";
import {DataRow} from "@/types/dataRow";
import {useEffect} from "react";
import {Bag, FlightSnapshot} from "@/types/models";
import {passengerService} from "@/actions/services/passengerService";
import {flightService} from "@/actions/services/flightService";
import {bagService} from "@/actions/services/bagService";

interface MyBagRow extends DataRow {
    id: string;
    weight: string;
    ticket: string;
    location: string
}

interface MyBagDialogProps {
    open: boolean;
    onClose: () => void;
    tickets: string[];
}

const MyBagDialog = ({open, onClose, tickets}: MyBagDialogProps) => {
    const [bags, setBags] = React.useState<Bag[]>([]);

    React.useEffect(() => {
        if (tickets.length === 0) return;

        const loadedBags: Bag[] = bagService.getAllByTickets(tickets);
        if (loadedBags) setBags(loadedBags);
    }, [tickets]);

    const bagRows: MyBagRow[] = bags.map(b => ({
        id: b.bagId,
        weight: `${b.weight} kg`,
        ticket: b.ticketNumber,
        location: b.location as string,
    }));

    return (
        <UiDialog
            open={open}
            onCancel={onClose}
            title={"My Bags"}
            cancelLabel="Cancel"
            confirmLabel="none"
            content={
                <UITable<MyBagRow>
                    comp="span"
                    topAlignment="justify"
                    columns={["id", "weight", "ticket", "location"]}
                    rows={bagRows}
                />
            }
        />
    );
}

export default MyBagDialog;


