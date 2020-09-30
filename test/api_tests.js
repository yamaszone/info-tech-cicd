var request = require('request');

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app.js");

const buildObject = app.locals.buildObject;

const { expect } = chai;


chai.use(chaiHttp);

const port = process.env.PORT || 3000;

chai.use(chaiHttp);
describe("Testing API", () => {
  it("Verifies correct commitID", done => {
    chai
      .request(app)
      .get("/version")
      .end((err, res) => {
        expect(res.body.buildCommit).to.equals(buildObject.buildCommit);
        done();
      });
  });
  it("Checks correct build URL", done => {
    chai
      .request(app)
      .get("/version")
      .end((err, res) => {
        expect(res.body.CIRCLE_BUILD_URL).to.equals(buildObject.CIRCLE_BUILD_URL);
        done();
      });
  });
  it("Verifies correct application version", done => {
    chai
      .request(app)
      .get("/version")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.VERSION).to.equals("-1");
        done();
      });
  });
  it("Verifes correct envar", done => {
    chai
      .request(app)
      .get("/version")
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Notice the capitalization
        expect(res.body.CIRCLE_USERNAME).to.equals(buildObject.CIRCLE_USERNAME);
        done();
      });
  });
  // this could be split out
  it("Ensures correct http headers", done => {
    chai
      .request(app)
      .get("/version")
      .end((err, res) => {
        expect(res.header['x-powered-by']).to.equals("Express");
        done();
      });
  });
});