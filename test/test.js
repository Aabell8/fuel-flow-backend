const request = require('supertest');
const app = require('../');

describe('App', function() {
  it('has the default page', function(done) {
    request(app)
      .get('/')
      .expect(/imgay/, done);
  });
}); 
