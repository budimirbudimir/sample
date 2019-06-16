import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

// Project specific dependencies
import { firebaseAuth } from '../config'
import { PrivateRoute, PublicRoute } from '../routes'

// Components/Pages // TODO Decouple later
import Favorites from './Favorites'
import Login from './Login'
import Register from './Register'
import Header from './Header'
import Home from './Home'
import Navigator from './Navigator'
import PageNotFound from './404'

const AppRouter = () => {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleOnChange = user => {
    setAuthed(!!user)
    setLoading(false)
  }

  useEffect(() => {
    // Listen for auth state changes
    const removeListener = firebaseAuth().onAuthStateChanged(handleOnChange)
    // Unsubscribe when unmounting
    return () => removeListener()
  }, [])

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

export default AppRouter
