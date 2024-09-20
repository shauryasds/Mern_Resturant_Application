const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/UserModel');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
        res.status(200).cookie('user',token).json({success:true,message:"logged in",body:user,error:false});

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports =  login ;
