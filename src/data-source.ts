import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
