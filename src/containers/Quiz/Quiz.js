import React, { Component } from 'react'
import quizClasses from './Quiz.module.css'
import ActiceQuiz from '../../components/ActiceQuiz/ActiceQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        results: {}, // { [id]: 'success' or error }
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
        const results = this.state.results

        if (question.wrightAnswerId === id) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[id]: 'success'},
                results
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
            results[question.id] = 'error'
            this.setState({
                answerState: {[id]: 'error'},
                results
            })
        }
    }
    
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    refreshHandler = () => {
        this.setState({
            results: {},
            isFinishedQuiz: false,
            activeQuestion: 0,
            answerState: null
        })
    }

    render() {
        return (
            <div className={quizClasses['Quiz']}>
                <div className={quizClasses['Quiz-wrapper']}>
                    {
                        this.state.isFinishedQuiz
                            ? <FinishedQuiz results={this.state.results}
                                            quiz={this.state.quiz}
                                            refreshHandler={this.refreshHandler} />
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