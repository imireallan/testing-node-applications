import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@config";
import User from "@models/User";
import { connect, disconnect } from "@tests/utils/mongoose";

describe("The User model", () => {
  const user = {
    name: "Test User4",
    email: "test@user4.com",
    password: "password",
  };
  let createdUser;
  beforeAll(async () => {
    await connect();
    createdUser = await User.create(user);
  });
  afterAll(async () => {
    await disconnect();
  });
  it("Should hash the password before saving to the db", async () => {
    expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true);
  });
  it("Should generate email confirm code", async () => {
    expect(createdUser.emailConfirmCode).toEqual(expect.any(String));
  });
  describe("The generate token method", () => {
    it("Should generate jwt token", () => {
      const token = createdUser.generateToken();
      const { id } = jwt.verify(token, config.jwtSecret);
      expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)));
    });
  });
});
