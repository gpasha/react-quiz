import React, { Component } from 'react'
import quizClasses from './Quiz.module.css'
import ActiceQuiz from '../../components/ActiceQuiz/ActiceQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, clickAnswerClick, retryQuiz } from '../../redux/actions/quiz'

class Quiz extends Component {
    
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
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
                                                    refreshHandler={this.props.retryQuiz} />
                                    : <>
                                        <h1>Answer the questions</h1>
                                        <ActiceQuiz answers={this.props.quiz[this.props.activeQuestion].answers}
                                                    question={this.props.quiz[this.props.activeQuestion].question}
                                                    onAnswerClickHandler={this.props.clickAnswerClick}
                                                    activeQuestion={this.props.activeQuestion + 1}
                                                    queastionsCount={this.props.quiz.length}
                                                    answerState={this.props.answerState} />
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
        answerState: props.quiz.answerState,
        quiz: props.quiz.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        clickAnswerClick: id => dispatch(clickAnswerClick(id)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mappropsToProps, mapDispatchToProps)(Quiz) 