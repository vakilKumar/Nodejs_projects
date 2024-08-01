



// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const users = require('../../models/userModel');

// const app = express();

// const findUsers = async () => {
//     try {
//       const user = await users.find();
//       console.log('Users :-------------- >>>>  ', user);
      
//     } catch (error) {
//       console.error('Error finding users:', error);
//     }
//   };
  
//   findUsers();



//  const signup = () => {
//   try {

//     app.post('/signup', async (req, res) => {
//       const { username, password, role } = req.body;

//       console.log({
//         username: username,
//         password: password,
//         role: role
//       })
    
//       const existingUser = users.find((user) => user.username === username);
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }
    
//       // Validate role
//       if (role !== 'admin' && role !== 'user') {
//         return res.status(400).json({ message: 'Role must be either "admin" or "user"' });
//       }
    
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
    
//       // Create a new user object
//       const newUser = {
//         id: users.length + 1,
//         username,
//         password: hashedPassword,
//         role, // Store the user role
//       };
    
//       console.log('===== ', newUser)
//       // Add the new user to the array
//       users.push(newUser);
    
//       // Respond with success message
//       res.status(201).json({ message: 'User created successfully', user: { username, role } });
//     });
    
//   } catch (error) {
//     console.log('----- error --------', error)
//   }
// }

// // Login route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Find user by username
//   const user = users.find((user) => user.username === username);
  
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid username or password' });
//   }

//   // Check password
//   const isPasswordValid = bcrypt.compareSync(password, user.password);
  
//   if (!isPasswordValid) {
//     return res.status(401).json({ message: 'Invalid username or password' });
//   }

//   // Generate a token with user role
//   const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

//   // Respond with token and success message
//   res.status(200).json({ message: 'Login successful', token });
// });

// module.exports = { signup };














const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../../models/userModel');

const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    console.log('----call-----')

    // const existingUser = users.length > 0 && users.find((user) => user.username === username);
    // if (existingUser) {
    //   return res.status(400).json({ message: 'Username already exists' });
    // }

    // Validate role
    if (role !== 'admin' && role !== 'user') {
      return res.status(400).json({ message: 'Role must be either "admin" or "user"' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      role, // Store the user role
    };

    // Add the new user to the array
    users.push(newUser);

    // Respond with success message
    res.status(201).json({ message: 'User created successfully', user: { username, role } });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup };

