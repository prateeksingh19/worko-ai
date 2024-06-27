const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require("../middleware/authentication");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
// Mock JWT_SECRET for testing purposes

describe("Authentication Middleware", () => {
  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      // Define payload
      const payload = { userId: "123", username: "testuser" };

      // Generate token
      const token = generateToken(payload);

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Assertions
      expect(token).toBeDefined();
      expect(decoded.userId).toBe("123");
      expect(decoded.username).toBe("testuser");
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid JWT token", () => {
      // Generate a valid token
      const token = jwt.sign(
        { userId: "123", username: "testuser" },
        JWT_SECRET
      );

      // Mock req and res objects
      const req = {
        headers: {
          authorization: `${token}`,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock next function
      const next = jest.fn();

      // Call verifyToken
      verifyToken(req, res, next);

      // Assertions
      expect(req.user).toBeDefined();
      expect(req.user.userId).toBe("123");
      expect(req.user.username).toBe("testuser");
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should handle missing token", () => {
      // Mock req and res objects
      const req = {
        headers: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock next function
      const next = jest.fn();

      // Call verifyToken
      verifyToken(req, res, next);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unauthorized: No token provided",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should handle invalid token", () => {
      // Invalid token (random string)
      const invalidToken = "invalid_token";

      // Mock req and res objects
      const req = {
        headers: {
          authorization: `Bearer ${invalidToken}`,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock next function
      const next = jest.fn();

      // Call verifyToken
      verifyToken(req, res, next);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unauthorized: Invalid token",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
