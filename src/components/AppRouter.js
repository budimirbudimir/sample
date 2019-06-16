import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { compose, withState, lifecycle } from 'recompose'

import { firebaseAuth } from '../config'
import { PrivateRoute, PublicRoute } from '../routes'

import Favorites from './Favorites'
import Login from './Login'
import Register from './Register'
import Header from './Header'
import Home from './Home'
import Navigator from './Navigator'
import PageNotFound from './404'

const AppRouter = ({ loading, authed }) => {
  // If loading, indicate it to user
  if (loading === true) return <h1>Loading</h1>

  return (
    <BrowserRouter>
      <div className="App">
        <Header authed={authed} />

        <div className="App-route_container">
          <Switch>
            <Route path="/" exact component={Home} />

            <PublicRoute authed={authed} path="/login" component={Login} />

            <PublicRoute
              authed={authed}
              path="/register"
              component={Register}
            />

            <PrivateRoute
              authed={authed}
              path="/navigator"
              component={Navigator}
            />

            <PrivateRoute
              authed={authed}
              path="/favorites"
              component={Favorites}
            />

            <Route render={() => <PageNotFound />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

const withRouterState = compose(
  withState('authed', 'setAuthed', false),
  withState('loading', 'setLoading', true)
)

const withLifecycleMethods = lifecycle({
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      this.props.setAuthed(!!user)
      this.props.setLoading(false)
    })
  },
  componentWillUnmount() {
    this.removeListener()
  }
})

export default compose(
  withRouterState,
  withLifecycleMethods
)(AppRouter)
