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
        const token = await jwt.sign({ data: user }, JWT_SECRET_KEY, { expiresIn: '1h' });

        // Cache the token
       

        // Send the token to the client
     res.cookie('user', token, {
  secure: true,
  sameSite: 'None',
  domain: 'frontend-resturant.vercel.app',
  path: '/',
  maxAge: 3600000
}).status(200).json({ success: true, message: "logged in", body: user, error: false });  console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
