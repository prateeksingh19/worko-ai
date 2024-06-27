const {
  validateEmail,
  validateZipCode,
  validateId,
} = require("../middleware/validationMiddleware");
const Joi = require("joi");

describe("Validation Middleware", () => {
  it("should validate email correctly", () => {
    const req = { body: { email: "test@example.com" } };
    const res = {};
    const next = jest.fn(); // Mock next function

    validateEmail(req, res, next);

    expect(next).toHaveBeenCalled(); // Expect next to have been called
    expect(next).not.toHaveBeenCalledWith(expect.any(Error)); // Should not call with an error
  });

  it("should handle invalid email", () => {
    const req = { body: { email: "invalidemail" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validateEmail(req, res, next);

    expect(next).not.toHaveBeenCalled(); // Expect next() not to have been called
    expect(res.status).toHaveBeenCalledWith(400); // Expect res.status() to have been called with 400
    expect(res.json).toHaveBeenCalled(); // Expect res.json() to have been called
  });

  it("should validate zip code correctly", () => {
    const req = { body: { zipcode: 12345 } };
    const res = {};
    const next = jest.fn(); // Mock next function

    validateZipCode(req, res, next);

    expect(next).toHaveBeenCalled(); // Expect next to have been called
    expect(next).not.toHaveBeenCalledWith(expect.any(Error)); // Should not call with an error
  });

  it("should handle invalid zip code", () => {
    const req = { body: { zipcode: "notanumber" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn(); // Mock next function

    validateZipCode(req, res, next);

    expect(next).not.toHaveBeenCalled(); // Expect next() not to have been called
    expect(res.status).toHaveBeenCalledWith(400); // Expect res.status() to have been called with 400
    expect(res.json).toHaveBeenCalled(); // Expect next to be called with an error
  });
});
