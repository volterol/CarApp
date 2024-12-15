import React from "react";

const Rank = ({ num, isNumLoaded }) => {
    return (
        <div className="text-center mt-8">
            {isNumLoaded ? (
                num.length === 0 ? (
                    <p className="text-xl">Loading...</p>
                ) : (
                    <div>
                        <p className="text-2xl font-bold mb-4">Detected Number Plates:</p>
                        <ul className="list-none">
                            {num.map((plate, index) => (
                                <li key={index} className="text-xl mb-2">Plate {index + 1}: {plate}</li>
                            ))}
                        </ul>
                    </div>
                )
            ) : (
                <p className="text-xl">No plates detected.</p>
            )}
        </div>
    );
}

export default Rank;
