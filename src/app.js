/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import accountTypeRoutes from './routes/accountTypeRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionCategoryRoutes from './routes/transactionCategoryRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryTypeRoutes from './routes/categoryTypeRoutes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
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
