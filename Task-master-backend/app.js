require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes/routes');
const userRoutes = require('./routes/userRoutes');

//app config
const app = express();
const port = process.env.PORT || 6299;

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: 'GET, POST, PATCH, DELETE'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use((err, req, res, next) => {
    return res.json({ errorMessage: err.message });
});

//routes
app.use('/', routes);
app.use('/user', userRoutes);

//db config
mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.bxjxi.mongodb.net/TaskMaster?retryWrites=true&w=majority`, { useNewUrlParser: true });

//listen
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});