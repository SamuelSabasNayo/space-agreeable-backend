/* eslint-disable linebreak-style */
import express from 'express';

import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bare foot nomad project',
      version: '1.0.0',
      description: 'API for Bare Foot Nomad Project'
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['src/utils/index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', serve, setup(swaggerDocs));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * @swagger
 * /welcome:
 *   get:
 *     summary: returns a welcome message
 *     tags:
 *       - Welcome
 *     description: Returns a welcome message
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A succesful response
 *       500:
 *         description: SERVER ERROR
 */
app.get('/welcome', (req, res) => {
  res.send('Welcome to my rest api!');
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
