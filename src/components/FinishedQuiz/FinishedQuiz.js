import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <h1>FinishedQuiz component</h1>
            <ul>
                <li>
                    <strong>1. </strong>
                    How are you?
                    <i className={'far fa-times ' + classes.error}></i>
                </li>
                <li>
                    <strong>2. </strong>
                    How are you?
                    <i className={'far fa-check ' + classes.success}></i>
                </li>
            </ul>
            <p>Wrigth 4 from 10</p>
            <div>
                <button>Repeat</button>
            </div>
        </div>
    )
}

export default FinishedQuiz

