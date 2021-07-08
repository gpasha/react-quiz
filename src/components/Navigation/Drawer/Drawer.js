import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.css'
import Backdrop from '../../../UI/Backdrop/Backdrop'

const links = [
    {path: '/', label: 'List', exact: true},
    {path: '/auth', label: 'Authorization', exact: false},    
    {path: '/quiz-creator', label: 'Quiz Creator', exact: false}
]

class Drawer extends Component {
    
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink to={link.path}
                            exact={link.exact}
                            activeClassName={classes.active}
                            onClick={this.props.closeMenuHandler}>
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {        
        const cls = [
            classes.Drawer
        ]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen
                    ? <Backdrop isOpen={this.props.isOpen}
                                onCloseMenu={this.props.closeMenuHandler} />
                    : null
                }
            </>
        )
    }
}

export default Drawer