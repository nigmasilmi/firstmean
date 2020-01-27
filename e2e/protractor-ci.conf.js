// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const config = require('./protractor.conf').config;
const puppeteer = require('puppeteer');

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox'],
    binary: puppeteer.executablePath()
  }
};

exports.config = config;
