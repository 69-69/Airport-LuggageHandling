
import FlightTable from "@/app/dashboard/admin/flight/flightTable";

const FiveByFiveTable = async ({params}: { params: Promise<{ flightId: string }> }) => {
    const {flightId} = await params;
    console.log(flightId);


    return (
        <FlightTable flightId={flightId}/>
    );
}
export default FiveByFiveTable;
