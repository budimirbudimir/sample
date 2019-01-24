import { compose, withState, lifecycle } from 'recompose'

import { firebaseAuth } from '../config'
import AppRouter from '../components/AppRouter'

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
  withLifecycleMethods,
)(AppRouter)
