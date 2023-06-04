const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.SERVER_PORT || 1234
const apiPath = process.env.API_PATH
app.use(express.json())

const fs = require('fs');
const routes_directory = require('path').resolve(__dirname) + '/routes/'; 

// CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//ROUTES
console.log('Added routers:\n')
fs.readdirSync(routes_directory).forEach(route_file => {
    try {
        console.log(routes_directory + route_file)
        app.use(apiPath, require(routes_directory + route_file));
    } catch (error) {
        console.log(`Encountered Error initializing routes from ${route_file}`);
        console.log(error);
    }
});

app.listen(PORT, () => {console.log(`\nSports facility APP listening at http://localhost:${PORT + apiPath}`)})