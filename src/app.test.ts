import supertest from "supertest";
import app from "./app";

describe("/", () => {
  it("GET should return 200", async () => {
    await supertest(app).get("/").expect("Content-Type", /json/).expect(200);
  });
});

describe("Register API", () => {
  it("should return success if data is valid", async () => {
    await supertest(app)
      .post("/api/v1/register")
      .send({
        email: "fulan@mail.com",
        password: "Password!23",
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("should return bad request if data is not valid", async () => {
    await supertest(app)
      .post("/api/v1/register")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
