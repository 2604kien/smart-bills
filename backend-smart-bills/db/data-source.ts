import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST, //change if use local db server
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_Name,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  ssl: {
    rejectUnauthorized: true,
    ca: fs
      .readFileSync(
        path.join(__dirname, '..', '..', 'pem', 'ap-southeast-2-bundle.pem'),
      )
      .toString(),
  },
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
