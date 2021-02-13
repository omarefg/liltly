const dotenv = require('dotenv');

const { supportedEnvs } = require('../src/utils/constants');

let environment;
let path;
const env = '.env';

switch (process.env.NODE_ENV) {
  case supportedEnvs.PRODUCTION: {
    environment = '';
    path = `/src/${env}`;
    break;
  }
  case supportedEnvs.DEVELOP: {
    environment = 'DEV_';
    path = `${process.env.HOME}`;
    break;
  }
  default: {
    break;
  }
}

dotenv.config({ path });

module.exports = environment;
