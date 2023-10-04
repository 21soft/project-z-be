import supertest from "supertest";
import app from "./app";
import {v4} from 'uuid'
import {hashSync} from 'bcryptjs'

describe("/", () => {
  it("GET should return 200", async () => {
    await supertest(app).get("/").expect("Content-Type", /json/).expect(200);
  });
});


jest.mock('./repository/user_repository', () => ({
  create: jest.fn()
}))
describe("Register API", () => {

  it("should return success if data is valid", async () => {
    jest.spyOn(require('./repository/user_repository'), 'create').mockReturnValue({
      id: 1,
      uuid: v4(),
      email: "fulan@mail.com",
      password: hashSync('Password!23', 10)
    })

    const res = await supertest(app)
      .post("/api/v1/register")
      .send({
        email: "fulan@mail.com",
        password: "Password!23",
      })
    
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        success: true,
        message: expect.any(String),
        data: expect.any(Object)
      })
  });

  it("should return bad request if data is not valid", async () => {
    const res = await supertest(app)
      .post("/api/v1/register")
      .send({})

    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      success: false,
      message: expect.any(String),
      errors: expect.any(Object)
    })
  });
});
