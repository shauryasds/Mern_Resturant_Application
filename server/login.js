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
      res.status(200).setHeader('Set-Cookie', `user=${token}; Secure; SameSite="None"; Domain=frontend-resturant.vercel.app; Path=/;  Max-Age=3600000`).json({ success: true, message: "logged in", body: user, error: false });  } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
