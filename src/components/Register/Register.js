import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://carpp.online:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
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
    return (
      <div className="max-w-sm mx-auto mt-8">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-6 text-center font-bold leading-tight">Register</h2>
        <div className="mb-4">
        <label className="block text-sm font-semibold leading-5 mb-2" htmlFor="name">
            Your Name
          </label>
          <input
            className="appearance-none border box-border border-gray-200 hover:border-gray-300 focus:border-emerald-700 focus:ring-emerald-700 focus:ring-1 rounded w-full py-2 px-3 leading-tight focus:outline-none"
            type="text"
            name="ename"
            id="name"
            onChange={this.onNameChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold leading-5 mb-2" htmlFor="password">
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
            Register
          </button>
        </div>
      </form>
    </div>
              
      
    );
  }
}

export default Register;