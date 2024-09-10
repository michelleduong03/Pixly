import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => { // protect certain routes/apis
    try {
        let token = req.header("Authorization"); // from req in frontend, grabbing auth header which is where token will be set in FE. grab through BE

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) { // take everything on right side
            token = token.slice(7, token.length).trimLeft(); // places token right after the "Bearer "
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next(); // proceed to the next step of the function

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}