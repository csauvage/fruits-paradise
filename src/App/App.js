import React, { Component } from 'react';
import {StripeProvider} from 'react-stripe-elements';
import Header from '../Header/index';
import ShoppingCart from '../Shopping/index';
import './App.css';


const stripeKey = 'pk_test_uIwCkJRngOpROAMK5PDPXvzZ';


class App extends Component {
  render() {
    return (
      <div>
        <Header title={this.props.title}/>
        <ShoppingCart/>
      </div>
    );
  }
}


const Wrapper = (props) => {
    return(
        <StripeProvider apiKey={stripeKey}>
            <App title={props.title}/>
        </StripeProvider>
    )
}

export default Wrapper;
