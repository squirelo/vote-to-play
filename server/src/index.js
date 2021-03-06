const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const voteRouter = require('./routes/vote-route');
const dataRouter = require('./routes/data-route');
const fs = require('fs')
const http = require('http');
const https = require('https');
const cors = require('cors');
const path = require('path')
var db = require('./db.js')

//console.log(process.env);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
//console.log('process.env.TWITCH_EXTENSION_SECRET:', process.env.TWITCH_EXTENSION_SECRET);

const { NODE_ENV, TWITCH_EXTENSION_SECRET } = process.env

if (!NODE_ENV || !TWITCH_EXTENSION_SECRET) {
	throw new Error('Missing env variables!')
}

if (NODE_ENV !== 'production') {
	console.log('TWITCH_EXTENSION_SECRET', TWITCH_EXTENSION_SECRET)
}

app.use(cors({ credentials: true, origin: true }))
let server;
let port;

//uses nginx reverse proxy in production
if (process.env.NODE_ENV === 'production'){
    server = http.createServer(app);
    port = 8081
}else{
    server = https
        .createServer(
        {   //self signed certs
            key: fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem')),
        },
        app
        )
    port = 7777
    app.use(express.static(path.resolve(__dirname, '../public')));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

authRouter(app);
voteRouter(server, app);
dataRouter(app)

db.connect().then(()=>{
    server.listen(port, () => {
        console.log(`Find the server at: https://localhost:${port}/`); // eslint-disable-line no-console
	});
})
