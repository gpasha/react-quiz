import React, { Component } from 'react'
import LayoutStyles from '../Layout/Layout.module.css'
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

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
                        closeMenuHandler={this.closeMenuHandler}
                        isAutentificated={this.props.isAutentificated} />
                <MenuToggle isOpen={this.state.isOpen}
                            onToggle={this.toggleMenuHandler} />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAutentificated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)