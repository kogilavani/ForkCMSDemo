var assert = require('assert');


describe('check the title of the fork cms page and login', function() {
    it('user is able to login', function () {
        browser.url('/');
        var title = browser.getTitle();
        assert.equal(title, 'Home - My website');
        browser.url('/private');
        const userName = browser.element('//input[@id="backendEmail"]');
        const passWord = browser.element('//input[@id="backendPassword"]');
        const loginBtn = browser.element('//span[contains(text(), "Log in")]');
        userName.setValue('demo@fork-cms.com');
        passWord.setValue('demo');
        browser.submitForm('#authenticationIndex');
        var homePageTitle = browser.getTitle();                     
        assert.equal(homePageTitle, 'Dashboard - My website - Fork CMS');
    });
});

describe('Add article in save draft mode', function () {
    it('article is saved in draft mode', function () {               
        browser.click('=Modules');
        browser.click('=Blog');
        browser.click('[title="Add article"]');
        const articleTitle = browser.element('#title');
        articleTitle.setValue('draft article');   
        browser.waitForExist('iframe[class="cke_wysiwyg_frame cke_reset"]');
        const elements = 
        browser.elements('iframe[class="cke_wysiwyg_frame cke_reset"]').value[0];
        console.log(elements.value);
        browser.frame(elements.value);        
        browser.element('body[class="content cke_editable cke_editable_themed cke_contents_ltr cke_show_borders"]').keys('content edit');                          
        browser.frameParent();        
        browser.click('[name="saveAsDraft"]');
    });
});