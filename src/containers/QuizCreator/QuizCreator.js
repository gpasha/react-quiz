import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../UI/Button/Button'
import { CreateControl } from '../../form/formFramework'

import Input from '../../UI/Input/Input'

function createOptionControl(number) {
    return CreateControl (
        {
            label: `Oprion ${number}`,
            id: number,
            errorMessage: 'The question could not be empty'
        },
        {
            required: true
        }
    )
}

function createFormControls() {
    return {
        question: CreateControl({
            label: 'Please enter a question',
            errorMessage: 'The question could not be empty'
        },{
            required: true
        }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}
class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    }

    changeHandler = (value, controlName) => {

    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <>
                    <Input key={index}
                                label={control.label} 
                                value={control.value} 
                                valid={control.valid} 
                                touched={control.touched}
                                errorMessage={control.errorMessage}
                                onChange={e => this.changeHandler(e.target.value, controlName)} />
                    { index === 0 ? <hr /> : null}
                </>
            )
        })
    }

    submitHandler = e => {
        e.preventDefault()
    }

    addQuestionHandler = e => {
        
    }

    createQuizHandler = e => {
        
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>QuizCreator component</h1>
                    <form onSubmit={this.submitHandler}>

                        { this.renderInputs() }

                        <select></select>
                        <Button type="primary"
                                onClick={this.addQuestionHandler}>
                            Add Question
                        </Button>
                        <Button type="success"
                                label="Add Question"
                                onClick={this.addQuestionHandler}>
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator