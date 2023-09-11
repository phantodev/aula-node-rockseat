import postgres from "postgres";
import "dotenv/config";

export const sql = postgres(process.env.URI_POSTGRES, {
  host: process.env.HOST_POSTGRES, // Postgres ip address[s] or domain name[s]
  port: process.env.PORT_POSTGRES, // Postgres server port[s]
  database: process.env.DATABASE_POSTGRES, // Name of database to connect to
  username: process.env.USERNAME_POSTGRES, // Username of database user
  password: process.env.PASSWORD_POSTGRES, // Password of database user
  ssl: process.env.SSL_POSTGRES,
});
