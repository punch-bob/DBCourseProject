import React, { useState } from 'react';
import classes from './Input.module.css'
import Icon from "react-icons-kit";
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'


const Input = (props) => {
    const isPasswordInput = props.type === 'password'

    const [icon, setIcon] = useState(eyeOff)
    const [type, setType] = useState(props.type)

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye)
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    return (
        <div className={classes.inputWrapper}>
            <input className={classes.input} {...props} type={type}/>
            {isPasswordInput
                ? <span onClick={handleToggle} className={classes.passwordBtn}><Icon icon={icon}/></span>
                : <></>
            }
        </div>
    );
};

export default Input;