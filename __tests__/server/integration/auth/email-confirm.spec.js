import supertest from "supertest";
import server from "@server/app";
import { disconnect } from "@tests/utils/mongoose";
import User from "@models/user";

const app = () => supertest(server);

describe("The email confirm process", () => {
  const EMAIL_CONFIRM_ENDPOINT = "/api/v1/auth/emails/confirm";
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
  it("Returns a 422 for invalid token", async () => {
    const response = await app().post(EMAIL_CONFIRM_ENDPOINT).send({
      token: "nkfngknfg",
    });
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("Validation failed.");
    expect(response.body.data.errors).toEqual({
      email: "Invalid email confirmation token.",
    });
  });
  it("Confirms email with valid token", async () => {
    const createdUser = await User.create(user);
    const response = await app().post(EMAIL_CONFIRM_ENDPOINT).send({
      token: createdUser.emailConfirmCode,
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Email confirmed.");
    expect(response.body.data.user.emailConfirmCode).toBeNull();
    expect(response.body.data.user.emailConfirmedAt).toBeDefined();

    const updatedUser = await User.findOne({ email: createdUser.email });
    expect(updatedUser.emailConfirmCode).toBeNull();
    expect(updatedUser.emailConfirmedAt).toBeDefined();
  });
});
