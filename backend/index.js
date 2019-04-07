import DataLoader from 'dataloader'
import { ApolloServer } from 'apollo-server-express'
import schema from './src/schema'
import resolvers from './src/resolvers'
import models, { sequelize } from './src/config/database'
import loaders from './src/loaders'
import ENV from './src/config/env'
import createHttpServer from './src/config/express'
import { getMe } from './utils'

const server = new ApolloServer({
	introspection: true,
	playground: true,
	typeDefs: schema,
	resolvers,
	formatError: (error) => {
		// remove the internal sequelize error message
		// leave only the important validation error
		const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '')

		return {
			...error,
			message,
		}
	},
	context: async ({ req, connection }) => {
		if (connection) {
			return {
				models,
				loaders: {
					customer: new DataLoader(keys => loaders.customer.batchCustomers(keys, models)),
				},
			}
		}

		if (req) {
			const me = await getMe(req)
			return {
				models,
				me,
				secret: ENV.SECRET,
				loaders: {
					customer: new DataLoader(keys => loaders.customer.batchCustomers(keys, models)),
				},
			}
		}

		return null
	},
})

const handler = createHttpServer(server, sequelize)

export { handler }
