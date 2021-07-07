import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = props => {
    const cls = [
        classes.MenuToggle,
        'fas'
    ]

    props.isOpen
        ? cls.push(`fa-times ${classes.open}`)
        : cls.push('fa-bars');

    return (
        <i className={cls.join(' ')}
           onClick={props.onToggle} />
    )
}

export default MenuToggle