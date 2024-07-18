// /**************     CRUD OPERATION   ***************/


// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const mongoose = require('mongoose');

// // const app = express();
// // const port = 8080;

// // app.use(bodyParser.json());
// // mongoose.connect("mongodb+srv://vakilraj26031997:Sx8egwe7ZrncGf9d@mydatabase.nunb2lw.mongodb.net/", { useNewUrlParser: true })

// // // Define a schema
// // const Schema = mongoose.Schema;
// // const itemSchema = new Schema({
// //   name: String,
// //   description: String
// // });
// // const Item = mongoose.model('Item', itemSchema);

// // app.get('/', async (req, res) => {
// //     res.send('welcome to Hello world!!');
// //   });

// // // CRUD routes
// // app.post('/items', async (req, res) => {
// //   const newItem = new Item(req.body);
// //   await newItem.save();
// //   res.send(newItem);
// // });

// // app.get('/items', async (req, res) => {
// //   const items = await Item.find();
// //   res.send(items);
// // });

// // app.get('/items/:id', async (req, res) => {
// //   const item = await Item.findById(req.params.id);
// //   res.send(item);
// // });

// // app.put('/items/:id', async (req, res) => {
// //   const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //   res.send(updatedItem);
// // });

// // app.delete('/items/:id', async (req, res) => {
// //   await Item.findByIdAndDelete(req.params.id);
// //   res.send('Item deleted successfully');
// // });


// // app.get('/api/users/:userId', (req, res) => {
// //     const userId = req.params.userId;
// //     res.send(`User ID: ${userId}`);
// //   });

// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

// /************************** Sign-up api logic  *******************************/


// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = require('./modules/User');

// const app = express();
// const port = 8080;

// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect("mongodb+srv://vakilraj26031997:Sx8egwe7ZrncGf9d@mydatabase.nunb2lw.mongodb.net/", { useNewUrlParser: true })
// // Signup route

// app.get('/', (req, res) => {
//     res.send('welcome to node server for signup page')    
// })

// app.get('/signup', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Signup</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//         }
//         .container {
//           width: 300px;
//           margin: 0 auto;
//           padding: 20px;
//           border: 1px solid #ccc;
//           border-radius: 5px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         .container h2 {
//           text-align: center;
//         }
//         .container form {
//           display: flex;
//           flex-direction: column;
//         }
//         .container form input {
//           margin: 10px 0;
//           padding: 10px;
//           border: 1px solid #ccc;
//           border-radius: 5px;
//         }
//         .container form button {
//           padding: 10px;
//           background-color: #28a745;
//           color: white;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//         .container form button:hover {
//           background-color: #218838;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h2>Signup</h2>
//         <form id="signup-form" action="/signup" method="POST">
//           <input type="text" name="username" placeholder="Username" required>
//           <input type="email" name="email" placeholder="Email" required>
//           <input type="password" name="password" placeholder="Password" required>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </body>
//     </html>
//   `);
// });

// app.post('/signUp', async (req, res) => {
//   console.log('===== req =======', req.body)
//   const { username, email, password } = req.body;

//   try {
//     let existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword
//     });

//     await newUser.save();
//     const token = jwt.sign({ id: newUser._id, username: newUser.username }, 'your_secret_key', { expiresIn: '1h' });

//     res.status(201).json({ token });
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ message: 'Failed to sign up' });
//   }
// });



// // Login 


// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Failed to log in' });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server is running at ${port}`);
// });


// -----------------------------         WebSocket connection code         --------------------------------------------------------------
const express = require('express');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');


const app = express();
const port = 8000;

app.use(cors())

app.use(bodyParser.json());
app.use(express.static('public'));

let sessions = {};

mongoose.connect("mongodb+srv://vakilraj26031997:Sx8egwe7ZrncGf9d@mydatabase.nunb2lw.mongodb.net/", { useNewUrlParser: true }).then((res) => {
    console.log('==== mongodb connnection ====', res.connection.host)
})

app.get('/generate-qr', (req, res) => {
    const sessionId = uuidv4();
    const nonce = uuidv4();
    sessions[sessionId] = { nonce, authenticated: false };

    const qrData = JSON.stringify({ sessionId, nonce });
    QRCode.toDataURL(qrData, (err, url) => {
        if (err) {
            res.status(500).json({ error: 'Failed to generate QR code' });
        } else {
            res.json({ qrCode: url, sessionId, nonce });
        }
    });
});

app.post('/authenticate', (req, res) => {
    const { sessionId, nonce } = req.body;
    if (sessions[sessionId] && sessions[sessionId].nonce === nonce) {
        sessions[sessionId].authenticated = true;
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid session or nonce' });
    }
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    const sessionId = req.url.substring(1);
    if (sessions[sessionId]) {
        sessions[sessionId].ws = ws;
    } else {
        sessions[sessionId] = { ws };
    }

    ws.on('close', () => {
        delete sessions[sessionId];
    });

    // Call the API and send data to the client every 20 seconds
    const intervalId = setInterval(async () => {
        console.log('calll-----------')
        if (ws.readyState === WebSocket.OPEN) {
            try {
                const response = await axios.get('http://172.20.0.70:8000/authenticate');
                ws.send('connect connected');
            } catch (error) {
                console.error('Error calling API:', error);
            }
        } else {
            clearInterval(intervalId);
        }
    }, 2000);
});

app.listen(port, () => {
    console.log(`Server running on  bb http://localhost:${port}`);
});



