import Sequelize from 'sequelize'

import setModelsRelation from './relations'
import getModels from './models'
import ENV from './env'

const database = ENV.DB_DATABASE
const username = ENV.DB_USER
const password = ENV.DB_PASSWORD
// eslint-disable-next-line no-console
console.log('ENV', ENV)

const sequelize = new Sequelize(database, username, password, {
	host: ENV.DB_HOST,
	dialect: ENV.DB_MACHINE,
	dialectOptions: {
		timeout: 30,
	},
	define: {
		defaultScope: {
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		},
		timestamps: false,
	},
	pool: {
		maxIdleTime: 120000,
	},
})

const models = setModelsRelation(getModels(sequelize))

Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models)
	}
})

export { sequelize }

export default models
