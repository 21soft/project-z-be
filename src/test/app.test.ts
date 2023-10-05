import supertest from "supertest";
import app from "../app";

describe("/", () => {
  it("GET should return 200", async () => {
    await supertest(app).get("/").expect("Content-Type", /json/).expect(200);
  });
});
