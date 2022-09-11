const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("Hello World!");
});

app.use("/auth", require("./src/routes/auth"));
app.use("/feed", require("./src/routes/feed"));
