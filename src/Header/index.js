import React, {Component} from 'react';
import './header.css';

class Header extends Component {

    render() {
        return (
            <header>
                <div className={'header__container'}>
                    <h1>Fruit Paradise</h1>
                    <h2>Buy & Eat the best fruit in Heaven</h2>
                </div>
                <svg id="svg__shape" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 50">
                    <polygon className="shape" points="-8 25 -8 50 1500 50 -8 25"/>
                </svg>
            </header>
        )
    }

}

export default Header;