import { FC } from "react";
import "./AirCompanies.css"

interface AirCompaniesProps { 
    airlines: string[];
    minPrices: Record<string, number>;
    selectedAirlines: string[];
    handleAirlineCheckboxChange: (airline: string) => void;
}

export const AirCompanies: FC<AirCompaniesProps> = ({ airlines, minPrices, selectedAirlines, handleAirlineCheckboxChange }) => { 
    return (
        <div className="aircompanies">
            <h3 className="aircompanies__title">Авиакомпании</h3>

            {airlines.map(airline => (
                <label className="aircompanies__label" key={airline}>
                    <input 
                    type="checkbox"
                    checked={selectedAirlines.includes(airline)} 
                    onChange={() => handleAirlineCheckboxChange(airline)}
                    />
                    <span className="aircompanies__airline">
                    {`- ${airline}`} 
                    </span>
                    <span>
                    {` от ${minPrices[airline]} руб.`}
                    </span>
                </label>
            ))}

        </div>
    )
}