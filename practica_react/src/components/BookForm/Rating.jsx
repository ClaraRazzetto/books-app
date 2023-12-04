import { useState } from "react";

export default function Rating ({value, onChange, className }) {
    const [ rating, setRating ] = useState(value || 0);
    return (
        <div className={'defaultClassName ' + className}>
            { [1, 2, 3, 4, 5 ].map((item) => (
                <button key={item} onClick={(e) => {
                    e.preventDefault();
                    setRating(item);
                    if (onChange) onChange(item);
                }}>
                    { item }
                </button>
            ))}
            <div> Estrellas: { rating } </div>
        </div>
    )
}