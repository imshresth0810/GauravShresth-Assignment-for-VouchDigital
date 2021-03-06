const jwt = require('jsonwebtoken');
const jwtsecret = "vouchdigital";

const fetchuser = (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        return res.status(401).json({ error: "Enter the Valid Uthentication-----" });
    }
    try {
        const data = jwt.verify(token, jwtsecret);
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Enter the Valid Uthentication++++" });
    }
}

module.exports = fetchuser;