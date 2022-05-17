module.exports = (app) => {
    app.use('/auth/google', {target: 'http://localhost:6299'});
    app.use('/auth/facebook', {target: 'http://localhost:6299'});
}