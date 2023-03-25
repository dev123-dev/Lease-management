const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
//const path = require('path');
const app = express();
// const cronjob = require("../Lease-management/cronjob/index");
const cronjob = require("./cronjob");
//server
app.use(cors());
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./server/routes/api/user"));
app.use("/api/auth", require("./server/routes/api/auth"));
app.use("/api/tenants", require("./server/routes/api/tenants"));
app.use("/api/tenantSetting", require("./server/routes/api/tenantSetting.api"));

// Set static folder for client build Serve static assets in production
//app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5433;

// step 3: Heroku

// while adding below colde for deployment
//  "proxy": "http://localhost:5433"
//  this above code removed from client>package.json last line

// Inside main package.json we removed this below code and placed other script code
//  "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node server",
//     "server": "nodemon server ",
//     "client": "npm start --prefix client",
//     "dev": "concurrently \"npm run server\" \"npm run client\" "
//   },
// if (process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
//     // const path = require("path");
//     // app.get("*", (req, res) => {
//     //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     // })
// }

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
