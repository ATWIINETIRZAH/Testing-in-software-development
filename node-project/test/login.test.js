const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app'); // Assuming this is where your app is exported from

describe('User Login API', function() {
    it('should return 200 and a token for valid login credentials', function(done) {
        const userCredentials = {
          username: 'validUsername', // Ensure these are valid credentials
          password: 'validPassword'   // Ensure these are valid credentials
        };
      
        request(app)
          .post('/login')
          .send(userCredentials)
          .end(function(err, res) {
            if (err) return done(err);
      
            console.log('Response status:', res.status); // Log the status code
            console.log('Response body:', res.body);     // Log the response body
      
            expect(res.status).to.equal(200); // Checking if status is 200
            expect(res.body).to.have.property('token'); // Checking if token is returned
            done();
          });
      });
      

  it('should return 401 for invalid login credentials', function(done) {
    const userCredentials = {
      username: 'invalidUsername',
      password: 'invalidPassword'
    };

    request(app)
      .post('/login')
      .send(userCredentials)
      .end(function(err, res) {
        if (err) return done(err);
        
        expect(res.status).to.equal(401); // Checking if status is 401
        done();
      });
  });
});
