import React, { Component } from 'react'
import LayoutStyles from '../Layout/Layout.module.css'

class Layout extends Component {
    render() {
        return (
            <div className={LayoutStyles['layout']}>
                
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout