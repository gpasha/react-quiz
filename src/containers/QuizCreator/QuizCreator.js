import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../UI/Button/Button'

class QuizCreator extends Component {

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
                        <input />
                        <hr />
                        <input />
                        <input />
                        <input />
                        <input />
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