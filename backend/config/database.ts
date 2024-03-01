module.exports = ({ env }) => ({
  connection: {
    client: "postgres", 
    connection: {
      host: env('DATABASE_HOST', process.env.POSTGRES_HOST),
      port: env.int('DATABASE_PORT', process.env.POSTGRES_PORT),
      database: env('DATABASE_NAME', process.env.POSTGRES_NAME),
      user: env('DATABASE_USERNAME', process.env.POSTGRES_USERNAME),
      password: env('DATABASE_PASSWORD', process.env.POSTGRES_PASSWORD)  
    }
  },
  debug: true,
});
