import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import LoginLogoutContext from '../../context/LoginLogoutContext'
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
  static contextType = LoginLogoutContext;
  state = { error: null }

  handleSubmitJwtAuth = ev => {
       ev.preventDefault()
       this.setState({ error: null })
       const { user_name, password } = ev.target    
       AuthApiService.postLogin({
         user_name: user_name.value,
         password: password.value,
       })
         .then(res => {
           user_name.value = ''
           password.value = ''
           TokenService.saveAuthToken(res.authToken)
           this.props.onLoginSuccess()                               
         })
         .then(()=>this.context.setHideLogutFalse())
         .catch(res => {
           this.setState({ error: res.error })
         })
     }

  render() {
    const { error } = this.state
    return (
      <div className='LoginInForm'>
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <input
            name='user_name'
            defaultValue='demo'
            id='LoginForm__user_name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <input
            name='password'
            type='password'
            defaultValue='demo'
            id='LoginForm__password'>
          </input>
        </div>
        <button className='login_submit' type='submit'>
          Login
        </button>
      </form>
      </div>
    )
  }
}
