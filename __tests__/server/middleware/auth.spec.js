import authMiddleware from "@middleware/auth";
import User from "@models/User";
import { connect, disconnect } from "@tests/utils/mongoose";
import Response from "@tests/utils/response";

describe("The auth middleware", () => {
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
  it("Should called the next function if authentication is successfull", async () => {
    const token = createdUser.generateToken();
    const req = {
      body: {
        access_token: token,
      },
    };
    const res = new Response();
    const next = jest.fn();
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it("Should return 401 when authentication is unsuccessfull", async () => {
    const req = {
      body: {},
    };
    const res = new Response();
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");
    const next = jest.fn();
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(statusSpy).toHaveBeenCalledWith(401);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: "Unauthenticated.",
    });
  });
});
