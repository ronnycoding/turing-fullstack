const sequelize = require('../config/database');

const AttributeValue = sequelize.import('./models/attribute_value');

export default AttributeValue;
