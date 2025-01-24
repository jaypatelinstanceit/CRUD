const express = require('express'); 
const { signup, login, updatePassword, get, deleteuser } = require('./API/authController');
// Import the protect middleware
const { protect } = require('./middlewares/authMiddleware');
//brcypt
const bcrypt = require('bcrypt');
const router = express.Router(); // Create a new router
// const authController = require('../controllers/authController');

router.post('/login', login); // User login 
router.put('/user', protect, updatePassword);
router.post('/user', signup); // User signup 
router.delete('/user', protect, deleteuser);
router.get('/users', get); // Get all users (admin only)

// Use the protect middleware to protect the route
router.get('/protected', protect, (req, res) => {
    res.status(200).json({
        message: 'Protected route accessed successfully',
        user: req.user.username,
    });
});

// Export the router
module.exports = router;

// router.post('/signup', signup);

// router.delete('/user', deleteuser); // Delete user


// router.post('/update-password', updatePassword); 
// router.post('/users', get);
// router.delete('/users/:id', delete);
// router.put('/user', updatePassword); // Update password

// Protected delete user route
// Protected delete user route
// router.delete('/userp', protect, async (req, res, next) => {
//     try {
//         console.log('Authenticated user:', req.user); // Debug log
//         const { password } = req.body;

//         if (!password) {
//             return res.status(400).json({ message: 'Password is required' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, req.user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid password' });
//         }

//         await User.deleteOne({ _id: req.user._id });
//         res.status(200).json({ message: 'Your account has been successfully deleted' });
//     } catch (err) {
//         console.error('Error deleting user:', err);
//         next(err);
//     }
// });



