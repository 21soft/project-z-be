import { hashSync } from "bcryptjs";
import supertest from "supertest";
import { v4 } from "uuid";
import app from "../app";
import * as userRepo from "../repository/user_repository";

describe("Register Controller", () => {
  it("should return success if data is valid", async () => {
    jest.spyOn(userRepo, "create").mockResolvedValue({
      id: 1,
      uuid: v4(),
      email: "fulan@mail.com",
      password: hashSync("Password!23", 10),
    });

    const res = await supertest(app).post("/api/v1/register").send({
      email: "fulan@mail.com",
      password: "Password!23",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      success: true,
      message: expect.any(String),
      data: expect.any(Object),
    });
  });

  it("should return bad request if data is not valid", async () => {
    const res = await supertest(app).post("/api/v1/register").send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      success: false,
      message: expect.any(String),
      errors: expect.any(Object),
    });
  });
});

describe("Login Controller", () => {
  it("should return 404 when user not found", async () => {
    jest.spyOn(userRepo, 'findFirstByEmail').mockResolvedValue(undefined)

    const res = await supertest(app).post("/api/v1/login").send({
      email: "fulan@mail.com",
      password: "Password!23",
    });

    expect(res.statusCode).toEqual(404);
  });

  it("should return 200 for a valid login", async () => {
    jest.spyOn(userRepo, "findFirstByEmail").mockResolvedValue({
      id: 1,
      uuid: v4(),
      email: "fulan@mail.com",
      password: hashSync("Password!23", 10),
    });

    const res = await supertest(app).post("/api/v1/login").send({
      email: "fulan@mail.com",
      password: "Password!23",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      success: true,
      message: expect.any(String),
      data: expect.any(Object),
    });
  });

  it("should return 400 when request body is not valid", async () => {
    const res = await supertest(app).post("/api/v1/login").send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      success: false,
      message: expect.any(String),
      errors: expect.any(Object),
    });
  });
});
