import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

class Auth extends Component {

    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: '',
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
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLengrh: 6
                }
            }
        }
    }

    renderInputs = () => {
        const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input type={control.type}
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

    inputChangeHandler = (e, controlName) => {
        console.log(e.target.value, ' === ', controlName)
    }

    loginHandler = () => {

    }

    registerHandler = () => {
        
    }

    submitHandler = () => {
        
    }

    render() {
        return (

            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form class={classes.AuthForm} onSubmit={this.submitHandler}>

                        { this.renderInputs()}
                        {/*<Input type="password"
                               label="Password"
                               errorMessage="Test" />
                         <input type="text" />
                        <input type="text" /> */}
                        <Button type="success"
                                onClick={this.loginHandler}>
                            Log in
                        </Button>
                        <Button type="primary"
                                onClick={this.registerHandler}>
                            Registration
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth