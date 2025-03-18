// const request = require('supertest');  // To make HTTP requests to your server
// const app = require('../server');      // Import your server to make requests to it
// const { expect } = require('chai');   // Chai assertion library

// describe('Order Management API', () => {
  
//   // Test the POST /orders endpoint (Create order)
//   describe('POST /orders', () => {
//     it('should create a new order', (done) => {
//       const orderData = {
//         customerId: 1,
//         items: ["item1", "item2"],
//         totalAmount: 100.50
//       };

//       request(app)
//         .post('/orders')  // POST request to /orders
//         .send(orderData)  // Send order data
//         .expect(201)      // Expect HTTP status code 201 (Created)
//         .end((err, res) => {
//           if (err) return done(err);
          
//           // Assert that the response contains the expected data
//           expect(res.body).to.have.property('id');
//           expect(res.body.customerId).to.equal(orderData.customerId);
//           expect(res.body.items).to.deep.equal(orderData.items);
//           expect(res.body.totalAmount).to.equal(orderData.totalAmount);
          
//           done();  // Finish the test
//         });
//     });

//     it('should return 400 for missing required fields', (done) => {
//       const orderData = {
//         customerId: 1,
//         items: []
//       };

//       request(app)
//         .post('/orders')
//         .send(orderData)
//         .expect(400)  // Expect HTTP status code 400 (Bad Request)
//         .end(done);   // Finish the test
//     });
//   });

//   // Test the GET /orders endpoint (Get all orders)
//   describe('GET /orders', () => {
//     it('should retrieve all orders', (done) => {
//       request(app)
//         .get('/orders')  // GET request to /orders
//         .expect(200)     // Expect HTTP status code 200 (OK)
//         .end((err, res) => {
//           if (err) return done(err);

//           // Assert that the response body is an array
//           expect(res.body).to.be.an('array');
//           done();  // Finish the test
//         });
//     });
//   });

// });

// const request = require('supertest');
// const app = require('../server'); // Import the app from server.js
// const { expect } = require('chai');

// describe('Order Management API - Error Handling', () => {

//   describe('POST /orders', () => {
//     it('should return 400 for missing required fields', (done) => {
//       const orderData = {
//         customerId: 1,
//         items: []  // Missing totalAmount
//       };

//       request(app)
//         .post('/orders')
//         .send(orderData)
//         .expect(400)  // Expect HTTP status code 400
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.body).to.have.property('error').that.equals('Missing required fields');
//           done();
//         });
//     });

//     it('should return 500 if there is a server error', (done) => {
//       const malformedOrderData = {
//         customerId: null,  // This will cause an issue if we expect a number
//         items: "item1",
//         totalAmount: "invalid"
//       };

//       request(app)
//         .post('/orders')
//         .send(malformedOrderData)
//         .expect(500)  // Expect HTTP status code 500
//         .end(done);
//     });
//   });

//   describe('GET /orders/:id', () => {
//     it('should return 404 for a non-existing order', (done) => {
//       request(app)
//         .get('/orders/999')
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.body).to.have.property('error').that.equals('Order not found');
//           done();
//         });
//     });

//     it('should return 200 for an existing order', (done) => {
//       const orderData = {
//         customerId: 1,
//         items: ["item1", "item2"],
//         totalAmount: 100.50
//       };

//       request(app)
//         .post('/orders')
//         .send(orderData)
//         .expect(201)
//         .end((err, res) => {
//           if (err) return done(err);
//           const orderId = res.body.id;

//           request(app)
//             .get(`/orders/${orderId}`)
//             .expect(200)
//             .end((err, res) => {
//               if (err) return done(err);
//               expect(res.body).to.have.property('id').that.equals(orderId);
//               done();
//             });
//         });
//     });
//   });

// });


const request = require('supertest');
const app = require('../server'); 
const { expect } = require('chai');

describe('Order Management API - Error Handling', () => {
  
  // Test case for missing required fields
  it('should return 400 for missing required fields', async () => {
    const response = await request(app)
      .post('/orders')
      .send({ totalAmount: 200 });  // Missing 'customerName'
      
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Missing required fields');
  });

  // Test case for invalid totalAmount (non-numeric)
  it('should return 400 for invalid totalAmount (non-numeric)', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        totalAmount: 'non-numeric',
        customerName: 'John Doe'
      });
      
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Invalid totalAmount');
  });


  // Test case for non-existing order
  it('should return 404 for a non-existing order', async () => {
    const response = await request(app).get('/orders/999');
    
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal('Order not found');
  });

  // Test case for existing order
  it('should return 200 for an existing order', async () => {
    const response = await request(app).get('/orders/123');
    
    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal('123');
    expect(response.body.totalAmount).to.equal(200);
    expect(response.body.customerName).to.equal('John Doe');
  });

});
