import { ComponentProps, FC } from 'react'
import { AirCompanies } from '../AirCompanies/AirCompanies'
import { Filtration } from '../Filtration/Filtration'
import { PriceFilter } from '../Price/Price'
import { Sorting } from '../Sorting/Sorting'
import './OptionsWrapper.css'
import { FlightsList } from '../../useFlightsList'

export type InputEvent = ComponentProps<"input">["onChange"];

interface OptionsWrapperProps { 
    flights: FlightsList;
    handleSorting: InputEvent,
    handleMinPriceChange: InputEvent,
    handleMaxPriceChange: InputEvent,
    handleLayoverChange: InputEvent,
    handleDirectChange: InputEvent,
    showLayovers: boolean,
    showDirectFlights: boolean,
    airlines: string[],
    selectedAirlines: string[],
    handleAirlineCheckboxChange: (airline: string) => void,
    minPrices: Record<string, number>
}

export const OptionsWrapper: FC<OptionsWrapperProps> = ({ 
    flights, 
    handleSorting, 
    handleMinPriceChange, 
    handleMaxPriceChange, 
    handleLayoverChange, 
    handleDirectChange, 
    showLayovers, 
    showDirectFlights,
    airlines, 
    selectedAirlines,
    handleAirlineCheckboxChange,
    minPrices,
}) => {
    return (
        <div className="options-wrapper">
            <Sorting handleSorting={handleSorting}/>

            <Filtration 
            handleDirectChange={handleDirectChange} 
            handleLayoversChange={handleLayoverChange} 
            showLayovers={showLayovers} 
            showDirectFlights={showDirectFlights}
            />

            <PriceFilter 
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}

            />
            <AirCompanies 
            airlines={airlines} 
            selectedAirlines={selectedAirlines}
            handleAirlineCheckboxChange={handleAirlineCheckboxChange}
            minPrices={minPrices}
            />
        </div>
    )
}