describe('Netguru.co page', function() {
    it('should have the right title', function () {
        browser.url('/');
        expect(browser.getTitle()).toBe('Building software for world changers | Netguru');
        browser.element("//div[@id='main-nav']//a[text()='About us']").click();
        browser.waitUntil(function () {
            return browser.getUrl().match('/about-us');
          }, 5000 );
        expect(browser.getTitle()).toBe('About us - Our approach');
    });
});
