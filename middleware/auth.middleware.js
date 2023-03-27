const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        const decoded = jwt.verify(token, "Evaluation")
        if (decoded) {
            console.log(decoded.userID)
            req.body.userID = decoded.userID
            next()
        } else {
            res.status(400).send("Please login first")
        }
    } else {
        res.status(400).send("Please login first")
    }
}


module.exports = {
    auth
}