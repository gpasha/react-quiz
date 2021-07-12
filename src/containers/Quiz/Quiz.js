import React, { Component } from 'react'
import quizClasses from './Quiz.module.css'
import ActiceQuiz from '../../components/ActiceQuiz/ActiceQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById } from '../../redux/actions/quiz'

class Quiz extends Component {
    
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    onAnswerClickHandler = (id) => {        
        if (this.props.answerprops) {
            const key = Object.keys(this.props.answerprops)[0]
            if (this.props.answerprops[key] === 'success') {
                return
            }
        }

        const question = this.props.quiz[this.props.activeQuestion]
        const results = this.props.results

        if (question.rightAnsweredId === id) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerprops: {[id]: 'success'},
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
                        activeQuestion: this.props.activeQuestion + 1,
                        answerprops: null
                    })
                    window.clearTimeout(timeout)
                }, 1000)
            }
        }
        else {
            results[question.id] = 'error'
            this.setState({
                answerprops: {[id]: 'error'},
                results
            })
        }
    }
    
    isQuizFinished() {
        return this.props.activeQuestion + 1 === this.props.quiz.length
    }

    refreshHandler = () => {
        this.setState({
            results: {},
            isFinishedQuiz: false,
            activeQuestion: 0,
            answerprops: null
        })
    }

    render() {

        return (
            <div className={quizClasses['Quiz']}>
                <div className={quizClasses['Quiz-wrapper']}>
                    {
                        this.props.isLoading || !this.props.quiz
                            ?   <Loader />
                            :   this.props.isFinishedQuiz
                                    ? <FinishedQuiz results={this.props.results}
                                                    quiz={this.props.quiz}
                                                    refreshHandler={this.refreshHandler} />
                                    : <>
                                        <h1>Answer the questions</h1>
                                        <ActiceQuiz answers={this.props.quiz[this.props.activeQuestion].answers}
                                                    question={this.props.quiz[this.props.activeQuestion].question}
                                                    onAnswerClickHandler={this.onAnswerClickHandler}
                                                    activeQuestion={this.props.activeQuestion + 1}
                                                    queastionsCount={this.props.quiz.length}
                                                    answerprops={this.props.answerprops} />
                                    </>
                    }
                </div>
            </div>
        )
    }
}

function mappropsToProps(props) {
    return {
        isLoading: props.quiz.isLoading,
        results: props.quiz.results,
        isFinishedQuiz: props.quiz.isFinishedQuiz,
        activeQuestion: props.quiz.activeQuestion,
        answerprops: props.quiz.answerprops,
        quiz: props.quiz.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mappropsToProps, mapDispatchToProps)(Quiz) 