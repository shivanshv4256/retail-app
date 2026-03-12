const request = require("supertest");
const app = require("../src/app");

describe("Product API Tests", () => {

  test("GET /products should return all products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("POST /products should create product", async () => {
    const res = await request(app)
      .post("/products")
      .send({
        name: "Keyboard",
        price: 1500
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Keyboard");
  });

});