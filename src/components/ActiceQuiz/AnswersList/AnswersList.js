import React from 'react'
import AnswersListClasses from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
    return (
        <ul className={AnswersListClasses['AnswersList']}>
            {props.answers.map( (answer, index) => {
                return <AnswerItem key={index}
                                   answer={answer}
                                   answerState={props.answerState ? props.answerState[answer.id] : null}
                                   onAnswerClickHandler={props.onAnswerClickHandler} />
            })}
        </ul>
    )
}

export default AnswersList