const passport = require("passport");
const { signToken } = require("../../utils/auth");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { signToken } = require("../../utils/auth");

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        const token = signToken(user);

        res.status(201).json({
            token,
            user,
        });
    } catch (error) {
        res.status(400).json({
            message: "User registration failed",
            error: error.message,
        });
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = signToken(user);

        res.json({
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
});

router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "/login",
    }),
    (req, res) => {
        const token = signToken(req.user);
        res.redirect(`http://localhost:3000?token=${token}`);
    }
);


module.exports = router;