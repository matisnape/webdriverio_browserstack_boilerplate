const util = require('util');
const request = require("request");

exports.config = {

    user: process.env.BROWSERSTACK_USERNAME || BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY || BROWSERSTACK_ACCESS_KEY,

    updateJob: false,
    specs: [
        './test/**/*.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [

        {
            'os': 'OS X',
            'os_version': 'Sierra',
            'browser': 'Chrome',
            'browser_version': '60.0',
            'resolution': '1024x768' ,
            build: 'webdriver-browserstack2',
            'chromeOptions': {
                'prefs': {
                    'credentials_enable_service': false,
                    'profile': {
                        // if browser password manager makes you crazy
                        'password_manager_enabled': false
                    }
                }
            }
        }
    ],
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'verbose',
    coloredLogs: true,
    deprecationWarnings: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'http://netguru.co',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    reporters: ['dot'],
    host: 'hub.browserstack.com',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000*10*9000,
        expectationResultHandler: function(passed, assertion) {
            if (passed === false) {
                console.log(util.inspect(passed, { showHidden: true, depth: null }));

                request({
                    uri: "https://" + user + ":" + key + "@api.browserstack.com/automate/sessions/"+ browser.sessionId +".json",
                    method:"PUT",
                    form:{
                        "status":"error",
                        "reason":""
                    }
                });
            };
            console.log(user, key, browser.sessionId, uri)
        }
    }
};
