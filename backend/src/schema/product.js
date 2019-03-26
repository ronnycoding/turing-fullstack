import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		products: [Product!]
		product(product_id: ID!): Product
		getProductsByCategoryId(category_id: ID!): [Product]
		getProductsByAttributeValueId(attribute_value_id: ID!): [Product]
	}

	type Product {
		product_id: ID!
		name: String!
		description: String!
		price: Float!
		discounted_price: Float!
		image: String
		image_2: String
		thumbnail: String
		display: Int!
	}
`;
