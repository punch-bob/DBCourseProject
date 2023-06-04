import React from 'react';
import classes from './TransparentButton.module.css'

const TransparentButton = (props) => {
    return (
        <button {...props} className={`${classes.transparentButton} ${props?.className}`}>
            {props.children}
        </button>
    );
};

export default TransparentButton;