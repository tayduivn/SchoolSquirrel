import { Router } from "express";
import auth from "./auth";
import users from "./users";
import admin from "./admin";
import courses from "./courses";
import assignments from "./assignments";

const routes = Router();

routes.use("/admin", admin);
routes.use("/assignments", assignments);
routes.use("/auth", auth);
routes.use("/users", users);
routes.use("/courses", courses);

export default routes;
