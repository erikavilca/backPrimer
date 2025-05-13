import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";

class UserController {
  async register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;
    try {
      const users = await userService.registerUser({
        first_name,
        last_name,
        email,
        age,
        password,
      });

      //Token pero hecho por capas porque se me hace mas comprensible.
      const payload = {
        usuario: users.first_name,
        email: users.email,
        role: users.role,
      };
      const ContraseñaTokenSecreta = process.env.JWT_SECRET;
      const TimeExpire = { expiresIn: "1h" };

      const token = jwt.sign(payload, ContraseñaTokenSecreta, TimeExpire);
      res.cookie("tokenUsers", token, { maxAge: 360000, httpOnly: true });

      res.redirect("/login");
    } catch (error) {
      res.status(500).send("Tenes un" + error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const newuser = await userService.loginUser(email, password);

      //Token pero hecho por capas porque se me hace mas comprensible.
      const payload = {
        usuario: `${newuser.first_name} ${newuser.last_name}`,
        email: newuser.email,
        role: newuser.role,
      };
      const ContraseñaTokenSecreta = process.env.JWT_SECRET;
      const TimeExpire = { expiresIn: "1h" };
      const token = jwt.sign(payload, ContraseñaTokenSecreta, TimeExpire);

      res.cookie("tokenUsers", token, { maxAge: 360000, httpOnly: true });

      res.redirect("/api/sessions/inicio")

    } catch (error) {
      res.status(500).send("Tenes un " + error);
    }
  }
  

    async inicio(req, res) {
      const user = req.user; 
      res.render("home", { user }); 
    }
  

  async logout(req, res) {
    res.clearCookie("tokenUsers");
    res.redirect("/login");
  }

}
export default UserController;
