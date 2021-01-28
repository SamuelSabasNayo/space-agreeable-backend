import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import rooms from './routes';
import userRoutes from './routes/userRoute';
import hotelRoutes from './routes/hotelRoute';
import roleRoutes from './routes/roles';
import commentRoutes from './routes/comment';
import managerRoutes from './routes/managerRoutes';
import i18n from './utils/i18n';
import Requests from './routes/requestRoute';

dotenv.config();

const app = express();

// const welcome = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(i18n.init);

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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'WELCOME TO SEQUELIZE-POSTGRES API' });
});

app.use('/api', (req, res) => {
  res.json('Welcome!');
});
app.use('/user', userRoutes);
app.use('/hotels', hotelRoutes);
app.use(rooms);
app.use('/roles', roleRoutes);
app.use(commentRoutes);
app.use('/manager', managerRoutes);
app.use('/Request', Requests);

export default app;
