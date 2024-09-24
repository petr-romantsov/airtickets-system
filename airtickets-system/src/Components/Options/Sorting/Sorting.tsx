import { ComponentProps, FC } from "react"
import "./Sorting.css"


interface SortingProps { 
    // flights: FlightsList;
    handleSorting: ComponentProps<"input">["onChange"];
}

export const Sorting: FC<SortingProps> = ({ handleSorting }) => {

    return(
        <div className="sorting">
            <h3 className="sorting__title">Сортировать</h3>
            <label className="sorting__label">
                <input type="radio" name="sort" id="priceUp" onChange={handleSorting}/>
                <span> - по возрастанию цены</span>
            </label>
            <label className="sorting__label">
                <input type="radio" name="sort" id="priceDown" onChange={handleSorting}/>
                <span>- по убыванию цены</span>
            </label>
            <label className="sorting__label">
                <input type="radio" name="sort" id="duration" onChange={handleSorting}/>
                <span>- по времени в пути</span>
            </label>
        </div>
    )
}