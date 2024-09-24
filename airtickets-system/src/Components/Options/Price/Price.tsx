import { FC } from "react";
import { InputEvent } from "../OptionsWrapper/OptionsWrapper"
import "./Price.css"

interface PriceFilterProps {
    handleMinPriceChange: InputEvent;
    handleMaxPriceChange: InputEvent;
}

export const PriceFilter: FC<PriceFilterProps> = ({ handleMinPriceChange , handleMaxPriceChange }) => {
    return (
        <div className="price-filter">
            <h3 className="price-filter__title">Цена</h3>
            <label className="price-filter__label">
                <span>
                    От 
                </span>
                <input type="number" id="from" onChange={handleMinPriceChange}/>
            </label>
            <label className="price-filter__label">
                <span>
                    До 
                </span>
                <input type="number" id="to" onChange={handleMaxPriceChange}/>
            </label>
        </div>
    )
}