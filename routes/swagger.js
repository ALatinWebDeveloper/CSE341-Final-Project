const routes = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = routes;