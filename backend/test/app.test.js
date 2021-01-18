const app = require('../server');
const supertest = require("supertest");
const request = supertest(app);
const _id = "5fe2eb9c0bb1940ea40b445d";

it("get the Info of Admin", async (done) => {
  const response = await request.get("/api/users/createadmin");

  expect(response.status).toBe(200);

  // expect(response.body.message).toBe('Products')
  done();
});
it("get All Products", async (done) => {
  const response = await request.get("/api/products");

  expect(response.status).toBe(200);

  // expect(response.body.message).toBe('Products')
  done();
});

it("get products By Id", async (done) => {
  const response = await request.get(`/api/products/${_id}`);

  expect(response.status).toBe(200);

  // expect(response.body.message).toBe('Products')
  done();
});
it("Register New User", async (done) => {
  const response = await request.post("/api/users/register").send({
    name: "abc",
    email: "abcdefghi@gmail.com",
    password: "478",
  });

  expect(response.body.name).toBeTruthy();

  expect(response.status).toBe(200);

  // expect(response.body.message).toBe('Products')
  done();
});
it("SignIn User", async (done) => {
  const response = await request.post("/api/users/signin").send({
    email: "abcdefgh@gmail.com",
    password: "478",
  });

  expect(response.body.name).toBeTruthy();

  expect(response.status).toBe(200);

  // expect(response.body.message).toBe('Products')
  done();
});
