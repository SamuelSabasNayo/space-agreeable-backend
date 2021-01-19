import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoute';
import requestRoutes from './routes/requestRoute';
import hotelRoutes from './routes/hotelRoute';
import managerRoutes from './routes/managerRoutes';

dotenv.config();

const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BareFoot Nomad Project',
      version: '1.0.0',
      description: 'Your API description'
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
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'WELCOME TO SEQUELIZE-POSTGRES API' });
});

// request middleware
app.use(express.json());
app.use('/user', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/request', requestRoutes);
app.use('/manager', managerRoutes);

export default app;
