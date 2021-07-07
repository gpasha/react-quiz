import React from 'react'
import ActiceQuizStyles from './ActiceQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiceQuiz = props => {
    return (
        <div className={ActiceQuizStyles['ActiceQuiz']}>
            <p className={ActiceQuizStyles['Questions']}>
                <span>
                    <strong>{props.activeQuestion}. </strong>
                    {props.question}
                </span>
                <small>{props.activeQuestion} from {props.queastionsCount}</small>
            </p>
            <AnswersList answers={props.answers}
                         answerState={props.answerState}
                         onAnswerClickHandler={props.onAnswerClickHandler} />
        </div>
    )
}

export default ActiceQuiz