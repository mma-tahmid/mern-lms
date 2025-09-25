require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const userApi = require("./src/routes/usersApi");

const app = express();

// 1. Security Middleware
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// 2. Body Parser MUST come BEFORE mongoSanitize
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// no need for bodyParser.json() since express.json() handles it

app.use(cookieParser());

app.use(mongoSanitize())

// 4. Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);

// 5. Connect DB
const OPTION = { autoIndex: true };
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, OPTION);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed", error);
    }
};
connectDB();

// 6. Routes
const baseUrl = process.env.BASE_URL;
app.use(`${baseUrl}/user-auth`, userApi);

// 7. 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Route ${req.originalUrl} not found`,
    });
});

module.exports = app;





// require("dotenv").config();


// const userApi = require("./src/routes/usersApi")
// // const tasksApi = require("./src/routes/taskApi")



// const express = require("express");

// // object Creation of express

// const app = new express();
// const bodyParser = require("body-parser");


// // 2. Security Middleware IMPORT (Security related packages)

// const rateLimit = require("express-rate-limit")
// const helmet = require('helmet')
// const mongoSanitize = require("express-mongo-sanitize")
// const cors = require("cors")

// // 3. DataBase Lib Import
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");



// // 4. Security Middleware IMPLEMENT (Security related packages)

// app.use(cors());

// //app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// // app.use(mongoSanitize())

// app.use(cookieParser());

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }))



// // 5. body parsar Implement
// app.use(bodyParser.json());


// app.use(mongoSanitize())

// // 6. Request Rate Limiting

// const limiter = rateLimit({

//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)

// })

// app.use(limiter);


// let OPTION = { autoIndex: true };



// const connectDB = async () => {
//     try {
//         const res = await mongoose.connect(process.env.DATABASE_URI, OPTION);
//         console.log("MongoDB Connected Successfully");
//     } catch (error) {
//         console.error("MongoDB Connection Failed", error);
//     }
// };

// connectDB();


// // 9. Backend Routing Implement

// //app.use("/api/v1", router) // base url api (api/v1)



// const baseUrl = process.env.BASE_URL

// app.use(`${baseUrl}/user-auth`, userApi);
// // app.use(`${baseUrl}/tasks`, tasksApi);




// //undefined Route
// // app.use("*", (req, res) => {
// //     res.status(404).json({
// //         "status": "Fail",
// //         "data": "Not FOUND"
// //     })
// // })

// // Express Updated Version

// app.use((req, res, next) => {
//     res.status(404).json({
//         status: "fail",
//         message: `Route ${req.originalUrl} not found`,
//     });
// });

// module.exports = app; 