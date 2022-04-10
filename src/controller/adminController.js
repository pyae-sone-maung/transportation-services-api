const jwt = require("jsonwebtoken");

const adminLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).json({ Token: token });
    } else {
        return res
            .status(401)
            .json({ error: "email and password are not match." });
    }
};

module.exports = { adminLogin };
