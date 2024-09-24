import { FC } from "react";
import "./FlightHeader.css"

interface FlightHeaderProps { 
    airCompany: string;
    price: number;
}

export const FlightHeader: FC<FlightHeaderProps> = ({ airCompany, price }) => { 
    return (
        <div className="flight-card__header">
            <div>
                {airCompany}
            </div>
            <div className="flight-card__price-wrapper">
                <div className="flight-card__price">
                    {price}	&#8381;
                </div>
                <p className="flight-card__price-text">Стоимость для одного взрослого пассажира</p>
            </div>
        </div>
    )
}