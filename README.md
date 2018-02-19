# webdriverio_browserstack_boilerplate

## Setup & Run

`yarn install`
`./node_modules/.bin/wdio wdio.conf.js`


## Problems
----------

### Browserstack treats 1 describe with 2 its as one test thread on BS - so if one test fails, the whole thread will be marked as failed.

**Solution:**
Add this hook in wdio config file:

```
afterTest(function(){
        browser.reload();
    })
```

However, this causes one empty success session to run on browserstack.

### I couldn't set the browsersize in chromeOpts with `--window-size` arg, sadly, so I put this in a test.

**Workaround:**
I've added this step in a test:
```
browser.setViewportSize({
            width: 1200,
            height: 800
        });
```
But this is not the way it should be done.
