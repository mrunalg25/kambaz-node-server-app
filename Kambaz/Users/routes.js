import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  // Signup
  const signup = async (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  // Signin
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  // Signout
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // Profile
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // Update user
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  // Find courses for enrolled user
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  // ADD THESE THREE NEW FUNCTIONS:
  const findAllUsers = (req, res) => {
    const { role, name } = req.query;
    
    // Filter by role if provided
    if (role) {
      const users = dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    
    // Filter by name if provided
    if (name) {
      const users = dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    
    // Otherwise return all users
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const userId = req.params.userId;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  };

  const deleteUser = (req, res) => {
    const userId = req.params.userId;
    dao.deleteUser(userId);
    res.sendStatus(204);
  };

  // Routes
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  // ADD THESE THREE NEW ROUTES:
  app.get("/api/users", findAllUsers); // Supports ?role=STUDENT or ?name=john
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
}