import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://carpp.online:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="max-w-sm mx-auto mt-8">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-6 text-center font-bold leading-tight">Sign In</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold leading-5 mb-2" htmlFor="email-address">
            Email
          </label>
          <input
            className="appearance-none border box-border border-gray-200 hover:border-gray-300 focus:border-emerald-700 focus:ring-emerald-700 focus:ring-1 rounded w-full py-2 px-3 leading-tight focus:outline-none"
            type="email"
            name="email-address"
            id="email-address"
            onChange={this.onEmailChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold leading-5 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border box-border border-gray-200 hover:border-gray-300 focus:border-emerald-700 focus:ring-emerald-700 focus:ring-1 rounded w-full py-2 px-3 leading-tight focus:outline-none"
            type="password"
            name="password"
            id="password"
            onChange={this.onPasswordChange}
          />
        </div>
        <div className="mb-8">
          <button
            onClick={this.onSubmitSignIn}
            className="w-full hover:bg-green-950  bg-emerald-700 text-white text-sm font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          
        </div>
        <div className='text-sm font-medium text-gray-500 text-center'>
        Don't have an account?&nbsp;
        <button
            onClick={() => onRouteChange('register')}
            className="font-semibold text-sm text-green-950 hover:underline cursor-pointer bg-transparent border-none p-0"
        >
         Register
        </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        If you don't feel like registering just enter test:test :)
      </p>
    </div>
    
    );
  }
}

export default Signin;