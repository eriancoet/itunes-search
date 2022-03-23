import request from "request";
import chai from "chai";
let expect = chai.expect;

describe("Itunes App", function () {
    it("status", function (done) {
       request("http://localhost:3000/", function (error, response, body) {
        // eslint-disable-next-line jest/valid-expect
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
});