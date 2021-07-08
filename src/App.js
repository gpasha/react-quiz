
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Auth from './containers/Auth/Auth'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'



function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
      </Switch>
    </Layout>
  )
}

export default App
