import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import http from 'http';
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import ENV from './env';

export default function createHttpServer(server, sequelize) {
  const app = express();
  app.use(cors());
  app.use(morgan('dev'));
  server.applyMiddleware({ app, path: '/graphql' });
  app.get('/playground', graphiql({ endpoint: '/graphql' }));
  sequelize.sync({ force: false }).then(async () => {
    console.log(`Apollo Server on http://localhost:${ENV.DB_PORT}/graphql`);
  });

  return serverless(app);
}
