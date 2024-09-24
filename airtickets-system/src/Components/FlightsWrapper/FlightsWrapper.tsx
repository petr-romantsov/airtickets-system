import { ComponentProps, FC } from "react";
import { FlightCard } from "../FlightCard/FlightCard"
import { FlightsList } from "../useFlightsList";
import './FlightsWrapper.css'
import { ShowMoreButton } from "./ShowMoreButton/ShowMoreButton"

interface FlightsWrapperProps { 
    flights: FlightsList;
    visibleCount: number,
    handleShowMoreFlights: ComponentProps<"button">["onClick"];
}

export const FlightsWrapper: FC<FlightsWrapperProps> = ({ flights, visibleCount, handleShowMoreFlights }) => {

    return (
        <div className="flights-wrapper">
            <ul className="flights-list">
                {flights.slice(0, visibleCount).map(flight => <li key={flight.flightToken}><FlightCard flight={flight}/></li>)}
            </ul>
            {visibleCount < flights.length && (
                <ShowMoreButton handleShowMoreFlights={handleShowMoreFlights}/>
            )}
        </div>
    )
}