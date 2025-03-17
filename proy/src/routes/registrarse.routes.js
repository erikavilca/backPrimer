import passport from "passport";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/password.utils.js";
import { userModel } from "../models/user.models.js";
import { Router } from "express";
import { verifLogin, Register } from "../controllers/user.controllers.js";
const userRouter = Router();

// Muestra el formulario de registro
userRouter.get("/login", verifLogin)

userRouter.post("/register", Register )

userRouter.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    if (req.user) {
      res.render("profile", { usuario: req.user.usuario });
    } else {
      res.send("No estas autorizado pequeño saltamontes!");
    }
  }
);

userRouter.get(
  "/admin",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    if (req.user.rol !== "admin") {
      return res.status(403).send("Acceso Denegado maldito Hacker! mORIRAS!!!");
    }

    res.render("admin");
  }
);

export default userRouter;
