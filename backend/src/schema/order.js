import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		getOrdersByCustomerId(customer_id: ID!): [Order]
		getOrdersByShippingId(shipping_id: ID!): [Order]
	}

	extend type Mutation {
		createOrder(
			total_amount: Float
			shipped_on: Date
			status: Int
			comments: String
			auth_code: String
			reference: String
			shipping_id: ID
			tax_id: ID
		): Order!
		updateOrder(
			order_id: ID!
			total_amount: Float
			shipped_on: Date
			status: Int
			comments: String
			auth_code: String
			reference: String
			shipping_id: ID
			tax_id: ID
		): Order!
		deleteOrder(order_id: ID!): Boolean!
	}

	type Order {
		order_id: ID!
		total_amount: Float
		created_on: Date!
		shipped_on: Date
		status: Int!
		comments: String
		customer_id: ID
		auth_code: String
		reference: String
		shipping_id: ID
		tax_id: ID
	}
`
