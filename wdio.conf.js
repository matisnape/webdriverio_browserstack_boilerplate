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
        // {
        //     'os': 'Windows',
        //     'os_version': '7',
        //     'browser': 'IE',
        //     'browser_version': '11.0',
        //     'resolution': '1280x1024',
        //     build: 'webdriver-browserstack2'
        // },
        {
            'os': 'OS X',
            'os_version': 'Sierra',
            'browser': 'Chrome',
            'browser_version': '56.0',
            'resolution': '1280x1024' ,
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
            // do something
        }
    },
    afterTest: function (test) {
        if (test.passed) {
            return console.log(test);
        } else if (test.failed) {
            var request = require("request");
            request({
                uri: "https://" + BROWSERSTACK_USERNAME + ":" + BROWSERSTACK_ACCESS_KEY + "@api.browserstack.com/automate/sessions/<session-id>.json",
                method:"PUT",
                form:{
                    "status":"error",
                    "reason":"assertion failed"
                }
            });
        }
    }
};
