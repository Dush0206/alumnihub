const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, "YOUR_SECRET_KEY"); // Verify JWT
        req.user = decoded; // Store user data in req.user
        next(); // Proceed
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = checkAuth;
