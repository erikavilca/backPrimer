import dotenv from "dotenv"
dotenv.config()

export default { secret_key: process.env.SECRET_KEY }