import React, { useState } from 'react'

const Loader = () => {
    const [show, setShow] = useState(true);
    return (
        <div className='blocker'>
            <div className='blocker_text'>
                <h3>Loading...</h3>
            </div>
        </div>
    )
}
export default Loader