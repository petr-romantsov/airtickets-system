import { FC } from "react";
import { InputEvent } from "../OptionsWrapper/OptionsWrapper"
import "./Filtration.css"

interface FiltrationProps { 
    handleLayoversChange: InputEvent,
    handleDirectChange: InputEvent,
    showLayovers: boolean,
    showDirectFlights: boolean,
}

export const Filtration: FC<FiltrationProps> = ({ handleDirectChange, handleLayoversChange, showLayovers, showDirectFlights }) => {
    return (
        <div className="filtration">
            <h3 className="filtration__title">Фильтровать</h3>
            <label className="filtration__label">
                <input type="checkbox" checked={showLayovers} onChange={handleLayoversChange}/>
                <span>- 1 пересадка</span>
            </label>
            <label className="filtration__label">
                <input type="checkbox" checked={showDirectFlights} onChange={handleDirectChange}/>
                <span>- без пересадок</span>
            </label>
        </div>
    )
}