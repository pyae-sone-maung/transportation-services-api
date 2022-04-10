const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer")
        return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        else next();
    });
};

module.exports = { auth };
