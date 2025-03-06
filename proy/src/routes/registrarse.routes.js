import { Router } from "express";
const userRouter = Router();

userRouter.get("/templates/login", (req, res) => {
  res.status(200).render("/templates/user", { js: "login.js", css: "login.css" });
});

export default userRouter;
