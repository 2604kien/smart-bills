import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions={
    type:"postgres",
    host:"database-postgres", //localhost
    port:5432,
    username:"admin",
    password:"admin",
    database:"nestJS-smart-bill",
    entities:['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/db/migrations/*.js'],
    synchronize: process.env.NODE_ENV==='production'?false:true
}
const dataSource=new DataSource(dataSourceOptions);
export default dataSource;