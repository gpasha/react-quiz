import React, { Component } from 'react'
import LayoutStyles from '../Layout/Layout.module.css'
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle'

class Layout extends Component {

    state = {
        isOpen: false
    }

    toggleMenuHandler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div className={LayoutStyles['layout']}>
                
                <MenuToggle isOpen={this.state.isOpen}
                            onToggle={this.toggleMenuHandler}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout