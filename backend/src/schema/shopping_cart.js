import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		getShoppingCart(product_id: ID!, cart_id: String!): ShoppingCart
	}

	extend type Mutation {
		createShoppingCart(
			product_id: ID!
			cart_id: String!
			attributes: String!
			quantity: Int!
			buy_now: Int
		): ShoppingCart
		updateShoppingCart(
			cart_id: String!
			product_id: ID!
			attributes: String
			quantity: Int
			buy_now: Int
		): ShoppingCart
		deleteShoppingCart(cart_id: ID!, product_id: ID!): Boolean!
	}

	type ShoppingCart {
		item_id: ID!
		cart_id: String!
		product_id: ID!
		attributes: String!
		quantity: Int!
		buy_now: Int!
		added_on: Date!
	}
`
