const express = require('express');
const app = express();
const port = 8080;
const moment = require('moment-timezone');
const AUTHOR = "Bartosz Kozaczuk";

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request: ${req.method} ${req.url}`);
    next();
});

app.get('/', async (req, res) => {
    try {
        let ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
        if (ip.includes('::ffff:')) {
            ip = ip.split(':').pop();
        }
        const clientTime = moment().tz(moment.tz.guess()).format('HH:mm:ss YYYY-MM-DD');
        const serverTime = moment().tz(moment.tz.guess()).format('HH:mm:ss YYYY-MM-DD');
        res.send(`IP klienta: ${ip}\nCzas po stronie klienta: ${clientTime}\nCzas po stronie serwera: ${serverTime}\n`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Wystąpił błąd!');
    }
});

app.listen(port, async () => {
    try {
        console.log(`Serwer nasluchuje na porcie ${port}`);
        console.log(`Autor: ${AUTHOR}`);
        console.log(`Uruchomienia serwera: ${new Date().toISOString()}`);
    } catch (error) {
        console.error(error);
    }
});
