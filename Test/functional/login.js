// force the test environment to 'test'
process.env.NODE_ENV = 'test';
// get the application server module
var app     = require('../../server');
var assert  = require('assert');
var browser = require('zombie');
var http    = require('http');

describe('login page', function() {
 	before(function() {
    	this.server = http.createServer(app).listen(4000);
    	this.browser = new browser({ site: 'http://localhost:4000' });
  	});

  	beforeEach(function(done) {
    this.browser.visit('/', done);
  	});

	it('should show login form', function(){
		assert.ok(this.browser.success);
    assert.equal(this.browser.text('title'), 'ChannelX');
    	//assert.equal(this.browser.text('form label'), 'First NameLast NameEmailMessage');
	});
	it('should refuse empty submissions');

	after(function(done) {
    	this.server.close(done);
  	});
});