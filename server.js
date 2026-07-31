const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to native MongoDB:', err);
    } else {

        mongoose.connect(process.env.MONGODB_URL)
            .then(() => {
                app.listen(port, () => {
                    console.log(`Server and Databases (Native & Mongoose) are running on port ${port}`);
                });
            })
            .catch(mongooseErr => {
                console.error('Failed to connect Mongoose:', mongooseErr);
            });
    }
});