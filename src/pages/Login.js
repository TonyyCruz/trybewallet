import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginAction from '../actions';
import CreateInput from '../components/CreateInput';
import CreateButton from '../components/CreateButton';

class Login extends React.Component {
  state = {
    loginEmail: '',
    loginPassword: '',
    buttonDisabled: true,
  }

  handleChange = ({ target: { name, value } }) => {
    const minLength = 6;
    const includeCheck = ['@', '.com'];

    this.setState({ [name]: value }, () => {
      const { loginEmail, loginPassword } = this.state;
      const fieldCheck = [loginEmail, loginPassword];

      const lengthCheck = fieldCheck.every((field) => field.length >= minLength);
      const emailCheck = includeCheck.every((toHave) => loginEmail.includes(toHave));
      const disabled = lengthCheck && emailCheck;

      this.setState({ buttonDisabled: !disabled });
    });
  }

  LoginButton = () => {
    const { history, logIn } = this.props;
    const { loginEmail } = this.state;
    logIn(loginEmail);
    history.push('/carteira');
  }

  render() {
    const { loginEmail, loginPassword, buttonDisabled } = this.state;

    return (
      <section>
        <div>Login!!!!</div>

        <CreateInput
          testeId="email-input"
          onChange={ this.handleChange }
          name="loginEmail"
          value={ loginEmail }
          description="E-mail"
        />

        <CreateInput
          testeId="password-input"
          onChange={ this.handleChange }
          name="loginPassword"
          value={ loginPassword }
          description="Senha"
        />

        <CreateButton
          onClick={ this.LoginButton }
          name="loginButton"
          description="Entrar"
          isDisabled={ buttonDisabled }
        />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logIn: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
  logIn: PropTypes.func.isRequired,
};
