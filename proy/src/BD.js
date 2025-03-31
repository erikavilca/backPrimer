import mongoose  from "mongoose";

mongoose.connect(
    "mongodb+srv://erick:Galeno11@cluster0.zf3t4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("BDD conectado"))
  .catch((e) => console.log("error al conectar BDD:", e));
