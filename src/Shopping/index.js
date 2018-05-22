import React, {Component} from 'react';
import {Elements} from 'react-stripe-elements';
import InjectedPayement from '../Payement'
import './shopping.css';

class Shopping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    name: 'holy 🍓',
                    unit: 'basket',
                    qty: 1,
                    unitPrice: 499
                },
                {
                    name: 'heaven 🍏',
                    unit: 'kgs',
                    qty: 2,
                    unitPrice: 299
                },
                {
                    name: 'sin 🍑',
                    unit: 'kgs',
                    qty: 1,
                    unitPrice: 399
                },
                {
                    name: 'penance\'s 🍒',
                    unit: 'pound(s)',
                    qty: 2,
                    unitPrice: 159
                }
            ],
            price: 0
        }

    }

    componentDidMount() {
        this.getPrice()
        this.forceUpdate();
    }



    updateQuantity = (index, increase = true) => {

        const items = this.state.items;

        let fruit = items[index];

        fruit.qty = increase ? fruit.qty + 1 : Math.max(0, fruit.qty - 1);

        items[index] = fruit;

        this.setState({items}, this.getPrice());


    };

    getPrice = () => {

        let total = 0;
        this.state.items.map((fruit) => {
            total += fruit.qty * fruit.unitPrice;
            return total;
        });

        this.setState({price: total});

    };


    generateFruitList = () => {
        return this.state.items.map((fruit, idx) => {
            return (<li className={'shopping__item'} key={idx}>
                        <span className={'shopping__item__name'}>
                            {fruit.qty} {fruit.unit} of {fruit.name} <br/>
                            <small>({fruit.unitPrice/100} € p. {fruit.unit})</small>
                        </span>
                        <ul className={"shopping__item__actions"}>
                            <li onClick={() => this.updateQuantity(idx, false)}>-</li>
                            <li>{fruit.qty}</li>
                            <li onClick={() => this.updateQuantity(idx, true)}>+</li>
                        </ul>
                    </li>);
        });
    };

    render() {
        return (
            <div>
                <div className={'shopping__cart'}>

                    <h3>
                        My cart :
                    </h3>

                    <ul className={'shopping__list'}>
                        {this.generateFruitList()}
                    </ul>

                </div>

                <Elements>
                    <InjectedPayement price={this.state.price}/>
                </Elements>


            </div>
        )
    }

}

export default Shopping;