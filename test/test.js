describe('Netguru.co page', function() {

    beforeEach(function() {
        browser.url('/');
      });

    it('should have the right title', function () {
        expect(browser.getTitle()).toBe('Building software for world changers | Netguru');
        browser.element("//div[@id='main-nav']//a[text()='About us']").click();
        browser.waitUntil(function () {
            return browser.getUrl().match('/about-us');
          }, 5000 );
        expect(browser.getTitle()).toBe('About us - Our approach');
        console.log(test);
    });

    it('this test should fail', function () {
        expect(browser.getTitle()).toBe('This is not the title');
        console.log(test);
    });
});
