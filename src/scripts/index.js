import PPAmount from './amount/index.js';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

window.PPAmount = PPAmount;
