import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";

const app = express();

// CORS - Must be FIRST
app.use(
cors({
credentials: true,
origin: process.env.CLIENT_URL || "http://localhost:3000",
})
);

// Session - Must be SECOND
const sessionOptions = {
secret: process.env.SESSION_SECRET || "kambaz",
resave: false,
saveUninitialized: false,
};

if (process.env.SERVER_ENV === "production") {
sessionOptions.proxy = true;
sessionOptions.cookie = {
sameSite: "none",
secure: true,
};
}

app.use(session(sessionOptions));

// JSON Parser - Must be THIRD
app.use(express.json());

// Test root route
app.get("/", (req, res) => {
res.send("Welcome to Kambaz API Server!");
});

// Routes - Must be LAST
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import session from "express-session";
// import Lab5 from "./Lab5/index.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// import ModuleRoutes from "./Kambaz/Modules/routes.js";
// import AssignmentRoutes from "./Kambaz/Assignments/routes.js";

// const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//   })
// );

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "kambaz",
//   resave: false,
//   saveUninitialized: false,
// };

// if (process.env.SERVER_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//     domain: process.env.SERVER_URL,
//   };
// }

// app.use(session(sessionOptions));
// app.use(express.json());

// UserRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// Lab5(app);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // import "dotenv/config";
// // import express from "express";
// // import cors from "cors";
// // import session from "express-session";
// // import Lab5 from "./Lab5/index.js";
// // import UserRoutes from "./Kambaz/Users/routes.js";

// // const app = express();

// // // Configure CORS with credentials
// // app.use(
// //   cors({
// //     credentials: true,
// //     origin: process.env.CLIENT_URL || "http://localhost:3000",
// //   })
// // );

// // // Configure sessions
// // const sessionOptions = {
// //   secret: process.env.SESSION_SECRET || "kambaz",
// //   resave: false,
// //   saveUninitialized: false,
// // };

// // if (process.env.SERVER_ENV !== "development") {
// //   sessionOptions.proxy = true;
// //   sessionOptions.cookie = {
// //     sameSite: "none",
// //     secure: true,
// //     domain: process.env.SERVER_URL,
// //   };
// // }

// // app.use(session(sessionOptions));
// // app.use(express.json());

// // // Register routes
// // UserRoutes(app);
// // Lab5(app);

// // const PORT = process.env.PORT || 4000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import session from "express-session";
// import Lab5 from "./Lab5/index.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// import ModuleRoutes from "./Kambaz/Modules/routes.js";

// const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//   })
// );

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "kambaz",
//   resave: false,
//   saveUninitialized: false,
// };

// if (process.env.SERVER_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//     domain: process.env.SERVER_URL,
//   };
// }

// app.use(session(sessionOptions));
// app.use(express.json());

// UserRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
// Lab5(app);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });