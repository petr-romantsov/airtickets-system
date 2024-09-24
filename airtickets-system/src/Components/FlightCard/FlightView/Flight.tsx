import { FC } from "react"
import './Flight.css'


const getTime = (stringDate: string): string => {
    const date: Date = new Date(stringDate);
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();

    if(hours < 10) hours = `0${hours}`;

    if(minutes < 10) minutes = `0${minutes}`

    return `${hours}:${minutes}`
}

const getFormattedDate = (stringDate: string): string => { 
    const date = new Date(stringDate);
    const dayNumber = date.getDate();
    const month = date.getMonth();
    
    const monthDictionary = new Map([
        [0, 'янв'],
        [1, 'фев'], 
        [2, 'мар'],
        [3, 'апр'],
        [4, 'май'],
        [5, 'июн'],
        [6, 'июл'],
        [7, 'авг'],
        [8, 'сен'],
        [9, 'окт'],
        [10, 'нояб'],
        [11, 'дек'],
    ]);

    const weekdaysDictionary = new Map([
        [0, 'вс'],
        [1, 'пн'],
        [2, 'вт'],
        [3, 'ср'],
        [4, 'чт'],
        [5, 'пт'],
        [6, 'сб'],
    ]);

    const formattedMonth = monthDictionary.get(month);
    const weekDay = weekdaysDictionary.get(date.getDay());

    return `${dayNumber} ${formattedMonth}.${weekDay}`;
}

const getFlightDuration = (duration: number): string => { 
    const hours = Math.trunc(duration / 60);
    const minutes = duration - (hours * 60);

    return `${hours} ч ${minutes} мин`
}

export type Direction = Record<string, any>

interface FlightViewProps { 
    direction: Direction
}

export const FlightView: FC<FlightViewProps> = ({ direction }) => {

    const flightData = { 
        departureCity: direction.segments[0].departureCity.caption,
        departureAirport: {
            uid: direction.segments[0].departureAirport.uid,
            caption: direction.segments[0].departureAirport.caption,
        },
        arrivalCity: direction.segments.length > 1 ? direction.segments[1].arrivalCity.caption : direction.segments[0].arrivalCity.caption,
        arrivalAirport: { 
            uid: direction.segments.length > 1 ? direction.segments[1].arrivalAirport.uid : direction.segments[0].arrivalAirport.uid,
            caption: direction.segments.length > 1 ? direction.segments[1].arrivalAirport.caption : direction.segments[0].arrivalAirport.caption,
        },
        departureDate: direction.segments[0].departureDate,
        arrivalDate:  direction.segments.length > 1 ? direction.segments[1].arrivalDate : direction.segments[0].arrivalDate,
        flightDuration: direction.duration, 
        airCompany: direction.segments[0].airline.caption,
        operatingAirline: direction.segments.length > 1 ? direction.segments[1].operatingAirline : direction.segments[0].operatingAirline ,
    }

    const ShowOperatingCompany = () => { 
        if(flightData.operatingAirline) { 
            return <p className="flight__operating-company">Рейс выполняет: {flightData.operatingAirline.caption}</p>
        } else { 
            return <p className="flight__operating-company">Рейс выполняет: {flightData.airCompany}</p>
        }
    }

    const Connection = () => { 
        switch(direction.segments.length) { 
            case 2: 
                return <span className="flight__connection">1 пересадка</span>;
            case 3: 
                return <span className="flight__connection">2 пересадки</span>;
            case 4: 
                return <span className="flight__connection">3 пересадки</span>;
            default: 
                return <span className="flight__connection">Прямой</span>
        }
    }

    return (
        <div className="flight">
            <div className="flight__cities">
                <span className="flight__dep-city">
                    {`${flightData.departureCity}, ${flightData.departureAirport.caption}`}
                    <span className="flight__uid">{` (${flightData.departureAirport.uid})`}</span>
                </span>
                {`${flightData.arrivalCity}, ${flightData.arrivalAirport.caption}`}
                <span className="flight__uid">{` (${flightData.arrivalAirport.uid})`}</span>
            </div>
            <div className="flight__time-wrapper">
                <span className="flight__departure-time">
                    <span className="flight__time flight__time--departure">{getTime(flightData.departureDate)}</span>
                    <span className="flight__date">{getFormattedDate(flightData.departureDate)}</span>
                </span>
                <span className="flight__duration">
                        {getFlightDuration(flightData.flightDuration)}
                </span>
                <span className="flight__arrival-time">
                    <span className="flight__date flight__date--arrival">{getFormattedDate(flightData.arrivalDate)}</span>
                    <span className="flight__time">{getTime(flightData.arrivalDate)}</span>
                </span>
            </div>
            <div className="flight__connection-wrapper">
                <Connection /> 
            </div>
            <ShowOperatingCompany />  
        </div>
    )
}