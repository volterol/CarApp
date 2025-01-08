import React from "react";

const Rank = ({ num, isNumLoaded, rejectedNums }) => {
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

                        {/* show plates that did not pass through filter if any */}
                        {rejectedNums.length > 0 && (
                            <div className="mt-4">
                                <p className="text-l font-bold mb-4">Possible Number Plates:</p>
                                <ul className="list-none">
                                    {rejectedNums.map((plate, index) => (
                                        <li key={index} className="text-m mb-2">Plate {index + 1}: {plate}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )
            ) : (
                <p className="text-xl">No plates detected.</p>
            )}
        </div>
    );
}

export default Rank;
