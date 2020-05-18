import React from 'react';
import ReactDOM from 'react-dom';
// import Buff from 'buffer/';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// // import Buffer from './libs/buffer';
// var bif = new Buff.Buffer.alloc(0);
// console.log(bif.readBigInt64BE(), Buff)
//
// if (typeof global?.Buffer === 'undefined') {

  // global.buffer = Buff.Buffer;
// }

ReactDOM.render(
  <App/>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
