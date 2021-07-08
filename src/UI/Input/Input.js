import React from 'react'
import classes from './Input.module.css'

const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && touched && shouldValidate
}

const Input = props => {
    const cls = [classes.Input]
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputType}
                   id={htmlFor}
                   value={props.value}
                   onChange={props.onChange} />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Please enter a valid values'}</span>
                    : null
            }
            
        </div>
    )
}

export default Input