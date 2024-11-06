import React from "react";

const Rank = ({ num, isNumLoaded }) => {
    return (
        <div>
            {isNumLoaded ? (
                num.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <p>Detected Number Plates:</p>
                        <ul>
                            {num.map((plate, index) => (
                                <li key={index}>Plate {index + 1}: {plate}</li>
                            ))}
                        </ul>
                    </div>
                )
            ) : (
                <p>No plates detected.</p>
            )}
        </div>
    );
}

export default Rank;
