import { Router } from 'express';
import passport from 'passport';
const router = Router();

//Importamos el controlador:
import UserController from "../controllers/user.controllers.js"
const userController = new UserController();


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/inicio", passport.authenticate("jwt", { session: false }), userController.inicio)
router.post("/logout", userController.logout);


export default router;