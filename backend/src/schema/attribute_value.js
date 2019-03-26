import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		attribute_values: [AttributeValue!]
		attribute_value(attribute_value_id: ID!): AttributeValue
		getAttributeValuesByAttributeId(attribute_id: ID!): [AttributeValue]
		getAttributeValuesByProductId(product_id: ID!): [AttributeValue]
	}

	type AttributeValue {
		attribute_value_id: ID!
		attribute_id: ID!
		value: String!
	}
`;
