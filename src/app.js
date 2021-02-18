import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import rooms from './routes';
import roleRoutes from './routes/roles';
import hotelRoutes from './routes/hotelRoute';
import userRoutes from './routes/user';
import i18n from './utils/i18n';
import managerRoutes from './routes/managerRoutes';
import requestRoutes from './routes/requestRoute';
import facilityRoute from './routes/Facility';
import reactionRoutes from './routes/reaction';
import commentRoutes from './routes/comment';

dotenv.config();

const app = express();

app.use(cors());
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
      description: "Documentation of space nomad's Barefoot Nomad API"
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
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Barefoot space nomad api!' });
});
app.use('/user', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/roles', roleRoutes);
app.use(rooms);
app.use('/manager', managerRoutes);
app.use('/requests', requestRoutes);
app.use('/facility', facilityRoute);
app.use('/facility', reactionRoutes);
app.use(commentRoutes);

export default app;
