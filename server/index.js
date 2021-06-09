const express = require('express');
const mongoose = require("mongoose");
const docRouter = require("./routes/doctorRoutes");
const adminRouter = require("./routes/adminRoutes");
const deptRouter = require("./routes/deptRoutes");
const app = express();
const cors = require("cors");
const PORT = 4000;
app.use(cors());
app.use(express.json())
app.use("/doctor", docRouter);
app.use("/admin", adminRouter);
app.use("/dept", deptRouter);
const mongoDB = "mongodb://localhost/HMS"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
app.get("/", function (req, res) {
    res.send("Hello world");
})
app.listen(PORT, () => { console.log(`Server running on ${PORT}`) });
