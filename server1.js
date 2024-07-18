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

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let sessions = {};

mongoose.connect("mongodb+srv://vakilraj26031997:Sx8egwe7ZrncGf9d@mydatabase.nunb2lw.mongodb.net/", { useNewUrlParser: true });

app.get('/generate-qr', (req, res) => {
    const nonce = uuidv4();
    const sessionId = uuidv4();
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
        if (ws.readyState === WebSocket.OPEN) {
            try {
                const response = await axios.get('http://172.20.0.70:8000/authenticate');
                
                if (response.status === 200) {
                    // Check if the session is authenticated
                    const { sessionId, nonce } = response.data;
                    if (sessions[sessionId] && sessions[sessionId].authenticated) {
                        ws.send('Authenticated successfully');
                    } else {
                        ws.send('Authentication failed');
                    }
                }
            } catch (error) {
                console.error('Error calling API:', error);
            }
        } else {
            clearInterval(intervalId);
        }
    }, 2000);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
