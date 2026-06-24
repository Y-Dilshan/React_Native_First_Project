const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const  connectDB = require('./config/db');

// load env vars
dotenv.config();

// Connect to db
connectDb();

const app = express();

// Body Parser middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}));

// Enable cors
app.use(cors());

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));

// Root routes
app.get('/', (req, res) =>{
    res.json({
        message : 'Express MongoDB MVC API',
        Version : '1.0.0'
    })
});

app.use((error, req, res, next) =>{
    console.error(error.stack);
    res.status(500).json({
        success : false,
        message : 'Server Error',
        error : error.message
    })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running port ${PORT}')
})