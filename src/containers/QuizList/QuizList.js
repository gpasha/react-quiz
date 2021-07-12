import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import Loader from '../../components/Loader/Loader'
import {connect} from 'react-redux'
import { fetchQuizes } from '../../redux/actions/quiz'

class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map(quiz  => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/'+ quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>
                    {
                        this.props.isLoading && this.props.quizes.length !== 0
                            ? <Loader />
                            : <ul>
                                { this.renderQuizes() }
                              </ul>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        quizes: state.quiz.quizes,
        isLoading: state.quiz.isLoading
    }
}

const mapDispatchToProps = dispath => {
    return {
        fetchQuizes: () => dispath(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)