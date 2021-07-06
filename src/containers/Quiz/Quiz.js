import React, { Component } from 'react'
import quizStyles from './Quiz.module.css'
import ActiceQuizStyles from '../../components/ActiceQuiz/ActiceQuiz'

class Quiz extends Component {
    render() {
        return (
            <div className={quizStyles['Quiz']}>
                <ActiceQuizStyles />
            </div>
        )
    }
}

export default Quiz