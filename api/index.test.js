import request from "supertest";
import app from ".";

describe("/hello", () => {
  it("should return an array of mocks", async () => {
    const response = await request(app).get("/api/mocks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((mock) => {
      expect(mock).toHaveProperty("title");
      expect(mock).toHaveProperty("level");
      expect(mock).toHaveProperty("score");
    });
  });
});
