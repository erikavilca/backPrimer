import passport from "passport"
import JWT from "passport-jwt"

const JWTStrategy = JWT.Strategy
const EstractJWT = JWT.ExtractJwt

const inicializePassport = ()=>{
    passport.use("current", new JWTStrategy({
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
    if(req && req.cookie){
        token = req.cookie["coderCookieToken"]
    }
    return token 
}

export default inicializePassport