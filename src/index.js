import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Wrapper title={'Fruit Paradise'} />, document.getElementById('root'));
registerServiceWorker();
