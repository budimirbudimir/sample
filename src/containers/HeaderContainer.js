import { connect } from 'react-redux'

import { logout } from '../actions'
import Header from '../components/Header'
import '../styles/Header.css'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
})

export default connect(
	mapStateToProps, mapDispatchToProps
)(Header)
