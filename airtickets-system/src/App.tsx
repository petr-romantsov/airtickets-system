import { FlightsWrapper } from './Components/FlightsWrapper/FlightsWrapper';
import { OptionsWrapper } from './Components/Options/OptionsWrapper/OptionsWrapper';
import { useFlightsList } from './Components/useFlightsList';
import './App.css';

function App() {

  const { 
    filteredFlights, 
    visibleCount,
    handleShowMoreFlights,
    handleSorting, 
    handleMinPriceChange, 
    handleMaxPriceChange, 
    handleLayoverChange,
    handleDirectChange,
    showLayovers,
    showDirectFlights,
    selectedAirlines,
    airlines,
    handleAirlineCheckboxChange,
    minPrices
  } = useFlightsList();

  return (
    <div className="App">
      <OptionsWrapper 
        flights={filteredFlights} 
        handleSorting={handleSorting}
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
        handleLayoverChange={handleLayoverChange}
        handleDirectChange={handleDirectChange}
        showLayovers={showLayovers}
        showDirectFlights={showDirectFlights}
        airlines={airlines}
        selectedAirlines={selectedAirlines}
        handleAirlineCheckboxChange={handleAirlineCheckboxChange}
        minPrices={minPrices}
        />
      <FlightsWrapper 
      flights={filteredFlights}
      visibleCount={visibleCount}
      handleShowMoreFlights={handleShowMoreFlights}  
      />
    </div>
  );
}

export default App;
