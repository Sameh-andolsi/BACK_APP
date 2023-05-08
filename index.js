const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api", require("./routes/user"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Is Down");
  }

  console.log(`Server I Srunning on PORT ${PORT} `);
});
connectDB();
