require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;
const mongodb = require('./database/connect');
const contactRoutes = require('./routes/contact');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const {initDb} = require('./database/connect');


app
    .use(bodyParser.json())              // for JSON request bodies
    .use(bodyParser.urlencoded({ extended: true })) // for form submissions
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use ('/', require("./routes"))
    .use('/', contactRoutes);
    app.use('/api', contactRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongodb.initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });

   
  

