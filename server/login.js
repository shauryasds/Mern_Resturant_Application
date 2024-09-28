const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('path_to_user_model'); // Ensure you import your User model
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Use environment variable for the secret key

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' });

        // Create JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });

        // Set the cookie header manually
        res.setHeader('Set-Cookie', `user=${token}; Secure; HttpOnly; SameSite=None; Domain=frontend-restaurant.vercel.app; Path=/d; Max-Age=3600`);
res.cookie('user', token, {
  secure: true,
  sameSite: 'None',
  domain: 'frontend-restaurant.vercel.app', // or 'localhost' for local testing
  path: '/d',
  maxAge: 3600,
  httpOnly: true
});
        // Send response
        res.status(200).json({ success: true, message: "Logged in", body: user, error: false });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', error: true });
    }
}

module.exports = login; // Ensure you export the function for use in your routes
