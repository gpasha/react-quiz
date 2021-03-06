import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import is from 'is_js'
import { connect } from 'react-redux'
import { auth } from '../../redux/actions/auth'

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Please enter a valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Min length of password is 6 symbols',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    inputChangeHandler = (e, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid                
        })

        this.setState({
            formControls,
            isFormValid
        })
    }

    renderInputs = () => {
        const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input key={index}
                       type={control.type}
                       label={control.label}
                       value={control.value}
                       valid={control.valid} 
                       touched={control.touched}
                       shouldValidate={!!control.validation}
                       errorMessage={control.errorMessage}
                       onChange={e => this.inputChangeHandler(e, controlName)} />
            )
        })
        return inputs
    }

    loginHandler = async () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = async () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>

                        { this.renderInputs()}
                        
                        <Button type="success"
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}>
                            Log in
                        </Button>
                        <Button type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}>
                            Registration
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)