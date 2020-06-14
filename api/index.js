"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const accountGlobalRoutes = require("./routes/global/accountRoutes");
const projectGlobalRoutes = require("./routes/global/projectRoutes");
const ticketGlobalRoutes = require("./routes/global/ticketRoutes");
const projectAdminRoutes = require("./routes/admin/projectRoutes");
const ticketAdminRoutes = require("./routes/admin/ticketRoutes");
const personnelAdminRoutes = require("./routes/admin/personnelRoutes");
const projectDeveloperRoutes = require("./routes/developer/projectRoutes");
const ticketDeveloperRoutes = require("./routes/developer/ticketRoutes");
const projectManagerRoutes = require("./routes/manager/projectRoutes");
const ticketManagerRoutes = require("./routes/manager/ticketRoutes");
const projectSubmitterRoutes = require("./routes/submitter/projectRoutes");
const ticketSubmitterRoutes = require("./routes/submitter/ticketRoutes");
const authRoutes = require("./routes/auth/authRoutes");

let port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected to db"));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin/project", projectAdminRoutes);
app.use("/api/admin/ticket", ticketAdminRoutes);
app.use("/api/admin/personnel", personnelAdminRoutes);
app.use("/api/developer/project", projectDeveloperRoutes);
app.use("/api/developer/ticket", ticketDeveloperRoutes);
app.use("/api/submitter/project", projectSubmitterRoutes);
app.use("/api/submitter/ticket", ticketSubmitterRoutes);
app.use("/api/manager/project", projectManagerRoutes);
app.use("/api/manager/ticket", ticketManagerRoutes);
app.use("/api/global/account", accountGlobalRoutes);
app.use("/api/global/project", projectGlobalRoutes);
app.use("/api/global/ticket", ticketGlobalRoutes);

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('../BugTracker/build'));
}

app.listen(port, () => console.log("server Up and running: " + port));
