import { useEffect, useState } from "react"
import { Flight } from "./FlightCard/FlightCard";
import { mockFlights } from "../Mockfile/MockFlights";
import { InputEvent } from "./Options/OptionsWrapper/OptionsWrapper";

export type FlightsList = Flight[];
export const allFlights = mockFlights.result.flights;

type Callback<T extends any[]> = (...args: T) => void;

function debounce<T extends any[]> (callback: Callback<T>, delay: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: T) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  };

export const useFlightsList = () => {
    const [flights] = useState<FlightsList>(allFlights);
    const [visibleCount, setVisibleCount] = useState<number>(2);
    const [filteredFlights, setFilteredFlights] = useState<FlightsList>(flights);
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [showLayovers, setShowLayovers] = useState<boolean>(false);
    const [showDirectFlights, setShowDirectFlights] = useState<boolean>(false);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

    const airlines = Array.from(new Set(flights.map(flight => flight.flight.carrier.caption)));
    
    const getMinPrices = (flights: FlightsList) => { 
        const minPrices: Record<string, number> = {};

        flights.forEach(flight => { 
            const airline = flight.flight.carrier.caption;
            const price = Number(flight.flight.price.total.amount);

            if(!minPrices[airline]) { 
                minPrices[airline] = price;
            } else { 
                minPrices[airline] = Math.min(minPrices[airline], price)
            }
        });
        return minPrices;
    }

    const minPrices = getMinPrices(flights);
  
    const handleShowMoreFlights = () => { 
        setVisibleCount(prevCount => prevCount + 4);
    }
 
    const handleSorting: InputEvent = (event) => { 

        let sortedFlights: FlightsList = [...filteredFlights].sort((a, b) => { 
            const aPrice = a.flight.price.total.amount;
            const bPrice = b.flight.price.total.amount;
            const aDuration = a.flight.legs[0].duration + a.flight.legs[1].duration;
            const bDuration =  b.flight.legs[0].duration + b.flight.legs[1].duration;

            switch (event.target.id) { 
                case 'priceUp': 
                    return aPrice - bPrice;
                case 'priceDown': 
                    return bPrice - aPrice;
                case 'duration': 
                    return aDuration - bDuration;
            }
            return aPrice - bPrice;
        }) 
        setFilteredFlights(sortedFlights);
    }

    const handleMinPriceChange: InputEvent = (event) => { 
        const value = event.target.value;
        setMinPrice(value);
        debouncedHandlePriceFiltration(value, maxPrice);
    }

    const handleMaxPriceChange: InputEvent = (event) => { 
        const value = event.target.value;
        setMaxPrice(value);
        debouncedHandlePriceFiltration(minPrice, value);
    }

    const handleLayoverChange: InputEvent = (event) => { 
        setShowLayovers(event.target.checked);
        handleFiltration(event.target.checked, showDirectFlights);
    }

    const handleDirectChange: InputEvent = (event) => { 
        setShowDirectFlights(event.target.checked);
        handleFiltration(showLayovers, event.target.checked);
    }

    const handleFiltration = (layovers: boolean, directFlights: boolean) => { 
        let filtered = flights;

        if(layovers && directFlights) { 
            filtered = flights;
        } else if(layovers) { 
            filtered = filtered.filter(flight => flight.flight.legs[0].segments.length > 1 || flight.flight.legs[1].segments.length > 1)
        } else if(directFlights) { 
            filtered = filtered.filter(flight => flight.flight.legs[0].segments.length === 1 && flight.flight.legs[1].segments.length === 1)
        }
        setFilteredFlights(filtered);
    }   

    const handlePriceFiltration = (min: string, max: string) => { 
        let filtered = flights;

        if(min) { 
            filtered = filtered.filter(flight => Number(flight.flight.price.total.amount) >= Number(min));
        }

        if(max) { 
            filtered = filtered.filter(flight => Number(flight.flight.price.total.amount) <= Number(max))
        }
        setFilteredFlights(filtered);
    }

    const debouncedHandlePriceFiltration = debounce(handlePriceFiltration, 1000);

    const handleAirlineCheckboxChange = (airlineCaption: string) => {

        setSelectedAirlines(prevSelected => {
            if(prevSelected.includes(airlineCaption)) { 
                return prevSelected.filter(caption => caption !== airlineCaption)
            } else { 
                return [...prevSelected, airlineCaption];
            }
        });
    };

    const handleAirlineFiltration = () => { 
        let filtered =  selectedAirlines.length > 0 ? 
        flights.filter(flight => selectedAirlines.includes(flight.flight.carrier.caption)) : flights;

        setFilteredFlights(filtered);
    }

    useEffect(handleAirlineFiltration, [flights, selectedAirlines])

    return { 
        filteredFlights, 
        visibleCount,
        handleShowMoreFlights,
        handleSorting,
        handleMinPriceChange,
        handleMaxPriceChange,
        debouncedHandlePriceFiltration,
        handleFiltration,
        handleLayoverChange,
        handleDirectChange,
        showLayovers,
        showDirectFlights,
        selectedAirlines,
        airlines,
        handleAirlineCheckboxChange,
        minPrices,
    }
}

