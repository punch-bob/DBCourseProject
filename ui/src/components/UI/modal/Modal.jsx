import React from 'react';
import classes from './Modal.module.css';

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? `${classes.modalWrapper} ${classes.active}` : classes.modalWrapper} onClick={() => setActive(false)}>
            <div className={active ? `${classes.modalContent} ${classes.active}` : classes.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;