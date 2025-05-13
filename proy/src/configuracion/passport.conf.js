import passport from "passport";
import JWT from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

const JWTStrategy = JWT.Strategy;
const EstractJWT = JWT.ExtractJwt;

//para que se valide la contraseña del token cuando se crea tiene que coinsidir con el secretOrKey que esta aca.
export const inicializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: EstractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (JWT_paylood, done) => {
        try {
          return done(null, JWT_paylood);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
};

const cookieExtractor = (req, res) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["tokenUsers"];
  }
  return token;
};
