import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../../UI/Button/Button'

const FinishedQuiz = props => {
    console.log('FinishedQuiz props: ', props)
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') total++
        return total
    }, 0)
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fas',
                            props.results[quizItem.id] === 'error'
                                ? `fa-check ${classes.error}`
                                : `fa-times ${classes.success}`
                        ]
                        return (
                            <li key={index}>
                                <strong>{index + 1}. </strong>
                                {quizItem.question}
                                <i className={cls.join(' ')}></i>
                            </li>
                        )
                    })
                }
            </ul>
            <p>Rigth {successCount} from {props.quiz.length}</p>
            <div>
                <Button onClick={props.refreshHandler} type="primary">Repeat</Button>
                <Button type="success">Go the test list</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz

