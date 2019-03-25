import Sequelize from 'sequelize';
import setModelsRelation from './relations';

import { getModels } from './models';

const database = process.env.DB_DATABASE;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_MACHINE;

const sequelize = new Sequelize(database, username, password, {
	host,
	dialect,
	define: {
		defaultScope: {
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		},
		timestamps: false
	}
});

const models = setModelsRelation(getModels(sequelize));

Object.keys(models).forEach(modelName => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

export { sequelize };

export default models;
