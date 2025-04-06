import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";

class UserController {
  async register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;

    try {
      const nuevoUsuario = await userService.registerUser({
        first_name,
        last_name,
        email,
        age,
        password,
      });

      // const token = jwt.sign({
      //     usuario: `${nuevoUsuario.first_name} ${nuevoUsuario.last_name}`,
      //     email: nuevoUsuario.email,
      //     role: nuevoUsuario.role
      // }, "coderhouse", { expiresIn: "1h" });

      res.cookie("cookie", { maxAge: 360000, httpOnly: true });
      res.redirect("/api/sessions/logout");
    } catch (error) {
      res.status(500).send("Tenes un" + error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
    const user = await userService.loginUser(email, password);
    console.log(user);

    const token = jwt.sign(
        {
        usuario: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
        },
        "coderhouse",
        { expiresIn: "1h" }
    );

    res.cookie("cookie", token, {
        maxAge: 360000,
        httpOnly: true,
    });

    res.render("home" ,{user});

    } catch (error) {
        res.status(500).send("Tenes un " + error);
    }
    }

  //no llegua hasta aca, creo que es porque no llega el token a la parte de inciio para verificar

    // async inicio (req, res) {
    // if (req.user) {
    //   const user = req.user;
    //   res.render("home", { user });
    // } else {
    //   res.send("No esta autoorizado");
    // }
    // }

    async logout(req, res) {
    res.clearCookie("cookie");
    res.render("login");
    }
}

export default UserController;
