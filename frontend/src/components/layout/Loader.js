import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal';


const Loader = () => {
    const [show, setShow] = useState(true);
    return (
        <Modal show={show} centered>
            <Modal.Body>
                <div className='loader'>
                    <div>
                        <img className="logo_back" alt="" src="/images/logo_back.png" />
                        <img className="logo_front" alt="" src="/images/logo_front.png" />
                    </div>
                    <h3>Loading...</h3>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Loader