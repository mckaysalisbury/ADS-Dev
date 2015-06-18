module.exports = {
  'Can navigate to base url and receive the correct title' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      // .setValue('input[type=text]', 'nightwatch')
      .assert.title('Express')
      .assert.containsText('body', 'Welcome')
      .click('button[type=submit]')
      .pause(1000)      
      .assert.containsText('#dataTable', 'DRUG INEFFECTIVE')
      .end();
  }
};