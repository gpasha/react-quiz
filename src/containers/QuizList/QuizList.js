import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/Loader/Loader'

class QuizList extends Component {

    state = {
        quizes: [],
        isLoading: true
    }

    renderQuizes() {
        return this.state.quizes.map(quiz  => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/'+ quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json')
            let quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes = [...quizes, {
                    id: key,
                    name: `Test №${index + 1}`
                }]
            })
            this.setState({
                quizes,
                isLoading: false
            })
        }
        catch(e) {
            console.log('e: ', e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>
                    {
                        this.state.isLoading
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

export default QuizList