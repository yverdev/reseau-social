//Impotrs
let express = require('express')
let bodyParser = require('body-parser');
let apiRouter = require('./apiRouter').router;

//Instantiate server
let server = express()

//Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());


//Configure Routes
server.get('/', (req,res) => {
    res.setHeader('Content-type', 'text/html')
    res.status(200).send('<h1>Bienvenue sur mon site</h1>')
});

server.use('/api/', apiRouter);

//Lauch server
server.listen(8080, () => {
    console.log('server en écoute');
    
})