import React, { Component } from 'react'
import quizClasses from './Quiz.module.css'
import ActiceQuiz from '../../components/ActiceQuiz/ActiceQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        isFinishedQuiz: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' or 'error' }
        quiz: [
            {
                question: 'What color is cloud?',
                id: 1,
                wrightAnswerId: 3,
                answers: [
                    {text: 'Red', id: 1},
                    {text: 'Green', id: 2},
                    {text: 'Blue', id: 3},
                    {text: 'Yellow', id: 4}
                ]
            },
            {
                question: 'What year was founded the ST city?',
                id: 2,
                wrightAnswerId: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1703', id: 2},
                    {text: '1800', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (id) => {        
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        if (question.wrightAnswerId === id) {
            this.setState({
                answerState: {[id]: 'success'}
            })
            if (this.isQuizFinished()) {
                const timeout = window.setTimeout(() => {
                    this.setState({
                        isFinishedQuiz: true
                    })
                    window.clearTimeout(timeout)
                }, 1000)
            }
            else {
                const timeout = window.setTimeout(() => {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                    window.clearTimeout(timeout)
                }, 1000)
            }
        }
        else {
            this.setState({
                answerState: {[id]: 'error'}
            })
        }
    }
    
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={quizClasses['Quiz']}>
                <div className={quizClasses['Quiz-wrapper']}>
                    {
                        this.state.isFinishedQuiz
                            ? <FinishedQuiz />
                            : <>
                                <h1>Answer the questions</h1>
                                <ActiceQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                            question={this.state.quiz[this.state.activeQuestion].question}
                                            onAnswerClickHandler={this.onAnswerClickHandler}
                                            activeQuestion={this.state.activeQuestion + 1}
                                            queastionsCount={this.state.quiz.length}
                                            answerState={this.state.answerState} />
                              </>
                    }
                </div>
            </div>
        )
    }
}

export default Quiz