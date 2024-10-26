const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const heroRouter = require("../routers/heroes.route")

const app = express();
app.use(express.json());
app.use("/api/heroes", heroRouter);
jest.setTimeout(30000)


beforeAll(async () => {
  await mongoose.connect("mongodb+srv://admin:admin@whatever-cluster.rtsxp.mongodb.net/?retryWrites=true&w=majority&appName=whatever-cluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Heroes API", () => {
  let heroId;

  it("should create a new hero", async () => {
    const res = await request(app)
      .post("/api/heroes")
      .send({
        nickname: "Klark",
        real_name: "Superman",
        superpowers: ["Flight"],
        catch_phrase: "yo",
        origin_description: "Some description",
        images: ["img/some", "img/some1"],

      });
    heroId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("nickname", "Klark");
  });

  it("should get all heroes", async () => {
    const res = await request(app).get("/api/heroes?page=1&limit=10");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("heroes");
    expect(res.body.heroes.length).toBeGreaterThan(0);
  });

  it("should get a hero by ID", async () => {
    const res = await request(app).get(`/api/heroes/${heroId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", heroId);
  });

  it("should update a hero", async () => {
    const res = await request(app)
      .put(`/api/heroes/${heroId}`)
      .send({
        nickname: 'Not Clark Kent',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("nickname", "Not Clark Kent");
  });

  it("should delete a hero", async () => {
    const res = await request(app).delete(`/api/heroes/${heroId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Hero has been deleted!");
  });
});
