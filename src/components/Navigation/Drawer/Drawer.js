import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.css'
import Backdrop from '../../../UI/Backdrop/Backdrop'
class Drawer extends Component {
    
    renderLinks(links) {
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

        let links = [
            {path: '/', label: 'List', exact: true}
        ]

        if (this.props.isAutentificated) {
            links = [
                        ...links,
                        {path: '/quiz-creator', label: 'Quiz Creator', exact: false},
                        {path: '/logout', label: 'Logout', exact: false}
                    ]
        }
        else {
            links = [
                        ...links,
                        {path: '/auth', label: 'Authorization', exact: false}
                    ]
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
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