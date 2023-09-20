import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name}, your current number of entries is...${entries}`}
            </div>
            <div className='white f1'>
                {'#1'}
            </div>
        </div>
    );
}

export default Rank;