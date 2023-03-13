import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';


const Loader = () => {
    const show = useState(true);
    return (
        <Modal size='sm' className="Modal-Loader" show={show} centered>
            <Modal.Body>
                <div className='loader'>
                    <img className="logo" alt="" src="/images/loader.gif" />
                    <div className='loader_text'>
                        <h3>Loading...</h3>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Loader