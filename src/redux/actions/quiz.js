import axios from '../../axios/axios-quiz'
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_START, FETCH_QUIZES_ERROR } from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')
            let quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes = [...quizes, {
                    id: key,
                    name: `Test №${index + 1}`
                }]
            })
            console.log('response => ', response)
            console.log('quizes => ', quizes)
            dispatch(fetchQuizesSuccess(quizes))
        }
        catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))            
        }
        catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_START,
        quiz
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}