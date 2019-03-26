import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import DataLoader from 'dataloader';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './src/schema';
import resolvers from './src/resolvers';
import models, { sequelize } from './src/config/database';

import { getMe } from './utils';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const port = process.env.PORT || 8000;

const server = new ApolloServer({
	introspection: true,
	playground: true,
	typeDefs: schema,
	resolvers,
	formatError: error => {
		// remove the internal sequelize error message
		// leave only the important validation error
		const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '');

		return {
			...error,
			message
		};
	},
	context: async ({ req, connection }) => {
		if (connection) {
			return {
				models,
				loaders: {
					customer: new DataLoader(keys => loaders.customer.batchCustomers(keys, models))
				}
			};
		}

		if (req) {
			const me = await getMe(req);

			return {
				models,
				me,
				secret: process.env.SECRET,
				loaders: {
					customer: new DataLoader(keys => loaders.customer.batchCustomers(keys, models))
				}
			};
		}
	}
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);

sequelize.sync({ force: false }).then(async () => {
	httpServer.listen({ port }, () => {
		console.log(`Apollo Server on http://localhost:${port}/graphql`);
	});
});
