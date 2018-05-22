import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardElement, injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';

import './payement.css';


class PayementForm extends Component {


    static propTypes = {
        price: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        const payementRequestObject = {
            country: 'FR',
            currency: 'eur',
            total: {
                label: 'Fruit\'s heaven',
                amount: this.props.price,
            },
            requestShipping: true,
            shippingOptions: [

                {
                    id: 'free-shipping',
                    label: 'Angel Delivery',
                    detail: 'Arrives in 5 to 7 days',
                    amount: 0,
                },
            ],
        }

        const paymentRequest = this.props.stripe.paymentRequest(payementRequestObject);

        paymentRequest.canMakePayment().then((results) => {
            if(results) {
                this.setState({applePay: results.applePay});
            }
        });

        this.state = {
            applePay: false,
            paymentRequest,
            payementRequestObject
        };

    }


    componentWillReceiveProps(nextProps) {

        if(this.props.price !== nextProps.price) {
            this._handlePayementRequest(nextProps.price)
        }

    }

    _handlePayementRequest(amount) {

        this.setState({applePay: false});

        const payementRequestObject = this.state.payementRequestObject;
        payementRequestObject.total.amount = amount;


        const paymentRequest = this.props.stripe.paymentRequest(payementRequestObject);

        paymentRequest.canMakePayment().then((results) => {
            if(results) {
                this.setState({applePay: results.applePay, paymentRequest, payementRequestObject});
            }
        });




    };


    generateApplePayButton = () => {
        return this.state.applePay === true ? (
            <div>
                <h4>
                    Pay {this.props.price/100} € with Apple Pay
                </h4>

                <PaymentRequestButtonElement
                    paymentRequest={this.state.paymentRequest}
                    className={'shopping_payment__apple_pay__button'}
                />


            </div>
        ) : null
    }



    render() {
        return (
            <div className={'shopping__payment'}>

                {this.generateApplePayButton()}

                <h4>
                    Pay {this.props.price/100} € by Card
                </h4>

                <div className={'shopping__payment__card_details'}>
                    <CardElement style={{base: {fontSize: '16px'}}}/>
                </div>
                <button className={'shopping__payment__card_details__button'}>
                    Pay by card
                </button>


            </div>
        )
    }

}

export default injectStripe(PayementForm)