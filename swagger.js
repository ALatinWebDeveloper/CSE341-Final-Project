const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Big store API',
        description: 'API for products and customers',
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);