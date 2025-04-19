const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


const authenticateToken = (req, res, next) => {


    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1]; //This gets token from "Bearer <token>"


    if(!token) {
        return res.status(401).json({ message: "Access Denied" })
    }

    jwt.verify(token, JWT_SECRET, (error, userData) => {


        if(error) {
            return res.status(403).json({ message: "Invalid or expired token" })
        }

        req.user = userData;
        next(); //next is used to continue to the next middleware

    })

}

module.exports = authenticateToken;
