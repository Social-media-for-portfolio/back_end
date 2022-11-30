const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const likeRoutes = require("./src/routes/likes");

//Middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  return res.status(200).json("Welcome to connect")
})
app.use("/auth", require("./src/routes/auth"));
app.use("/feed", require("./src/routes/feed"));
app.use("/users", require("./src/routes/users"));
app.use(likeRoutes);
