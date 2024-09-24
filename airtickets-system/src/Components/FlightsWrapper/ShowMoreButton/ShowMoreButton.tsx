import { ComponentProps, FC } from "react";

interface ShowMoreButtonProps { 
    handleShowMoreFlights: ComponentProps<"button">["onClick"]; 
}

export const ShowMoreButton: FC<ShowMoreButtonProps> = ({ handleShowMoreFlights }) => {
    return (
        <button 
        className="showMore-button" 
        onClick={handleShowMoreFlights}
        >
            Показать еще
        </button>
    )
}