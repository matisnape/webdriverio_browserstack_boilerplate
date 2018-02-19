const util = require('util');
const request = require("request");
const bs_user = process.env.BROWSERSTACK_USERNAME || BROWSERSTACK_USERNAME;
const bs_key = process.env.BROWSERSTACK_ACCESS_KEY || BROWSERSTACK_ACCESS_KEY;

exports.config = {

    // browserstack needs these properties here
    user: bs_user,
    key: bs_key,

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
            'resolution': '1280x960' ,
            build: 'webdriver-browserstack-macos',
            'chromeOptions': {
                'prefs': {
                    'credentials_enable_service': false,
                    'profile': {
                        // if browser password manager makes you crazy
                        'password_manager_enabled': false
                    }
                }
            }
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browser': 'Chrome',
            'browser_version': '64.0',
            'resolution': '1366x768',
            build: 'webdriver-browserstack-win'
        }
    ],
    sync: true,
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
                // you need to define the url here, because request lib apparently cannot into interpolation on the fly
                let url = "https://" + bs_user + ":" + bs_key + "@api.browserstack.com/automate/sessions/"+ browser.sessionId +".json"

                request({
                    uri: url,
                    method:"PUT",
                    form:{
                        "status":"error",
                        "reason":""
                    }
                });
            };
        }
    }
};
