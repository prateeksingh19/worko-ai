const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
require("dotenv").config();
const mongoUri = process.env.MONGODB_URL;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  age: Number,
  city: String,
  zipcode: Number,
  isDeleted: { type: Boolean, default: false },
});

UserSchema.plugin(AutoIncrement, { inc_field: "id" });

const User = mongoose.model("User", UserSchema);

module.exports = User;
