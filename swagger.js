const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Big store API',
        description: 'API for products and customers',
    },
    host: 'cse341-final-project-x9ww.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);