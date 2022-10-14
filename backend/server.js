const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/dbcon');
const cors = require('cors');

connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({origin:"*"}));

app.use('/api/messages', express.static('upload/images'));
app.use('/api/users', express.static('upload/profilepictures')); 

app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}...!`));