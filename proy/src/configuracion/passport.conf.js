import passport from "passport"
import JWT from "passport-jwt"

const JWTStrategy = JWT.Strategy
const EstractJWT = JWT.ExtractJwt

const inicializePassport = ()=>{
    passport.use("jwt", new JWTStrategy({
       jwtFromRequest: EstractJWT.fromExtractors([cookieExtractor]),
       secretOrKey: "Contraseña"
    }, async(JWT_paylood , done) =>{
        try{
            return done (null, JWT_paylood)
        }catch(e){
            return done(e)
        }
    }
))}

const cookieExtractor= (req, res)=>{
    let token = null 
    if(req && req.cookies){
        token = req.cookies["coderCookieToken"]
    }
    return token 
}

export default inicializePassport