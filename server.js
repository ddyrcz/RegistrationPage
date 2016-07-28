var express =       require('express'),
    app =           express(),
    bodyParser =    require('body-parser'),
    morgan =        require('morgan'),
    mongoose =      require('mongoose'),
    jwt =           require('jsonwebtoken'),
    config =        require('./config'),
    User =          require('./app/models/user');


mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.end('ok');
});


app.listen(8000);
console.log('service in running');