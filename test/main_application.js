var expect  = require('chai').expect;
var request = require('request');
const app = require("../app.js");

// We'll run two files, with two tests each
// primary tests will test the primary endpoints
// and routes.

const port = process.env.PORT || 3000;

console.log("Greeting from: " + (process.env.CIRCLE_JOB || "Local build") + "\nRunning on Node index: " + (process.env.CIRCLE_NODE_INDEX || "1"))

// res.header['x-powered-by']
//console.log(response.headers['x-powered-by']);

describe('Status, content, and correct response types', function() {
    describe ('Main page', function() {
        it('status', function(done){
            request(`http://localhost:${port}/`, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content-type / html', function(done) {
            request(`http://localhost:${port}/`, function(error, response, body) {
                // Here we need to make additional asserts on the headers and shape
                // of the request
                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
                done();
            });
        });
    });

    describe ('Build Info', function() {
        it('status', function(done){
            request(`http://localhost:${port}/buildInfo`, function(error, response, body) {
                // might want to test other things
                // expect(response.statusCode).to.equal(404);
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});
