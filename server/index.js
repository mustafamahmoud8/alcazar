//Packages
require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./utils/googlePassport")
const session = require("express-session")
const cookieParser = require('cookie-parser');

//DB Connection
const DBConnect = require("./DB/connection");

//Routers
const publicRouter = require("./routes/public");
const authenticationRouter = require("./routes/authentication");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");


//Swagger
const swaggerUi = require('swagger-ui-express');
const specs = require("./swagger-config");

app.use(helmet());
app.use(cookieParser());
app.use(xss());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:4500",
    credentials: true
  })
);
app.use(passport.initialize())
app.use(passport.session())


//Routers
app.get("/", (req, res, next) => {
  const treasureMap = {
    message: "🗺️ Welcome to the AlCazar API! 🏴‍☠️",
    clues: [
      "🌴 Follow the path of 'api/' to start the journey.",
      "🦜 Look out for the 'X marks the spot' at each endpoint!",
      "⚓ More Furnitures await as you navigate the API seas!",
    ],
    disclaimer: "Remember, only true adventurers can unlock the secrets...",
    documentation: "/api-docs",
  };
  res.status(200).json(treasureMap);
});

app.use("/api", publicRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);


//swagger router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});


DBConnect.then(() => {
  console.log("Database is Connected Successfully!!");
  app.listen(port, console.log(`Server is running on Port ${port}`));
}).catch((err) => {
  console.log(err);
});


