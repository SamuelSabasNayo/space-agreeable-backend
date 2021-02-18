/* eslint-disable import/no-cycle */
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from "passport";
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
import ratingRoutes from './routes/rating';
import searchRoutes from './routes/searchRoute';
import notificationRoutes from './routes/notification';
import initializeEvent from './helpers/events';
import questionRoutes from './routes/questionRoutes';
import facebookOauthRoute from './routes/social.Oauth.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(i18n.init);
app.use(express.static(path.join(__dirname, '../public')));

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

// connect socket
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.emit('welcome', 'welcome to space barefoot nomad');
  socket.on('join notification', (user) => {
    socket.join(user.id);
  });
  socket.on('disconnect', () => {});
});

initializeEvent();

// routes
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
app.use('/facility', ratingRoutes);
app.use(searchRoutes);
app.use('/notifications', notificationRoutes);
app.use('/questions', questionRoutes);
app.use("/", facebookOauthRoute);
export { io, app };

export default server;
