import { FlightHeader } from "./FlightHeader/FlightHeader"
import { FlightView } from "./FlightView/Flight";
import { FC } from "react";
import "./FlightCard.css"
import { ChooseButton } from "./ChooseButton/ChooseButton";

export type Flight = Record<string, any>;

interface FlightCardProps { 
    flight: Flight;
}

export const FlightCard: FC<FlightCardProps> = ({ flight }) => {

    const flightsDirections = { 
        flightThere: flight.flight.legs[0],
        flightBack: flight.flight.legs[1],
    }

    const fligthPrice = flight.flight.price.total.amount;
    const airCompany = flight.flight.carrier.caption;
    
    return (
        <div className="flight-card">
            <FlightHeader airCompany={airCompany} price={fligthPrice}/>
            <FlightView direction={flightsDirections.flightThere}/>
            <div className="flight-card__separator"></div>
            <FlightView direction={flightsDirections.flightBack}/>
            <ChooseButton />
        </div>
    )
}