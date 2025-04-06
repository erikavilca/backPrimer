//Formacion de la contraeña...

import bcrypt from "bcrypt";

//con CreateHAsh lo que hacemos en que la contraseña sea oculta para todis, osea que le agrega codigo para cubrir
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(5)); //greDalSync() indica la cantidad de carateres omitidos.

//Aca pasamos por parametros la contraseña y el usuario para verificar que sean la constraseña que se ingreso por input y lña que tiene el usuario.

export const isValidPassword = (password, hashedPassword) =>{
    const match = bcrypt.compareSync(password, hashedPassword);
    return match
}
