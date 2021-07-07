import React, { Component } from 'react'
import LayoutStyles from '../Layout/Layout.module.css'
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../components/Navigation/Drawer/Drawer'

class Layout extends Component {

    state = {
        isOpen: false
    }

    toggleMenuHandler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

   closeMenuHandler = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <div className={LayoutStyles['layout']}>
                <Drawer isOpen={this.state.isOpen}
                        closeMenuHandler={this.closeMenuHandler} />
                <MenuToggle isOpen={this.state.isOpen}
                            onToggle={this.toggleMenuHandler} />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout