const { Router } = require("express");
const User = require("../db");
const {
  validateEmail,
  validateZipCode,
  validateId,
} = require("../middleware/validationMiddleware");
const { generateToken, verifyToken } = require("../middleware/authentication");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await User.find({ isDeleted: false });
    res.json({ users: response });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
router.get("/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find({ id, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

router.post("/", validateEmail, validateZipCode, async (req, res) => {
  try {
    const { email, name, age, city, zipcode } = req.body;
    const existingUser = await User.findOne({
      email,
      name,
      isDeleted: false,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, name, age, city, zipcode });
    const token = generateToken({ email, name, age });

    await user.save();
    res.status(201).json({ message: "User created", token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.put(
  "/:id",
  verifyToken,
  validateId,
  validateEmail,
  validateZipCode,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await User.findOneAndUpdate({ id: id }, userData, {
        new: true,
        overwrite: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }
);

router.patch("/:id", verifyToken, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { id: id },
      { $set: userData },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

router.delete("/:id", verifyToken, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User soft deleted", user });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting user", error });
  }
});

module.exports = router;
