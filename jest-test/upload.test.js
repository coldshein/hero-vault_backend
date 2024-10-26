const request = require("supertest");
const express = require("express");
const path = require("path");
const uploadRouter = require("../routers/upload.route");

const app = express();
app.use(uploadRouter);

describe("Image Upload API", () => {
  it("should upload images", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("images", path.join(__dirname, "images", "test-img.webp"));

    expect(res.status).toBe(200);
  });

  it("should return an error if no images are provided", async () => {
    const res = await request(app).post("/upload");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "No files uploaded");
  });
});
