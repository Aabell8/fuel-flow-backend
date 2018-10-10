const request = require("supertest");
const app = require("../");
const assert = require("assert");

describe("App", function() {
  it("has the default page", function(done) {
    request(app)
      .get("/")
      .expect(/test/, done);
  });
});

describe("/parties/", function() {
  let partyId;

  it("POSTS a new party", function(done) {
    request(app)
      .post("/parties")
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        const { body } = res;
        if (body._id) {
          partyId = body._id;
        } else {
          return done("No party id sent back");
        }
        done();
      });
  });

  it("GET request by id", function(done) {
    request(app)
      .get(`/parties/${partyId}`)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, result) {
        if (err) return done(err);
        assert.equal(result.body._id, partyId);
        done();
      });
  });

  it("POST a user to a party", function(done) {
    request(app)
      .put(`/parties/${partyId}/people`)
      .send({ id: "testName", name: "testName" })
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        const { people } = res.body;
        assert.equal(people.length, 1);
        assert.equal(people[0]._id, "testName");
        assert.equal(people[0].name, "testName");
        done();
      });
  });

  it("PUTS isRequesting status on requesting user", function(done) {
    request(app)
      .put(`/parties/${partyId}/people/testName`)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        const { people } = res.body;
        assert.equal(people[0].isRequesting, true);
        done();
      });
  });

  it("Verifies drink request and increments drink", function(done) {
    request(app)
      .put(`/parties/${partyId}/people/testName/verify`)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        const { people } = res.body;
        assert.equal(people[0].isRequesting, false);
        assert.equal(people[0].drinks, 1);
        done();
      });
  });
});
