import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Account from '../models/Account';
import AccountType from '../models/AccountType';
import CategoryType from '../models/CategoryType';
import TransactionCategory from '../models/TransactionCategory';
import Transaction from '../models/Transaction';

const models = [User, Account, AccountType, CategoryType, TransactionCategory, Transaction];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
