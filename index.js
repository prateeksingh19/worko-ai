const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/user");

app.use(bodyParser.json());

app.use("/worko/user", userRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
