const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const res = await request(app).get("/users");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.property("name");
    expect(res.body[0]).to.have.property("email");
  });
});
