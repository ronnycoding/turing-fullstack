import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		getOrdersDetailByOrderId(order_id: ID!): [OrderDetail]
	}

	extend type Mutation {
		createOrderDetail(order_id: ID!, product_id: ID!, attributes: String!, quantity: Int!): OrderDetail!
		updateOrderDetail(item_id: ID!, attributes: String, quantity: Int): OrderDetail!
		deleteOrderDetail(item_id: ID!): Boolean!
	}

	type OrderDetail {
		item_id: ID!
		order_id: ID!
		product_id: ID!
		attributes: String!
		product_name: String!
		quantity: Int!
		unit_cost: Float!
	}
`;
