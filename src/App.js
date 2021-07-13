
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Auth from './containers/Auth/Auth'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import Logout from './containers/Logout/Logout'
import { connect } from 'react-redux'
import { autoLogin } from './redux/actions/auth'

function App(props) {

  console.log('props: ', props)

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/quiz/:id' component={Quiz} />
      <Route path='/' exact component={QuizList} />
      <Redirect to='/' />
    </Switch>
  )

  if (props.isAuthentificated) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Route path='/logout' component={Logout} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Layout>
      { routes }
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    isAuthentificated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
