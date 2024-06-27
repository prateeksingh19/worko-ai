const User = require("../db/index");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB_URL;
describe("User Model", () => {
  beforeAll(async () => {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a new user", async () => {
    const userData = { email: "test@example.com", name: "Test User" };
    const newUser = await User.create(userData);
    expect(newUser.email).toBe(userData.email);
    expect(newUser.name).toBe(userData.name);
  });

  it("should fetch all users", async () => {
    const users = await User.find({});
    expect(users).toHaveLength(1);
  });

  it("should update a user", async () => {
    const existingUser = await User.findOne({ email: "test@example.com" });
    const newName = "Updated Test User";
    existingUser.name = newName;
    await existingUser.save();
    const updatedUser = await User.findOne({ email: "test@example.com" });
    expect(updatedUser.name).toBe(newName);
  });

  it("should delete a user", async () => {
    const existingUser = await User.findOneAndDelete({
      email: "test@example.com",
    });
    expect(existingUser).toBeTruthy();
    const deletedUser = await User.findOne({ email: "test@example.com" });
    expect(deletedUser).toBeNull();
  });
});
