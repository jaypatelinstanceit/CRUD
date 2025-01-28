const User = require('../models/userModel');
const bcrypt = require('bcrypt');
// const { getJWT } = require('../config/jwt');
const { executeData, getJWT } = require('../config/DB'); // Import the centralized CRUD method
import { IISMethods } from '../config/init';    // Import the IISMethods class


// Create: User Signup
exports.signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const unqkey = IISMethods.generateuuid();
        const uid = req.headers.uid;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        if (username.toLowerCase().startsWith("admin")) {
            return res.status(400).json({ message: 'Username cannot start with "admin"' });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const response = await executeData('i', User, { username, password });
        res.status(201).json({ message: 'User registered successfully', user: response.data.username });
    } catch (err) {
        next(err);
    }
};

// Read: Get all User Data in the Database if user is an admin
exports.get = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Ensure the username starts with "admin"
        if (!username.toLowerCase().startsWith("admin")) {
            return res.status(401).json({ message: 'Unauthorized: Admin access required' });
        }

        // Fetch the admin user for authentication
        const adminResponse = await executeData('r', User, {
            query: { username },
            fields: '+password' // Include password for validation purposes only (not returned in response)
        });

        // Check if admin user exists
        if (adminResponse.data.length === 0) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        const admin = adminResponse.data[0]; // Get the admin user object

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Fetch all user data (excluding passwords)
        const allUsersResponse = await executeData('r', User, {
            query: {},
            fields: '-password' // Exclude passwords from response
        });

        res.status(200).json({ message: 'Users fetched successfully', users: allUsersResponse.data });
    } catch (err) {
        next(err);
    }
};




// Update: Update Password
exports.updatePassword = async (req, res, next) => {
    try {
        const { username, oldPassword, newPassword } = req.body;
        const authenticatedUser = req.user;

        if (!username || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Username, old password, and new password are required' });
        }

        if (authenticatedUser.username !== username) {
            return res.status(401).json({ message: 'Unauthorized: Username does not match the authenticated user' });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, authenticatedUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid old password' });
        }

        const response = await executeData('u', User, { _id: authenticatedUser._id, password: await bcrypt.hash(newPassword, 10) });
        res.status(200).json({ message: 'Password updated successfully', user: response.data.username });
    } catch (err) {
        next(err);
    }
};

// Delete: Delete Account
exports.deleteuser = async (req, res, next) => {
    try {
        const authenticatedUser = req.user;

        if (!authenticatedUser) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const response = await executeData('d', User, { _id: authenticatedUser._id });
        res.status(200).json({ message: 'Account deleted successfully', user: response.data});
    } catch (err) {
        next(err);
    }
};

// Login: User Login
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Fetch user data using the 'r' (Read) operation
        const response = await executeData('r', User, {
            query: { username },
            fields: '+password' // Include password for login validation
        });

        // Check if user exists
        if (response.data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = response.data[0]; // Retrieve the first user (unique username assumed)

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = getJWT(user._id.toString());

        // Respond with the token and user details
        res.status(200).json({
            message: 'Login successful',
            token,
            username: user.username,
        });
    } catch (err) {
        next(err);
    }
};

// // Centralized CRUD method
// const executeData = async (operation, ObjModel, data, insertlog = false, dependency = []) => {
//     try {
//         switch (operation) {
//             case 'i': // Insert
//                 if (insertlog) {
//                     console.log('Inserting data with log enabled');
//                 }
//                 const newRecord = new ObjModel(data);
//                 await newRecord.validateSync();
//                 await newRecord.save();
//                 return { message: 'Insert operation successful', data: newRecord };

//             case 'u': // Update
//             if (!data._id) {
//                 throw new Error('Missing ID for update operation');
//             }
            
//             const updatedRecord = await ObjModel.findByIdAndUpdate(
//                 data._id,
//                 data,
//                 { runValidators: true, new: true }
//             );
            
//                 return { message: 'Update operation successful', data: updatedRecord };

//             case 'd': // Delete
//                 if (dependency.length > 0) {
//                     for (const dep of dependency) {
//                         const dependentData = await dep.ObjModel.find(dep.criteria);
//                         if (dependentData.length > 0) {
//                             throw new Error('Delete operation failed due to dependencies.');
//                         }
//                     }
//                 }
//                 await ObjModel.findByIdAndDelete(data);
//                 return { message: 'Delete operation successful' };

//             case 'r': // Read
//                 const records = await ObjModel.find(data.query, data.fields);
//                 return { message: 'Read operation successful', data: records };

//             default:
//                 throw new Error('Invalid operation type');
//         }
//     } catch (err) {
//         throw new Error(`Error in CRUD operation: ${err.message}`);
//     }
// };


        // const response = await executeData('r', User, {
        //     query: { username },
        //     fields: '-password' // Exclude password from response
        // });

//         if (response.data.length === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: response.message, user: response.data[0] });
//     } catch (err) {
//         next(err);
//     }
// };
