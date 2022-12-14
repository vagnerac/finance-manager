/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import homeRoutes from './routes/homeRoutes';
import tokenRoutes from './routes/tokenRoutes';
import accountTypeRoutes from './routes/accountTypeRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionCategoryRoutes from './routes/transactionCategoryRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryTypeRoutes from './routes/categoryTypeRoutes';

import './database';

const whiteList = [
  'https://react.vagnercoelho.dev',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user/', userRoutes);
    this.app.use('/token/', tokenRoutes);
    this.app.use('/accountType/', accountTypeRoutes);
    this.app.use('/account/', accountRoutes);
    this.app.use('/transactionCategory/', transactionCategoryRoutes);
    this.app.use('/categoryType/', categoryTypeRoutes);
    this.app.use('/transaction/', transactionRoutes);
  }
}

export default new App().app;
