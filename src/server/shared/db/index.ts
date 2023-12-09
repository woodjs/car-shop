import { Sequelize } from 'sequelize-typescript';
import mysql2 from 'mysql2';

import { Car } from './models/Car';
import { Brand } from './models/Brand';
import { Configuration } from './models/Configuration';
import { CarConfiguration } from './models/CarConfiguration ';

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
    decimalNumbers: true,
  },
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
});

export const models = {
  Car,
  Brand,
  Configuration,
  CarConfiguration,
};
sequelize.addModels([Car, Brand, Configuration, CarConfiguration]);

export default sequelize;
