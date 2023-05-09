const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const authMiddleware = require("./middleware/auth");
const errorHandlerMiddleware = require("./middleware/errorMiddleware");
const notFound = require("./middleware/notFound");
const connectDB = require("./db/connectDB");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use("/api/v1", require("./routes/User"));
// app.use("/api/v1/patient", require("./routes/Patient"));
// app.use("/api/v1/doctor", require("./routes/Doctor"));
// app.use("/api/v1/admin", require("./routes/Admin"));
// app.use("/api/v1/room", require("./routes/Room"));
// app.use("/api/v1/carrier", require("./routes/Carrier"));
// app.use("/api/v1/bill", require("./routes/Bill"));
// app.use("/api/v1/treatement", require("./routes/Treatement"));
app.use("/api/v1", require("./routes/User"));
app.use("/api/v1/patient", authMiddleware, require("./routes/Patient"));
app.use("/api/v1/doctor", require("./routes/Doctor"));
app.use("/api/v1/admin", authMiddleware, require("./routes/Admin"));
app.use("/api/v1/room", authMiddleware, require("./routes/Room"));
app.use("/api/v1/carrier", authMiddleware, require("./routes/Carrier"));
app.use("/api/v1/bill", authMiddleware, require("./routes/Bill"));
app.use("/api/v1/treatement", authMiddleware, require("./routes/Treatement"));
app.use(notFound);
app.use(errorHandlerMiddleware);
const startServer = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    throw new Error(err);
  }
};

startServer();
