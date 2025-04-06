//Importamos el repository:
import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/password.utils.js";

class UserService {
  async registerUser(userData) {
    const existeUsuario = await userRepository.getUserByEmail(userData.email);

    if (existeUsuario) throw new Error("Un usuario ya esta registrado con esta email. Ingresa a Login");

    userData.password = createHash(userData.password);
    return await userRepository.createUser(userData);
  }

  async loginUser(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error("Usuario no encontrado. Primero registrate y despues ingresa");
    }
    if(!isValidPassword (password, user.password)){
        throw new Error("La contraseña es incorrecta!");
    }

    return user;
}}

export default new UserService();
