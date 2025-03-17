export const verifLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    if (!isValidPassword(password, email)) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    //Generar el token:
    const token = jwt.sign(
      { usuario: user.email, rol: user.rol },
      "coderhouse",
      { expiresIn: "1h" }
    );
    res.status(200).render("templates/login");
    // res.cookie("coderCookieToken", token, { httpOnly: true, maxAge: 3600000 });
    // res.redirect("/api/sessions/current");
  } catch (error) {
    console.error("Error al hacer login", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const Register = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const nuevoCarrito = await manager.crearCarrito();

    const user = new userModel({
      usuario,
      password: createHash(password),
      cart: nuevoCarrito._id,
    });

    // await user.save();
    res.status(200).render("templates/registrarse");
    // res.redirect("/login");
  } catch (error) {
    console.error("Error al registrar usuario", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
