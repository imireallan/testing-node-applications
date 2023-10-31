import loginValidator from "@validators/login";
import Response from "@tests/utils/response"

describe("The login validator", () => {
  it("Should call the next function when validation succeeds", async () => {
    const req = {
      body: {
        email: "a@gmail.com",
        password: "pass@word1",
      },
    };
    const res = new Response()
    const next = jest.fn();

    await loginValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });
  it("Should return 422 when validation fails", async () => {

    const req = {
      body: {
        password: "pass@word1",
      },
    };

    const next = jest.fn();
    const res = new Response();
    const statusSpy = jest.spyOn(res, "status");
    const jsonSpy = jest.spyOn(res, "json");

    await loginValidator(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(422);
    expect(jsonSpy).toHaveBeenCalledWith({
      message: "Validation failed.",
      data: {
        errors: {
          email: "email is a required field",
        },
      },
    });
  });
});
