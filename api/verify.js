import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const verifyToken = (req, res, next) => {
    let token = req.cookies.access_token
    if(req.headers.token){
        token = req.headers.token
    }
    if(!token){
        res.status(401).send("You are not authenticated")
    }
    jwt.verify(token, process.env.JWT, (err, decodedToken) => {
        if(err){
            res.status(401).json("Token is not verified")
        }
        req.user = decodedToken
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if(req.user.id === req.params.id || req.user.isAdmin === true){
            next()
        }
        else{
            res.status(401).send('You are not the authenticated user')
        }
    })
}

const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, () => {
        if(req.user.isAdmin === true){
            next()
        }
        else{
            res.status(401).send("You are not the admin")
        }
    })
}
export { verifyUser, verifyAdmin, verifyToken }