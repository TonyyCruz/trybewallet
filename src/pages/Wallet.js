import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/index';
import Load from '../components/Load/index';
import { actionCurrenciAPI } from '../actions/index';

class Wallet extends React.Component {
  state = {
    isLoading: false,
  }

  async componentDidMount() {
    const { fetchCurrencies, currencies } = this.props;
    await fetchCurrencies();
    console.log('did', currencies);
  }

  render() {
    const { isLoading } = this.state;

    return (
      isLoading ? (<Load />
      ) : (
        <Header />
      )
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actionCurrenciAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};
