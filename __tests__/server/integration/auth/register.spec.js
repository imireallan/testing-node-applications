import supertest from "supertest";
import server from "@server/app";
import { disconnect } from "@tests/utils/mongoose";
import User from "@models/user";

const app = () => supertest(server);

describe("The register process", () => {
  const REGISTER_URL = "/api/v1/auth/register";
  const user = {
    name: "Test User4",
    email: "test@user4.com",
    password: "password",
  };
  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it("Should register a new user", async () => {
    const response = await app().post(REGISTER_URL).send(user);
    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.message).toBe("Account registered.");
  });
  it("Should return validation error for exixting user", async () => {
    await User.create(user);
    const response = await app().post(REGISTER_URL).send(user);
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Validation failed.");
    expect(response.body.data.errors).toEqual({
      email: "This email has already been taken.",
    });
  });
});
