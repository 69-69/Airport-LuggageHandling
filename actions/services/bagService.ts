// actions/services/bagService.ts
import storageService from "@/actions/services/storageService";
import {passengerService} from "@/actions/services/passengerService";
import {Bag, Flight} from "@/types/models";
import {randomUUID} from "node:crypto";

const _KEY = "all_bags";


/*Ah! Now we’re talking about your **baggage data model**, which is designed to **track each bag’s location** through the airport. Let me break it down clearly.

---

### 1️⃣ `BagLocation` type

This is a **discriminated union** (a TypeScript pattern) that allows a bag to be in **exactly one of several states**, each with relevant info:

| Type                | Meaning                                                 | Extra fields                                                          |
| ------------------- | ------------------------------------------------------- | --------------------------------------------------------------------- |
| `"CHECKIN-COUNTER"` | Bag is at the check-in counter, not yet sent to sorting | `terminal` and `counter` tell you **which counter in which terminal** |
| `"GATE"`            | Bag has been moved to the gate for loading              | `terminal` and `gate` tell you **where it’s waiting**                 |
| `"LOADED"`          | Bag is loaded onto the airplane                         | `flightNumber` tells you **which flight it’s on**                     |

✅ This allows **type-safe operations**: the system always knows what info is available for a bag depending on its location.

---

### 2️⃣ `Bag` type

Each bag object has:

* `bagId`: Unique identifier for the bag (generated at check-in)
* `ticketNumber`: Links the bag to the **passenger ticket**
* `location`: Current **BagLocation** as defined above

Example:

```ts
const bag1: Bag = {
    bagId: 'B1234',
    ticketNumber: '1234567890',
    location: { type: 'CHECKIN-COUNTER', terminal: 'T1', counter: 'C5' }
};

const bag2: Bag = {
    bagId: 'B1235',
    ticketNumber: '1234567890',
    location: { type: 'LOADED', flightNumber: 'AA1234' }
};
```

---

### 3️⃣ How this is used in your system

1. **Check-in**

   * When a passenger checks in a bag, a `Bag` object is created:

   ```ts
   const newBag: Bag = {
       bagId: generateBagId(),
       ticketNumber: passenger.ticketNumber,
       location: { type: 'CHECKIN-COUNTER', terminal: 'T1', counter: 'C5' }
   };
   ```

2. **Tracking through the airport**

   * When the bag moves to the gate:

   ```ts
   bag.location = { type: 'GATE', terminal: 'T1', gate: 'G12' };
   ```

   * When the bag is loaded onto the plane:

   ```ts
   bag.location = { type: 'LOADED', flightNumber: passenger.flightNumber };
   ```

3. **Dashboard / Staff view**

   * Counter staff can query all bags at `type: 'CHECKIN-COUNTER'` to see what still needs processing.
   * Gate staff can query bags at `type: 'GATE'`.
   * Flight ops can query bags at `type: 'LOADED'`.

4. **Integration with “American Airlines Counter” table**

   * Instead of showing individual bag locations, you can **aggregate counts per flight**:

```ts
const checkedInBags = bags.filter(b => b.location.type === 'CHECKIN-COUNTER' && b.location.counter === 'C5').length;
const loadedBags = bags.filter(b => b.location.type === 'LOADED' && b.location.flightNumber === 'AA1234').length;
```

* This gives the dashboard table columns like **Checked-in Bags**, **Bags Loaded**, etc.

---

### ✅ Key Benefits

* **Type-safe**: The code knows exactly what fields are available for a bag at each stage
* **Traceable**: Every bag has a `bagId` and location history
* **Aggregatable**: Easy to generate counts for dashboards (counter, gate, flight)

---

If you want, I can **draw a diagram showing a bag moving from CHECKIN → GATE → LOADED** and how it updates in the **American Airlines Counter dashboard**, which will make it super clear for Slide #21.

Do you want me to do that?
*/

export const bagService = {
    getAll(): Bag[] {
        return storageService.get(_KEY, []);
    },

    getAllByTickets(tickets: string[]): Bag[] {
        const bags = this.getAll();

        if (!bags.length) {
            return [];
        }

        return bags.filter((b: Bag) => tickets.includes(b.ticketNumber));
    },

    add(bags: Bag[]): Bag[] {
        const newBags: Bag[] = bags.map((bag) => ({
            ...bag,
            location: "CHECKIN_COUNTER",
        }));

        storageService.set(_KEY, [...this.getAll(), ...newBags]);

        return newBags;
    },

    getBagsByTicket(ticketId: string): number {
        const allBags = this.getAll(); // get all bags

        // Filter bags that match the ticket number exactly
        const matchingBags = allBags.filter(
            (bag) => bag.ticketNumber === ticketId
        );

        return matchingBags.length;
    },


    remove(ticketNumber: string) {
        storageService.set(
            _KEY,
            this.getAll().filter(u => u.ticketNumber !== ticketNumber)
        );
    },

    moveToGate(bagId: string, terminal: string, gate: string) {
        const bags: Bag[] = this.getAll();
        const bag = bags.find(b => b.bagId === bagId);

        if (!bag) {
            throw new Error("No bag found for bag");
        }

        bag.location = "SECURITY_CHECK";
        storageService.set(_KEY, bags);
    },

    load(bagId: string) {
        const bags = this.getAll();
        const bag = bags.find(b => b.bagId === bagId);

        if (!bag) {
            throw new Error("No bag found for bag");
        }

        const passenger = passengerService
            .getAll()
            .find(p => p.ticketNumber === bag.ticketNumber);

        if (passenger?.status !== "BOARDED") {
            throw new Error("Passenger not boarded");
        }

        bag.location = "LOADED";
        storageService.set(_KEY, bags);
    }

    /*add2(bag: Omit<Bag, "bagId" | "location">): Bag {
        const newBag: Bag = {
            bagId: randomUUID(),
            location: { type: 'CHECKIN_COUNTER', terminal: 'T1', counter: 'C5' },
            ...bag
        };

        storageService.set(_KEY, [...this.getAll(), bag]);
        return newBag;
    },*/
};
