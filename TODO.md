# @TODO
- Gate Staffs
- Ground Staffs
> Demo Passenger => ticket: 5643524656 ID: 343567
> Demo Passenger => ticket: 1323487977 ID: 865435
>
>   Role: GATE STAFF
Airline: AA - AMERICAN AIRLINES
Username: dt82
Password: pGZdP0
>
>  Role: AIRLINE STAFF
Airline: AA - AMERICAN AIRLINES
Username: gw14
Password: Qkg1Am
> 
all_bags: ```[
{
"bagId": "737831",
"weight": 123,
"ticketNumber": "6543234423",
"location": "CHECKIN_COUNTER"
},
{
"bagId": "619013",
"weight": 100,
"ticketNumber": "6543234423",
"location": "CHECKIN_COUNTER"
}]
```

all_passengers:
````
[{
"role": "PASSENGER",
"firstName": "steve",
"lastName": "toni",
"idNumber": "223456",
"ticketNumber": "6543234423",
"flightNumber": "AC1234",
"status": "CHECKED_IN"
},
{
"role": "PASSENGER",
"firstName": "dani",
"lastName": "texson",
"idNumber": "567496",
"ticketNumber": "7876564668",
"flightNumber": "GA4321",
"status": "NOT_CHECKED_IN"
}]
````

all_flights: 
```
[
    {
        "gate": "G1",
        "terminal": "T1",
        "airlineName": "AC - Air Canada",
        "destination": "london bridge",
        "flightId": "1234",
        "flightNumber": "AC1234",
        "tickets": [
            "6543234423"
        ]
    },
    {
        "gate": "G2",
        "terminal": "T2",
        "airlineName": "GA - Ghana Airways",
        "destination": "texas",
        "flightId": "4321",
        "flightNumber": "GA4321",
        "tickets": [
            "7876564668"
        ]
    }
]
```

message:
``` messages_board_AIRLINE:
[
    {
        "id": "1771005958",
        "message": "Airline for ChatGPT can help with book ideas, poems, or trip planning",
        "to": "AIRLINE",
        "fromRole": "ADMIN",
        "airline": "AC - Air Canada",
        "isRead": false,
        "timestamp": "2026-02-13T18:05:58.547Z"
    },
    {
        "id": "1771007116",
        "message": "thank you admin for the info",
        "to": "AIRLINE",
        "fromRole": "AIRLINE",
        "airline": "AC - Air Canada",
        "isRead": false,
        "timestamp": "2026-02-13T18:25:16.920Z"
    }
]```


```
messages_board_GATE:
[
    {
        "id": "1771005982",
        "message": "Gate a sibling model to InstructGPT, which is trained to follow an instruction ",
        "to": "GATE",
        "fromRole": "ADMIN",
        "airline": "GA - Ghana Airways",
        "isRead": false,
        "timestamp": "2026-02-13T18:06:22.828Z"
    },
    {
        "id": "1771007600",
        "message": "thus ok to hear from you admin. am from Ghana Airways Incoporated",
        "to": "GATE",
        "fromRole": "GATE",
        "airline": "GA - Ghana Airways",
        "isRead": false,
        "timestamp": "2026-02-13T18:33:20.435Z"
    }
]
```