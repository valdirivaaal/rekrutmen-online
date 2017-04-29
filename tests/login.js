/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('Log In', function () {
  beforeEach(function () {
    server.execute(function () {
      const { Meteor } = require('meteor/meteor');
      const user = Meteor.users.findOne({ 'emails.address': 'muhamad.alfan01@gmail.com' });
      if (user) {
        Meteor.users.remove(user._id);
      }
    });
  });

  it('should allow us to login @watch', function () {
    server.execute(function () {
      const { Accounts } = require('meteor/accounts-base');
      Accounts.createUser({
        email: 'muhamad.alfan01@gmail.com',
        password: 'alfann',
        profile: {
          name: { first: 'Muhamad', last: 'Alfan' },
        },
      });
    });

    browser.url('http://localhost:3000/login')
           .setValue('[name="emailAddress"]', 'muhamad.alfan01@gmail.com')
           .setValue('[name="password"]', 'alfann')
           .submitForm('form');

    browser.waitForExist('.jumbotron');
    expect(browser.getUrl()).to.equal('http://localhost:3000/');
  });
});
