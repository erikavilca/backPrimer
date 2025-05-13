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
        usuario: newuser.first_name,
        email: newuser.email,
        role: newuser.role,
      };
      const ContraseñaTokenSecreta = process.env.JWT_SECRET;
      const TimeExpire = { expiresIn: "1h" };
      const token = jwt.sign(payload, ContraseñaTokenSecreta, TimeExpire);

      res.cookie("tokenUsers", token, { maxAge: 360000, httpOnly: true });
      res.render("home", { newuser });

    } catch (error) {
      res.status(500).send("Tenes un " + error);
    }
  }

  //no llegua hasta aca, creo que es porque no llega el token a la parte de inciio para verificar

  async inicio(req, res) {
    const user = req.newuser; // ← esto lo convierte a objeto plano
console.log(user)
    if (user) {
      res.render("home", { user });
    } else {
      res.send("No esta autoorizado");
    }
  }
}

export default UserController;
