import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_START,
    FETCH_QUIZES_ERROR,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    RETRY_QUIZ
} from "../actions/actionTypes"

const initialState = {
    quizes: null,
    isLoading: false,
    results: {},
    isFinishedQuiz: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch(action.type) {        
        case  FETCH_QUIZES_START:
            return {
                ...state,
                isLoading: true
            }
        case  FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizes: action.quizes
            }            
        case  FETCH_QUIZ_START:
            return {
                ...state,
                isLoading: false,
                quiz: action.quiz
            }
        case  FETCH_QUIZES_ERROR:
            return {
                ...state,
                isLoading: false,
                errror: action.errror
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinishedQuiz: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.number,
                answerState: null
            }
        case RETRY_QUIZ:
            return {
                ...state,
                results: {},
                isFinishedQuiz: false,
                activeQuestion: 0,
                answerState: null
            }
        default:
            return state
    }
}