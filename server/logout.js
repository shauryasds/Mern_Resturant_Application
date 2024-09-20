function logout(req, res) {
    if (req.user) {
        // Clear the cookie
        res.cookie('user', '')
        .status(200)
        .json({ success: true, error: false, message: "Logged out successfully" });
    } else {
        res.status(400).json({ success: false, error: true, message: "No user to log out" });
    }
}

module.exports = logout;
