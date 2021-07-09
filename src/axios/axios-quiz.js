import axios from "axios"

export default axios.create({
    baseURL: 'https://react-quiz-e848d-default-rtdb.europe-west1.firebasedatabase.app/'
})