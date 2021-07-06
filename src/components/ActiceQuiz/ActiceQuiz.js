import React from 'react'
import ActiceQuizStyles from './ActiceQuiz.module.css'

const ActiceQuiz = () => {
    return (
        <div className={ActiceQuizStyles['ActiceQuiz']}>
            <p>
                <span>
                    <strong>1. </strong>
                    How are you?
                </span>
            </p>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </div>
    )
}

export default ActiceQuiz