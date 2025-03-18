const request = require('supertest');  // To make HTTP requests to your server
const app = require('../server');      // Import your server to make requests to it
const { expect } = require('chai');   // Chai assertion library

describe('Order Management API', () => {
  
  // Test the POST /orders endpoint (Create order)
  describe('POST /orders', () => {
    it('should create a new order', (done) => {
      const orderData = {
        customerId: 1,
        items: ["item1", "item2"],
        totalAmount: 100.50
      };

      request(app)
        .post('/orders')  // POST request to /orders
        .send(orderData)  // Send order data
        .expect(201)      // Expect HTTP status code 201 (Created)
        .end((err, res) => {
          if (err) return done(err);
          
          // Assert that the response contains the expected data
          expect(res.body).to.have.property('id');
          expect(res.body.customerId).to.equal(orderData.customerId);
          expect(res.body.items).to.deep.equal(orderData.items);
          expect(res.body.totalAmount).to.equal(orderData.totalAmount);
          
          done();  // Finish the test
        });
    });

    it('should return 400 for missing required fields', (done) => {
      const orderData = {
        customerId: 1,
        items: []
      };

      request(app)
        .post('/orders')
        .send(orderData)
        .expect(400)  // Expect HTTP status code 400 (Bad Request)
        .end(done);   // Finish the test
    });
  });

  // Test the GET /orders endpoint (Get all orders)
  describe('GET /orders', () => {
    it('should retrieve all orders', (done) => {
      request(app)
        .get('/orders')  // GET request to /orders
        .expect(200)     // Expect HTTP status code 200 (OK)
        .end((err, res) => {
          if (err) return done(err);

          // Assert that the response body is an array
          expect(res.body).to.be.an('array');
          done();  // Finish the test
        });
    });
  });

});
